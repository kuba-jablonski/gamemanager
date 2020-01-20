import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

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
  actions: {
    async createGame(_, payload) {
      try {
        const game = await axios.post(
          "http://localhost:3000/api/v1/games",
          payload
        );
        console.log(game);
      } catch (e) {
        console.log(e);
      }
    }
  },
  modules: {}
});
