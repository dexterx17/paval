import { db } from '../../plugins/firebase';

import {
    collection,
    getDocs,
    doc,
    getDoc,
    addDoc
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
        const querySnapshot = await getDocs(collection(db, "partidos"));

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
                console.log(`${doc.id} => ${doc.data()}`);
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
    async fetchPartido({ commit }, payload) {
        try {
            console.log('%cpartidosStore.js line:69 payload', 'color: #007acc;', payload);
            const docRef = doc(db, "partidos", payload);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                commit('SET_PARTIDO',docSnap.data());
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
