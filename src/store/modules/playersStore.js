import {
  getFirestore,
  collection,
  doc,
  getDocs,
  addDoc,
  setDoc,
} from "firebase/firestore";

const state = {
  players: [],
  error: null,
};

const getters = {
  getPlayers(state) {
    return state.user;
  },
  getPlayer(state) {
    return !!state.user;
  },
};

const actions = {
  loadPlayers({ commit }, payload) {
    const db = getFirestore();
    try {
      return getDocs(collection(db, "players"))
        .then((docs) => {
          console.log("players list: ", docs);
          let players = [];

          docs.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            console.log(doc.data());
            players.push({
              nombre: doc.get("nombre"),
              bod: doc.get("bod"),
              edad: doc.get("edad"),
              nacionalidad: doc.get("nacionalidad"),
              sexo: doc.get("sexo"),
            });
          });
          commit("SET_PLAYERS", players);
        })
        .catch((error) => {
          console.log("error init Player");
          console.log(error);
          commit("setError", error);
        });
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
