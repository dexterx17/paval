import { db } from '../../plugins/firebase';

import {
    collection,
    getDocs,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    addDoc,
    arrayUnion,
    arrayRemove
} from "firebase/firestore";

import { getStorage, ref as sRef, deleteObject } from "firebase/storage";

const state = {
    clubs: [],
    club: null,
    clubsError: null,
    clubsListenes: () => { }
};

const getters = {
    getClubs(state) {
        return state.clubs;
    }
};

const actions = {
    async loadClubs({ commit }, payload) {
        console.log("loadClubs");
        //const db = getFirestore();
        console.log(db);
        const querySnapshot = await getDocs(collection(db, "clubs"));

        console.log(querySnapshot);

        let clubs = [];

        return doSnapShot(querySnapshot);

        function doSnapShot(querySnapshot) {
            console.log("doSnapShot");
            console.log(querySnapshot);
            console.log(querySnapshot.docs);
            querySnapshot.docs.forEach((doc) => {
                let p = doc.data();
                console.log(`${doc.id} => ${doc.data()}`);
                p.id = doc.id;
                clubs.push(p);
            });
            commit("SET_CLUBS", clubs);
            return clubs;
        }
    },
    async addClub({ commit }, payload) {
        try {
            return await addDoc(collection(db, "clubs"), payload)
                .then((docRef) => {
                    console.log("Club with ID: ", docRef.id);
                    return docRef;
                })
                .catch((error) => {
                    console.log("error adding Club");
                    console.log(error);
                });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    },
    async addImageClub({ commit }, payload) {
        console.log('addImageClub');
        console.log(payload);
        try {
            const docRef = doc(db, "clubs", payload.club_id);
            
            return await updateDoc(docRef, {
                imagenes: arrayUnion(payload.imagenURL)
            }).then((docRes) => {
                console.log("Imagen club with ID: ", docRes);
                return docRef;
            })
            .catch((error) => {
                console.log("error adding Imagen club");
                console.log(error);
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    },
    async removeImageClub({ commit }, payload) {
        console.log('removeImageClub');
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
            
            const docRef = doc(db, "clubs", payload.club_id);
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
    async updateClub({ commit }, payload) {
        try {
          setDoc(doc(db, "clubs",payload.uid), payload)
          .then((docRef)=>{
            console.log("Document written with ID: ", docRef);
          }).catch((error)=>{
            console.log('error init Player');
            console.log(error);
          });
        } catch (e) {
          console.error("Error adding document: ", e);
        }
    },
    async fetchClub({ commit }, payload) {
        try {
            console.log('%cclubsStore.js line:69 payload', 'color: #007acc;', payload);
            const docRef = doc(db, "clubs", payload);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                let club = docSnap.data();
                club.id = docSnap.id;
                console.log("Document data:", club);
                commit('SET_TORNEO',club);
                return club;
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    },
    async solicitarAfiliacion({ commit }, payload) {
        try {
            const docRef = doc(db, "clubs", payload.club.id);

            const colRef = collection(docRef, "solicitudes")

            console.log('payloadAfiliacin', payload);
            return await addDoc(colRef, payload.jugador)
            .then((docRef) => {
                console.log("Solicitud Afiliación with ID: ", docRef);
                return docRef;
            })
            .catch((error) => {
                console.log("error adding Solicitud Afiliación");
                console.log(error);
            });
        } catch (e) {
            console.error("Error adding afiliación: ", e);
        }
    },
    async fetchSolicitudesClub({ commit }, payload) {
        try {
            console.log('fetchSolicitudes: ', payload);
            const docRef = doc(db, "clubs", payload.club);
            const querySnapshot = await getDocs(collection(docRef, "solicitudes"));
            
            let solicitudes = [];

            return await doSnapShot(querySnapshot);
    
            //commit("SET_TORNEOS_LISTENER", query);
    
            function doSnapShot(querySnapshot) {
                console.log("doSnapShot");
                console.log(querySnapshot.docs);
                querySnapshot.docs.forEach((doc) => {
                    let p = doc.data();
                    console.log(`${doc.id} => ${doc.data()}`);
                    p.id = doc.id;
                    solicitudes.push(p);
                });
                return solicitudes;
            }

        } catch (e) {
            console.error("Error fetching solicitudes: ", e);
        }
    },
};

const mutations = {
    SET_CLUBS_LISTENER(state, listener) {
        if (listener) {
            state.clubsListener = listener;
        } else {
            state.clubsListener();
        }
    },
    SET_CLUBS(state, payload) {
        console.log("setClubs", payload);
        state.clubs = payload;
    },
    SET_CLUB(state, payload) {
        console.log("setClub", payload);
        state.club = payload;
    },
    ADD_CLUB(state, payload) {
        state.clubs.push(payload);
    },
    SET_CLUBS_ERROR(state, payload) {
        state.clubsError = payload;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
