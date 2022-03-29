import { db } from '../../plugins/firebase';

import {
    collection,
    getDocs,
    addDoc
} from "firebase/firestore";


const state = {
    torneos: [],
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
            addDoc(collection(db, "torneos"), payload)
                .then((docRef) => {
                    console.log("Torneo with ID: ", docRef);
                })
                .catch((error) => {
                    console.log("error adding Torneo");
                    console.log(error);
                });
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
