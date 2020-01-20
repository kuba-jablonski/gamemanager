import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    games: []
  },
  mutations: {
    addToGames(state, payload) {
      if (Array.isArray(payload)) {
        state.games = payload;
      } else {
        state.games.push(payload);
      }
    }
  },
  actions: {
    async getAllGames({ commit }) {
      try {
        const { data } = await axios.get("http://localhost:3000/api/v1/games");
        commit("addToGames", data);
      } catch (e) {
        console.log(e);
      }
    },
    async createGame({ commit }, payload) {
      try {
        const { data } = await axios.post(
          "http://localhost:3000/api/v1/games",
          payload
        );
        commit("addToGames", data);
      } catch (e) {
        console.log(e);
      }
    }
  },
  getters: {
    active: state => state.games.filter(game => game.logType === "active"),
    backlog: state => state.games.filter(game => game.logType === "backlog"),
    wishlist: state => state.games.filter(game => game.logType === "wishlist"),
    completed: state => state.games.filter(game => game.logType === "completed")
  }
});
