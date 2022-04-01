import { createStore } from "vuex";

import authStore from './modules/authStore';
import playersStore from './modules/playersStore';
import torneosStore from './modules/torneosStore';
import clubsStore from './modules/clubsStore';
import seriesStore from './modules/seriesStore';



export default createStore({
  modules: {
    authStore,
    playersStore,
    torneosStore,
    clubsStore,
    seriesStore
  },
  state: {
    products: [],
    cart: []
  },
  mutations: {
    addCartItem(state, item) {
      item.quantity = 1;
      state.cart.push(item);
    },
    updateCartItem(state, updatedItem) {
      state.cart = state.cart.map((cartItem) => {
        if (cartItem.id == updatedItem.id) {
          return updatedItem;
        }

        return cartItem;
      });
    },
    removeCartItem(state, item) {
      state.cart = state.cart.filter((cartItem) => {
        return cartItem.id != item.id;
      });
    }
  }
});