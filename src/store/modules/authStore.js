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
        setDoc
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
         .then((data) => {
            
            data.nombre = payload.name;
            console.log("Register", data);
            data.uid = data.user.uid;
            commit("setUser", data);
            dispatch('initPlayer',data);
            return data;
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
        addDoc(collection(db, "players"), {
          uid: payload.user.uid,
          source: 'web',
          created_at: Date(),
          nombre: payload.nombre ?? payload.user.displayName,
          avatar: payload.user.photoURL ?? null,
          total_torneos:0,
          total_partidos: 0,
          total_victorias: 0,
          total_derrotas: 0,
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
        return setDoc(doc(db, "players",payload.uid), payload)
        .then((docRef)=>{
          console.log("Document written with ID: ", docRef);
          return docRef;
        }).catch((error)=>{
          console.log('error init Player');
          console.log(error);
          return null;
        });
      } catch (e) {
        console.error("Error adding document: ", e);
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