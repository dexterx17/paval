import { db } from '../../plugins/firebase';

import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  where,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
} from "firebase/firestore";

const state = {
  players: [],
  playersListener: () => {},
  error: null,
};

const getters = {
  getPlayers(state) {
    return state.plsyers;
  },
  getPlayer(state, id) {
    return state.players.find((player) => player.id === id);
  },
};

const actions = {
  async loadPlayers({ commit }, payload) {
    console.log("loadPlayers");
    console.log(db);
    const querySnapshot = await getDocs(collection(db, "players"));

    console.log(querySnapshot);
    let players = [];
    doSnapShot(querySnapshot);

    //commit("SET_PLAYERS_LISTENER", query);

    function doSnapShot(querySnapshot) {
      console.log("doSnapShot");
      console.log(querySnapshot);
      console.log(querySnapshot.docs);
      querySnapshot.docs.forEach((doc) => {
        let p = doc.data();
        console.log(`${doc.id} => ${doc.data()}`);
        p.id = doc.id;
        players.push(p);
      });
      commit("SET_PLAYERS", players);
    }
  },
  async fetchPlayersOptions({ commit }, payload) {
    console.log("loadPlayersOptions"); 
    let q;
    if(payload.idsInscritos.length > 0){
      q = query(collection(db, "players"), where("uid", "not-in", payload.idsInscritos));
    }else{
      q = query(collection(db, "players"));
    }

    const queryPlayersSnapshot = await getDocs(q);
    
      console.log(queryPlayersSnapshot);
      let players = [];
      return doSnapShot(queryPlayersSnapshot);

      function doSnapShot(queryPlayersSnapshot) {
        console.log("doSnapShot");
        console.log(queryPlayersSnapshot.docs);
        queryPlayersSnapshot.docs.forEach((doc) => {
          let p = doc.data();
          console.log(`Player: ${doc.id} => ${doc.data()}`);
          p.id = doc.id;
          players.push(p);
        });
        return players;
      }
  },
  async loadProfileByUid({ commit }, payload) {
    try {
        console.log('%ctorneosStore.js line:69 payload', 'color: #007acc;', payload);
        let q = query(collection(db, "players"), where("uid", "==", payload));
        const docSnap = await getDocs(q);

      if (docSnap.docs) {
          
            console.log("Profile UID data:", docSnap.docs[0].data());
            return docSnap.docs[0].data();
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            return null;
        }
    } catch (e) {
        console.error("Error adding document: ", e);
    }
  },
  async loadProfile({ commit }, payload) {
    try {
        console.log('%ctorneosStore.js line:69 payload', 'color: #007acc;', payload);
        let q = query(collection(db, "players"), where("uid", "==", payload));
        const docSnap = await getDocs(q);

        if (docSnap.docs) {
            console.log("Document data:", docSnap.docs[0].data());
            return docSnap.docs[0].data();
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            return null;
        }
    } catch (e) {
        console.error("Error adding document: ", e);
    }
  },
  addPlayer({ commit }, payload) {
    const db = getFirestore();
    try {
      addDoc(collection(db, "players"), {
        nombre: payload.user.displayName ?? "",
        bod: null,
        nacionalidad: "ec",
        sexo: "H",
        avatar: payload.user.photoURL ?? null,
      })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef);
        })
        .catch((error) => {
          console.log("error init Player");
          console.log(error);
        });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  },
  async updatePlayer({ commit }, payload) {
    const db = getFirestore();
    try {
      return await setDoc(doc(db, "players", payload.user.uid), {
        nombre: payload.user.displayName ?? "",
        bod: null,
        nacionalidad: "ec",
        sexo: "H",
        avatar: payload.user.photoURL ?? null,
      })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef);
          return docRef;
        })
        .catch((error) => {
          console.log("error init Player");
          console.log(error);
          return null;
        });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  },
  async updateAllPlayers({ commit }, payload) {

    console.log('payloadlll',payload);

    payload.players.forEach(p => {
      setDoc(doc(db, "players", p.uid), {
        total_torneos:0,
        total_partidos: 0,
        total_victorias: 0,
        total_derrotas: 0,
        ranking: 1000
      })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef);
          return docRef;
        })
    })
  }
};
const mutations = {
  SET_PLAYERS_LISTENER(state, listener) {
    if (listener) {
      state.playersListener = listener;
    } else {
      state.playersListener();
    }
  },
  SET_PLAYERS(state, payload) {
    console.log("setPlayers", payload);
    state.players = payload;
  },
  ADD_PLAYER(state, payload) {
    state.players.push(payload);
  },
  setError(state, payload) {
    state.error = payload;
  },
};
export default {
  state,
  getters,
  actions,
  mutations,
};
