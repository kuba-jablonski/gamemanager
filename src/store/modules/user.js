import api from "@/api";
import router from "@/router";

export default {
  namespaced: true,
  state: {
    token: null,
    user: null
  },
  mutations: {
    addToken(state, token) {
      state.token = token;
    },
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    async signUp({ commit }, payload) {
      try {
        const {
          token,
          user: { games, ...user }
        } = await api.post("/users/signup", payload);
        commit("addToken", token);
        commit("setUser", user);
        commit("games/load", games, { root: true });
        router.push("/app");
      } catch (err) {
        commit("error/display", err.data.message, { root: true });
      }
    },
    async logIn({ commit }, payload) {
      try {
        const {
          token,
          user: { games, ...user }
        } = await api.post("/users/login", payload);
        commit("addToken", token);
        commit("setUser", user);
        commit("games/load", games, { root: true });
        router.push("/app");
      } catch (err) {
        commit("error/display", err.data.message, { root: true });
      }
    }
  }
};
