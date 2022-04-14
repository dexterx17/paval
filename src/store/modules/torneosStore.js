import { db } from '../../plugins/firebase';

import {
    collection,
    getDocs,
    doc,
    getDoc,
    addDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    serverTimestamp,
    arrayUnion,
    arrayRemove,
    increment
} from "firebase/firestore";


import { getStorage, ref as sRef, deleteObject } from "firebase/storage";

const state = {
    torneos: [],
    torneo: null,
    torneosError: null,
    torneosListenes: () => { }
};

const getters = {
    getTorneos(state) {
        return state.torneos;
    }
};

const actions = {
    async loadTorneos({ commit }, payload) {
        console.log("loadTorneos");
        //const db = getFirestore();
        console.log(db);
        const querySnapshot = await getDocs(collection(db, "torneos"));

        console.log('querySnapshot');
        console.log(querySnapshot);

        let torneos = [];
        
        return doSnapShot(querySnapshot);
        
        //commit("SET_TORNEOS_LISTENER", query);
        

        function doSnapShot(querySnapshot) {
            console.log("doSnapShot");
            console.log(querySnapshot);
            console.log(querySnapshot.docs);
            querySnapshot.docs.forEach((doc) => {
                let p = doc.data();
                console.log(`${doc.id} => ${doc.data()}`);
                p.id = doc.id;
                torneos.push(p);
            });
            commit("SET_TORNEOS", torneos);
            return torneos;
        }
    },
    async addTorneo({ commit }, payload) {
        try {
            //si es un torneo organizado por un club
            if (payload.club) {
                const torneoRef = doc(db, "clubs", payload.club.id);
                console.log('torneoRef',torneoRef)
                //incrementamos en uno el total de torneos del club
                await updateDoc(torneoRef, {
                    total_torneos: increment(1)
                });


            }


            return addDoc(collection(db, "torneos"), payload)
                .then((docRef) => {
                    console.log("Torneo with ID: ", docRef);
                    return docRef;
                })
                .catch((error) => {
                    console.log("error adding Torneo");
                    console.log(error);
                });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    },
    async inscribirEnTorneo({ commit }, payload) {
        console.log(payload);
        try {
            const docRef = doc(db, "torneos", payload.torneo.id);
            
            payload.jugador.timestamp = serverTimestamp();
            
            await updateDoc(docRef, {
                inscritos: arrayUnion(payload.jugador.jugador_id)
            });     

            const jugadorSubColRef = doc(docRef, "jugadores",payload.jugador.jugador_id);
            
            return await setDoc(jugadorSubColRef, payload.jugador)
            .then((docRes) => {
                console.log("Inscrito with ID: ", payload.jugador.jugador_id);

                return jugadorSubColRef;
            })
            .catch((error) => {
                console.log("error adding Inscrito");
                console.log(error);
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    },
    async quitarDeTorneo({ commit }, payload) {
        console.log('quitarDeTorneo',payload);
        try {
            
            const torneoRef = doc(db, "torneos", payload.torneo_id);            
            console.log('torneoRef',torneoRef);
            await updateDoc(torneoRef, {
                inscritos: arrayRemove(payload.jugador_id)
            });     

            const jugadorSubColRef = doc(torneoRef, "jugadores", payload.jugador_id);
            return await deleteDoc(jugadorSubColRef)
            .then((docRes) => {
                console.log("Inscrito with ID removido: ", payload.jugador_id);
                return docRes;
            })
            .catch((error) => {
                console.log("error removing Inscrito");
                console.log(error);
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    },
    async addImageTorneo({ commit }, payload) {
        console.log('addImageTorneo');
        console.log(payload);
        try {
            const docRef = doc(db, "torneos", payload.torneo_id);
            
            return await updateDoc(docRef, {
                imagenes: arrayUnion(payload.imagenURL)
            }).then((docRes) => {
                console.log("Imagen torneo with ID: ", docRes);
                return docRef;
            })
            .catch((error) => {
                console.log("error adding Imagen torneo");
                console.log(error);
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    },
    async removeImageTorneo({ commit }, payload) {
        console.log('removeImageTorneo');
        console.log(payload);
        try {
            const storage = getStorage();
            console.log('storage', storage);
            // Create a reference to the file to delete
            console.log('imagenURL', payload.imagenURL);
            var fileRef = sRef(storage, payload.imagenURL);
            console.log('fileRef', fileRef);
            
            // Delete the file using the delete() method 
            deleteObject(fileRef)
                .catch(function (error) {
                    // Some Error occurred
                    console.log('error borrando file torneo');
                    console.log(error);
                });
            
            const docRef = doc(db, "torneos", payload.torneo_id);
            console.log("Remove Imagen ", payload);
            await updateDoc(docRef, {
                imagenes: arrayRemove(payload.imagenURL)
            })
            .catch((error) => {
                console.log("error removing Imagen from torneo array");
                console.log(error);
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    },
    async configurarTorneo({ commit }, payload) {
        try {
            const docRef = doc(db, "torneos", payload.torneo_id);
            
            const colRef = collection(docRef, "grupos");
            
            payload.grupos.forEach((grupo)=>{
                addDoc(colRef, grupo)
                .then((docRes) => {
                    console.log("User grupo with ID: ", grupo);
                })
                .catch((error) => {
                    console.log("error adding User a grupo");
                    console.log(error);
                });

            });

            return await updateDoc(docRef, payload.data)
                .then((docRes) => {
                    console.log("Update config torneo with ID: ", payload);
                    return docRes;
                })
                .catch((error) => {
                    console.log("error config torneo");
                    console.log(error);
                });
            
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    },
    async fetchTorneo({ commit }, payload) {
        try {
            console.log('%ctorneosStore.js line:69 payload', 'color: #007acc;', payload);
            const docRef = doc(db, "torneos", payload);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                let torneo = docSnap.data();
                torneo.id = docSnap.id;
                console.log("Document data:", torneo);
                commit('SET_TORNEO',torneo);
                return torneo;
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    },
    async fetchInscritosTorneo({ commit }, payload) {
        try {
            console.log('%ctorneosStore.js line:69 payload', 'color: #007acc;', payload);
            const docRef = doc(db, "torneos", payload);
            const querySnapshot = await getDocs(collection(docRef, "jugadores"));
            
            let inscritos = [];

            return doSnapShot(querySnapshot);
    
            //commit("SET_TORNEOS_LISTENER", query);
    
            function doSnapShot(querySnapshot) {
                console.log("doSnapShot");
                console.log(querySnapshot);
                console.log(querySnapshot.docs);
                querySnapshot.docs.forEach((doc) => {
                    let p = doc.data();
                    console.log(`${doc.id} => ${doc.data()}`);
                    p.id = doc.id;
                    inscritos.push(p);
                });
                return inscritos;
            }

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    },
    async fetchGruposTorneo({ commit }, payload) {
        try {
            console.log('%ctorneosStore.js line:69 payload', 'color: #007acc;', payload);
            const docRef = doc(db, "torneos", payload);
            const querySnapshot = await getDocs(collection(docRef, "grupos"));
            
            let grupos = [];

            return doSnapShot(querySnapshot);
    
            //commit("SET_TORNEOS_LISTENER", query);
    
            function doSnapShot(querySnapshot) {
                querySnapshot.docs.forEach((doc) => {
                    let p = doc.data();
                    console.log(`${doc.id} => ${doc.data()}`);
                    p.id = doc.id;
                    grupos.push(p);
                });
                return grupos;
            }

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    },
};

const mutations = {
    SET_TORNEOS_LISTENER(state, listener) {
        if (listener) {
            state.torneosListener = listener;
        } else {
            state.torneosListener();
        }
    },
    SET_TORNEOS(state, payload) {
        console.log("setTorneos", payload);
        state.torneos = payload;
    },
    SET_TORNEO(state, payload) {
        console.log("setTorneo", payload);
        state.torneo = payload;
    },
    ADD_TORNEO(state, payload) {
        state.torneos.push(payload);
    },
    SET_TORNEOS_ERROR(state, payload) {
        state.torneosError = payload;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
