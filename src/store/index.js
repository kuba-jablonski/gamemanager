import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    log: {
      active: [],
      backlog: [],
      wishlist: [],
      completed: []
    }
  },
  mutations: {
    addToLog(state, { type, game }) {
      state.log[type].push(game);
    }
  },
  actions: {},
  modules: {}
});
