import { db } from '../../plugins/firebase';

import {
    collection,
    getDocs,
    doc,
    getDoc,
    addDoc
} from "firebase/firestore";


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
                clubs.push(p);
            });
            commit("SET_TORNEOS", clubs);
        }
    },
    async addClub({ commit }, payload) {
        try {
            addDoc(collection(db, "clubs"), payload)
                .then((docRef) => {
                    console.log("Club with ID: ", docRef);
                })
                .catch((error) => {
                    console.log("error adding Club");
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
                console.log("Document data:", docSnap.data());
                commit('SET_TORNEO',docSnap.data());
                return docSnap.data();
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
            state.clubsListener = listener;
        } else {
            state.clubsListener();
        }
    },
    SET_TORNEOS(state, payload) {
        console.log("setClubs", payload);
        state.clubs = payload;
    },
    SET_TORNEO(state, payload) {
        console.log("setClub", payload);
        state.club = payload;
    },
    ADD_TORNEO(state, payload) {
        state.clubs.push(payload);
    },
    SET_TORNEOS_ERROR(state, payload) {
        state.clubsError = payload;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
