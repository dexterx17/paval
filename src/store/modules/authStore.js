import { db } from '../../plugins/firebase';

import { 
      getAuth,
      signInWithEmailAndPassword,
      createUserWithEmailAndPassword,
      signOut,
      onAuthStateChanged
    } from "firebase/auth";

import { getFirestore,
        doc,
        addDoc,
        collection,
        setDoc,
        runTransaction,
        query,
        getDocs,
        where
    } from "firebase/firestore";

import { getStorage, ref, uploadBytes, getDownloadURL  } from "firebase/storage";


const state = {
    user: null,
    error: null
 };
 const getters = {
   getUser(state) {
      return state.user;
    },
    isUserAuth(state) {
      return !!state.user;
    },
    getError(state) {
      return state.error;
    }
 };
 const actions = {
   authAction({ commit, dispatch }) {
      const auth = getAuth();
      console.log('authAction');
      onAuthStateChanged(auth, user => {
        //console.log('onAuthStateChanged',user);
        if(user){
          dispatch('loadProfileByUid',user.uid).then((player)=>{
            console.log('loadPlayerLoggedUser',player);
            user.player = player;
            if (user) {
              commit("setUser", user);
            } else {
              commit("setUser", null);
            }
          })
        }else{
          commit("setUser", null);
        }
      });
    },
    signUpAction({ commit, dispatch }, payload) {
      const auth = getAuth();
      return createUserWithEmailAndPassword(auth, payload.email, payload.password)
         .then((data) =>  {
            
            data.nombre = payload.name;
            data.uid = data.user.uid;
            console.log("Register", data);
            
            
            return addDoc(collection(db, "players"), {
              uid: data.user.uid,
              source: 'web',
              created_at: new Date(),
              nombre: data.nombre ?? data.user.displayName,
              avatar: data.user.photoURL ?? null,
              total_torneos:0,
              total_partidos: 0,
              total_victorias: 0,
              total_derrotas: 0,
              ranking:999,
              puntos:0
            }).then((docRef)=>{
              console.log("Player init: ", docRef.id);
              commit("setUser", data);
              return data;
            }).catch((error)=>{
              console.log('error init Player');
              console.log(error);
              return null;
            });

         })
        .catch(error => {
          commit("setError", error.message);
          return error;
        });
    },
    signInAction({ dispatch, commit }, payload) {
      const auth = getAuth();
      var vm = this;
      console.log(payload);
      return signInWithEmailAndPassword(auth, payload.email, payload.password)
         .then((data) => {
            commit("setUser", data);
            return data;
         })
        .catch(error => {
          return error;
        });
    },
    signOutAction({ commit }) {
      const auth = getAuth();

      return signOut(auth)
        .then(() => {
          commit("setUser", null);
        })
        .catch(error => {
          commit("setError", error.message);
        });
    },
    async initPlayer({ commit }, payload) {
      try {
        await addDoc(collection(db, "players"), {
          uid: payload.user.uid,
          source: 'web',
          created_at: new Date(),
          nombre: payload.nombre ?? payload.user.displayName,
          avatar: payload.user.photoURL ?? null,
          total_torneos:0,
          total_partidos: 0,
          total_victorias: 0,
          total_derrotas: 0,
          ranking:999,
          puntos:0
        }).then((docRef)=>{
          console.log("Document written with ID: ", docRef);
        }).catch((error)=>{
          console.log('error init Player');
          console.log(error);
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    async updateProfile({ commit, dispatch }, payload) {      
      try {
        await runTransaction(db, async (transaction) => {
            console.log('updateProfile', payload);
            
            const playerDoc = doc(db, "players",payload.id);
            setDoc(playerDoc, payload);

            payload.clubs.forEach(c => {
              console.log('c: ',c);
              //imagen de solicitudes a club
              const refSolicitud = doc(db, `clubs/${c.id}/solicitudes/${payload.id}`);
              transaction.update(refSolicitud,{
                'avatar'  : payload.avatar
              })

              //imagen en serie de club

              let q = query(collection(db, `clubs/${c.id}/series`));
              getDocs(q).then(docSnap => {
                  if (docSnap.docs) {
                    let series = docSnap.docs;
                      series.forEach((serie) => {
                        let serieData = serie.data();
                        let jugadorEncontrado = false;
                        
                        serieData.jugadores = serieData.jugadores.map(j => {
                          if(j.jugador_id == payload.id){
                            console.log("Serie data:", serieData);
                            console.log("Jugador encontrado en serie:", serieData.nombre);
                            jugadorEncontrado = true;
                            j.avatar = payload.avatar;
                          }
                          return j;
                        });

                        if(jugadorEncontrado){
                          const refSerie = doc(db, `clubs/${c.id}/series/${serie.id}`);
                          transaction.update(refSerie,serieData);
                          console.log("Serie acualizada:", serieData);
                        }

                    });
                  } else {
                    console.log("no hay series!");
                  }
              });

              
              // const sfGrupo = await transaction.get(refSolicitud);
              // if (!sfGrupo.exists()) {
              //     throw "Document does not exist!";
              // }
              // console.log('sfGrupo',sfGrupo.data());


            })

    
    
            //torneos en los que ha participado el usuario
              //jugadores en cada torneo
              //grupos de cada torneo
    
            //partidos en los que ha participado


            // const refGrupo = doc(db, `torneos/${payload.partido.torneo_id}/grupos/${payload.partido.grupo_id}`);

            // const sfGrupo = await transaction.get(refGrupo);
            // if (!sfGrupo.exists()) {
            //     throw "Document does not exist!";
            // }
            // console.log('sfGrupo',sfGrupo.data());

          });
          console.log("Transaction successfully committed!");
          
        } catch (e) {
            console.log("Transaction failed: ", e);
        }
        
    }
 };
 const mutations = {
    setUser(state, payload){
       state.user = payload
    },
    setError(state, payload){
       state.error = payload;
    }
 };
 export default {
    state,
    getters,
    actions,
    mutations
 }  