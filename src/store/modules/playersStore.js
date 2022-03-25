import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  getDocs,
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
    const db = getFirestore();

    const query = onSnapshot(doc(db, "players"), doSnapShot);

    commit("SET_PLAYERS_LISTENER", query);

    function doSnapShot(querySnapshot) {
      docs.forEach((doc) => {
        let p = doc.data();
        console.log(`${doc.id} => ${doc.data()}`);
        p.id = doc.id;
        players.push(p);
      });
      commit("SET_PLAYERS", players);
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
  updatePlayer({ commit }, payload) {
    const db = getFirestore();
    try {
      setDoc(doc(db, "players", payload.user.uid), {
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