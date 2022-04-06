import { db } from '../../plugins/firebase';

import {
    collection,
    getDocs,
    doc,
    getDoc,
    addDoc
} from "firebase/firestore";


const state = {
    series: [],
    serie: null,
    seriesError: null,
    seriesListenes: () => { }
};

const getters = {
    getSeries(state) {
        return state.series;
    }
};

const actions = {
    async loadSeries({ commit }, payload) {
        console.log("loadSeries");
        //const db = getFirestore();
        console.log(db);
        const querySnapshot = await getDocs(collection(db, "series"));

        console.log(querySnapshot);

        let series = [];

        doSnapShot(querySnapshot);

        //commit("SET_SERIES_LISTENER", query);

        function doSnapShot(querySnapshot) {
            console.log("doSnapShot");
            console.log(querySnapshot);
            console.log(querySnapshot.docs);
            querySnapshot.docs.forEach((doc) => {
                let p = doc.data();
                console.log(`${doc.id} => ${doc.data()}`);
                p.id = doc.id;
                series.push(p);
            });
            commit("SET_SERIES", series);
        }
    },
    async loadSeriesClub({ commit }, payload) {
        console.log("loadSeriesClub");
        console.log(payload);
        //const db = getFirestore();
        const docRef = doc(db, "clubs", payload.club);
        console.log('docRef');
        console.log(docRef);
        const colRef = collection(docRef, "series")
        console.log('colRef');
        console.log(colRef);
        const querySnapshot = await getDocs(colRef);

        console.log(querySnapshot);

        let series = [];

        return doSnapShot(querySnapshot);

        //commit("SET_SERIES_LISTENER", query);

        function doSnapShot(querySnapshot) {
            console.log("doSnapShot");
            console.log(querySnapshot.docs);
            querySnapshot.docs.forEach((doc) => {
                let p = doc.data();
                console.log(`${doc.id} => ${doc.data()}`);
                p.id = doc.id;
                series.push(p);
            });
            commit("SET_SERIES", series);
            return series;
        }

    },
    async addSerie({ commit }, payload) {
        try {
            const docRef = doc(db, "clubs", payload.club);
            const colRef = collection(docRef, "series")

            return await addDoc(colRef, payload)
            .then((docRef) => {
                console.log("Serie with ID: ", docRef);
                return docRef;
            })
            .catch((error) => {
                console.log("error adding Serie");
                console.log(error);
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    },
    async fetchSerie({ commit }, payload) {
        try {
            console.log('%cseriesStore.js line:69 payload', 'color: #007acc;', payload);
            const docRef = doc(db, "series", payload);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                commit('SET_SERIE',docSnap.data());
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
    SET_SERIES_LISTENER(state, listener) {
        if (listener) {
            state.seriesListener = listener;
        } else {
            state.seriesListener();
        }
    },
    SET_SERIES(state, payload) {
        console.log("setSeries", payload);
        state.series = payload;
    },
    SET_SERIE(state, payload) {
        console.log("setSerie", payload);
        state.serie = payload;
    },
    ADD_SERIE(state, payload) {
        state.series.push(payload);
    },
    SET_SERIES_ERROR(state, payload) {
        state.seriesError = payload;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
