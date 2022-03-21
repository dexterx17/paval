import { 
      getAuth,
      signInWithEmailAndPassword,
      createUserWithEmailAndPassword,
      signOut,
      onAuthStateChanged
    } from "firebase/auth";


const state = {
    test: 'My first state!',
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

      createUserWithEmailAndPassword(auth, payload.email, payload.password)
         .then((data) => {
            console.log("Register", data);
            commit("setUser", data);
         })
        .catch(error => {
          commit("setError", error.message);
        });
    },
    signInAction({ commit }, payload) {
      const auth = getAuth();

      signInWithEmailAndPassword(auth, payload.email, payload.password)
         .then((data) => {
            console.log("signIn", data);
            commit("setUser", data);
         })
        .catch(error => {
          commit("setError", error.message);
        });
    },
    signOutAction({ commit }) {
      const auth = getAuth();

      signOut(auth)
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