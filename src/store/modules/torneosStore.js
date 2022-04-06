import { db } from '../../plugins/firebase';

import {
    collection,
    getDocs,
    doc,
    getDoc,
    addDoc
} from "firebase/firestore";


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

        console.log(querySnapshot);

        let torneos = [];

        doSnapShot(querySnapshot);

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
        }
    },
    async addTorneo({ commit }, payload) {
        try {
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
        console.log(payload.torneo);
        try {
            alert(payload.torneo);
            const docRef = doc(db, "torneos", payload.torneo);
            const colRef = collection(docRef, "jugadores");
            
            console.log('inscribirEnTorneo', payload);


            return addDoc(colRef, payload)
            .then((docRef) => {
                console.log("Inscrito with ID: ", docRef);
                return docRef;
            })
            .catch((error) => {
                console.log("error adding Inscrito");
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
                let torneo = docs.data();
                torneo.id = docs.id;
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
    }
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
