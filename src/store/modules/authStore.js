import { 
      getAuth,
      signInWithEmailAndPassword,
      createUserWithEmailAndPassword,
      signOut,
      onAuthStateChanged
    } from "firebase/auth";


const state = {
    user: null,
    error: null
 };
 const getters = {
   getUser(state) {
      return state.user;
    },
    isUserAuth(state) {
      return !!state.user;
    },
    getError(state) {
      return state.error;
    }
 };
 const actions = {
   authAction({ commit }) {
      const auth = getAuth();
      onAuthStateChanged(auth, user => {
        if (user) {
          commit("setUser", user);
        } else {
          commit("setUser", null);
        }
      });
    },
    signUpAction({ commit }, payload) {
      const auth = getAuth();

      return createUserWithEmailAndPassword(auth, payload.email, payload.password)
         .then((data) => {
            console.log("Register", data);
            commit("setUser", data);
            return data;
         })
        .catch(error => {
          commit("setError", error.message);
          return error;
        });
    },
    signInAction({ commit }, payload) {
      const auth = getAuth();
      return signInWithEmailAndPassword(auth, payload.email, payload.password)
         .then((data) => {
            commit("setUser", data);
            return data;
         })
        .catch(error => {
          return error;
        });
    },
    signOutAction({ commit }) {
      const auth = getAuth();

      return signOut(auth)
        .then(() => {
          commit("setUser", null);
        })
        .catch(error => {
          commit("setError", error.message);
        });
    }
 };
 const mutations = {
    setUser(state, payload){
       state.user = payload
    },
    setError(state, payload){
       state.error = payload;
    }
 };
 export default {
    state,
    getters,
    actions,
    mutations
 }  