import { db } from '../../plugins/firebase';

import {
    collection,
    query,
    limit,
    getDocs,
    doc,
    getDoc,
    addDoc,
    updateDoc,
    runTransaction,
    arrayUnion
} from "firebase/firestore";


const state = {
    partidos: [],
    serie: null,
    partidosError: null,
    partidosListenes: () => { }
};

const getters = {
    getPartidos(state) {
        return state.partidos;
    }
};

const actions = {
    async loadPartidos({ commit }, payload) {
        console.log("loadPartidos");
        //const db = getFirestore();
        console.log(db);

        let q = query(collection(db, "partidos"), limit(5));
        
        const querySnapshot = await getDocs(q);

        console.log(querySnapshot);

        let partidos = [];

        doSnapShot(querySnapshot);

        //commit("SET_PARTIDOS_LISTENER", query);

        function doSnapShot(querySnapshot) {
            console.log("doSnapShot");
            console.log(querySnapshot);
            console.log(querySnapshot.docs);
            querySnapshot.docs.forEach((doc) => {
                let p = doc.data();
                //console.log(`${doc.id} => ${doc.data()}`);
                p.id = doc.id;
                partidos.push(p);
            });
            commit("SET_PARTIDOS", partidos);
        }
    },
    async loadPartidosClub({ commit }, payload) {
        console.log("loadPartidosClub");
        console.log(payload);
        //const db = getFirestore();
        const docRef = doc(db, "clubs", payload.club);
        console.log('docRef');
        console.log(docRef);
        const colRef = collection(docRef, "partidos")
        console.log('colRef');
        console.log(colRef);
        const querySnapshot = await getDocs(colRef);

        console.log(querySnapshot);

        let partidos = [];

        return doSnapShot(querySnapshot);

        //commit("SET_PARTIDOS_LISTENER", query);

        function doSnapShot(querySnapshot) {
            console.log("doSnapShot");
            console.log(querySnapshot.docs);
            querySnapshot.docs.forEach((doc) => {
                let p = doc.data();
                console.log(`${doc.id} => ${doc.data()}`);
                p.id = doc.id;
                partidos.push(p);
            });
            commit("SET_PARTIDOS", partidos);
            return partidos;
        }

    },
    async addPartido({ commit }, payload) {
        try {
            const docRef = doc(db, "clubs", payload.club);
            const colRef = collection(docRef, "partidos")

            return await addDoc(colRef, payload)
            .then((docRef) => {
                console.log("Partido with ID: ", docRef);
                return docRef;
            })
            .catch((error) => {
                console.log("error adding Partido");
                console.log(error);
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    },
    async addPartidoTorneo({ commit }, payload) {
        try {
            console.log('addPartidoTorneo');
            console.log(payload);
            return await runTransaction(db, async (transaction) => {

                const colPartidos = collection(db, "partidos");
                
                // agregamos partido
                let partido = await addDoc(colPartidos, payload.partido);
                console.log('partido',partido);
                let partido_key = payload.partido.playerA.id+'_'+payload.partido.playerB.id;
                console.log('partido_key',partido_key);
                
                // referencia a torneo
                const torneoRef = doc(db, `torneos/${payload.partido.torneo_id}/grupos/${payload.partido.grupo_id}`);
                // actualizamos torneo
                await updateDoc(torneoRef, {
                    partidos: arrayUnion(partido.id),
                    jugados: arrayUnion(partido_key)
                });


                const refGrupo = doc(db, `torneos/${payload.partido.torneo_id}/grupos/${payload.partido.grupo_id}`);
                const sfGrupo = await transaction.get(refGrupo);
                if (!sfGrupo.exists()) {
                    throw "Grupo does not exist!";
                }

                console.log('sfGrupo',sfGrupo.data());
  
                const resultados = sfGrupo.data().resultados;
                resultados[partido.id] = payload.partido.resultado;
                console.log('resultados',resultados);

                const jugadores = sfGrupo.data().jugadores;
                console.log('jugadores sfGrupo',jugadores);
                
                let players = jugadores.map(j=>{
                    if(j.id == payload.data.idGanador){
                        j.puntos = j.puntos + 2;
                        j.sets = j.sets + ( payload.data.puntosGanador - payload.data.puntosPerdedor);
                    }
                    if(j.id == payload.data.idPerdedor){
                        j.puntos = j.puntos + 1;
                        j.sets = j.sets + (  payload.data.puntosPerdedor - payload.data.puntosGanador );
                    }
                    return j;
                });

                console.log('jugadoresConPuntos',players);
                
                let puntos_players = jugadores.filter(j=>j.puntos>0).map(j => j.puntos);
                let sets_players = jugadores.filter(j=>j.puntos>0).map(j => j.sets);

                console.log('Puntos',puntos_players);
                console.log('Sets',sets_players);
                
                puntos_players = puntos_players.sort((a,b) => a-b).reverse();
                console.log('Puntos Ordenados',puntos_players);
                
                sets_players = sets_players.sort((a,b) => a-b).reverse();
                console.log('Sets Ordenados',sets_players);

                let players_posiciones = jugadores.map(j=>{
                    console.log('j',j);

                    //posicion con puntos
                    let posicion = puntos_players.indexOf(j.puntos);
                    //count de puntos en array de puntajes
                    let puntos_iguales = puntos_players.reduce((a, v) => (v === j.puntos ? a + 1 : a), 0);
                    console.log('puntos_iguales: ',puntos_iguales);
                    //si hay otro usuario con puntos iguales
                    if(puntos_iguales > 1){
                        //excluir sets de jugadores con mayor posicion

                        let sets_sin_jugadores_superiores = sets_players.filter(i => i > j.sets);
                        console.log('sets_sin_jugadores_superiores: ',sets_sin_jugadores_superiores);

                        //posicion con sets
                        let posicion_set = sets_players.indexOf(j.sets);
                        //j.posicion = (posicion==-1 ? 0 : posicion )+ (posicion_set+1);
                        j.posicion = (posicion_set+1);
                    }else{
                        j.posicion = (posicion+1);
                    }

                    
                    console.log('Posicion: ' + j.posicion);
                    return j;
                });

                console.log('jugadoresConPosiciones',players_posiciones);
                

                transaction.update(refGrupo, {
                    resultados: resultados,
                    jugadores: players_posiciones
                });
                
                console.log('partido return');
                console.log(partido);
                return partido;
            });
            console.log("Partido registrado correctamente!");
        } catch (e) {
            console.error("Error adding partido: ", e);
        }
    },
    async setResultadosPartido({ commit }, payload) {
        try {
            console.log('setResultadosPartido');
            console.log(payload);
            //const refPartido = collection(db, "partidos", payload.partido_id);

            try {
                await runTransaction(db, async (transaction) => {
                    const refGrupo = doc(db, `torneos/${payload.partido.torneo_id}/grupos/${payload.partido.grupo_id}`);

                    const sfGrupo = await transaction.get(refGrupo);
                    if (!sfGrupo.exists()) {
                        throw "Document does not exist!";
                    }

                    console.log('sfGrupo',sfGrupo.data());
      
                    const resultados = sfGrupo.data().resultados;
                    resultados[payload.partido.id] = payload.resultado;

                    let puntajes = payload.resultado.split(':');
                    let puntosA = puntajes[0];
                    let puntosB = puntajes[1];

                    let idGanador = false;
                    let puntosGanador = 0;
                    let idPerdedor = false;
                    let puntosPerdedor = 0;


                    
                    if(puntosA > puntosB){
                        console.log('ganadorA');
                        idGanador = payload.partido.playerA.id;
                        idPerdedor = payload.partido.playerB.id;

                        puntosGanador = parseInt(puntosA);
                        puntosPerdedor = parseInt(puntosB);
                    }else{
                        console.log('ganadorB');
                        idGanador = payload.partido.playerB.id;
                        idPerdedor = payload.partido.playerA.id;

                        puntosGanador = parseInt(puntosB);
                        puntosPerdedor = parseInt(puntosA);
                    }                    

                    const jugadores = sfGrupo.data().jugadores;
                    console.log('jugadores sfGrupo',jugadores);
                    let players = jugadores.map(j=>{
                        console.log('j',j);
                        if(j.id == idGanador){
                            j.puntos = j.puntos + 2;
                            j.sets = j.sets + ( puntosGanador - puntosPerdedor);
                            console.log('Puntos Ganador: ' + j.puntos);
                        }
                        if(j.id == idPerdedor){
                            j.puntos = j.puntos + 1;
                            j.sets = j.sets + (  puntosPerdedor - puntosGanador );
                            console.log('Puntos Perdedor: ' + j.puntos);
                        }
                        return j;
                    });
                    console.log('jugadoresConPuntos',players);
                    console.log('resultados',resultados);

                    transaction.update(refGrupo, {
                        resultados: resultados,
                        jugadores: players
                    });


              
                });
                console.log("Transaction successfully committed!");
            } catch (e) {
                console.log("Transaction failed: ", e);
            }
              
            

            const refPartido = doc(db, `partidos/${payload.partido.id}`);
            console.log('refPartido');
            console.log(refPartido);
            
            return updateDoc(refPartido, {
                resultados: payload.resultados,
                resultado: payload.resultado
            }).then((partido) => {
                console.log('resultados partido seteado');
                console.log(partido);
                return refPartido;
            }).catch((e)=>{
                console.log('error seteado resultados partido ');
                console.log(e);
                return null;
            }); 

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    },
    async fetchPartido({ commit }, payload) {
        try {
            console.log('%cpartidosStore.js line:69 payload', 'color: #007acc;', payload);
            const docRef = doc(db, "partidos", payload);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                let item = docSnap.data();
                item.id = docSnap.id;
                console.log("Document data:", item);
                commit('SET_PARTIDO',item);
                return item;
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                return null;
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
};

const mutations = {
    SET_PARTIDOS_LISTENER(state, listener) {
        if (listener) {
            state.partidosListener = listener;
        } else {
            state.partidosListener();
        }
    },
    SET_PARTIDOS(state, payload) {
        console.log("setPartidos", payload);
        state.partidos = payload;
    },
    SET_PARTIDO(state, payload) {
        console.log("setPartido", payload);
        state.serie = payload;
    },
    ADD_PARTIDO(state, payload) {
        state.partidos.push(payload);
    },
    SET_PARTIDOS_ERROR(state, payload) {
        state.partidosError = payload;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
