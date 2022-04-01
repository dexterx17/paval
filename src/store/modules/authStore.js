import { 
      getAuth,
      signInWithEmailAndPassword,
      createUserWithEmailAndPassword,
      signOut,
      onAuthStateChanged
    } from "firebase/auth";

import { getFirestore,
        doc,
        setDoc
    } from "firebase/firestore";

import { getStorage, ref, uploadBytes, getDownloadURL  } from "firebase/storage";


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
    signUpAction({ commit, dispatch }, payload) {
      const auth = getAuth();
      return createUserWithEmailAndPassword(auth, payload.email, payload.password)
         .then((data) => {
            data.nombre = payload.name;
            console.log("Register", data);
            commit("setUser", data);
            dispatch('initPlayer',data);
            return data;
         })
        .catch(error => {
          commit("setError", error.message);
          return error;
        });
    },
    signInAction({ dispatch, commit }, payload) {
      const auth = getAuth();
      var vm = this;
      console.log(payload);
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
    },
    initPlayer({ commit }, payload) {
      const db = getFirestore();
      try {
        setDoc(doc(db, "players",payload.user.uid), {
          source: 'web',
          created_at: Date(),
          nombre: payload.nombre ?? payload.user.displayName,
          avatar: payload.user.photoURL ?? null
        }).then((docRef)=>{
          console.log("Document written with ID: ", docRef);
        }).catch((error)=>{
          console.log('error init Player');
          console.log(error);
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    uploadAvatar({commit, dispatch},payload){

      const storage = getStorage();

      const storageRef = ref(storage, "files/" + payload.imagen.name);
 
      uploadBytes(storageRef, payload.imagen).then(function (snapshot) {
          
        console.log('payload');
        console.log(payload);
        console.log(snapshot);

        // Upload completed successfully, now we can get the download URL
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          payload.user.avatar = downloadURL;
          dispatch('updateProfile',payload.user);
        });

      });

    },
    updateProfile({ commit, dispatch }, payload) {
      const db = getFirestore();
      try {
        setDoc(doc(db, "players",payload.uid), payload)
        .then((docRef)=>{
          console.log("Document written with ID: ", docRef);
        }).catch((error)=>{
          console.log('error init Player');
          console.log(error);
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
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