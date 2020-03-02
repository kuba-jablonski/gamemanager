import api from "@/api";
import router from "@/router";

export default {
  namespaced: true,
  state: {
    user: null
  },
  mutations: {
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
        localStorage.setItem("token", token);
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
        localStorage.setItem("token", token);
        commit("setUser", user);
        commit("games/load", games, { root: true });
        router.push("/app");
      } catch (err) {
        commit("error/display", err.data.message, { root: true });
      }
    },
    async getMe({ commit }) {
      try {
        const {
          user: { games, ...user }
        } = await api.get("/users/me");
        commit("setUser", user);
        commit("games/load", games, { root: true });
      } catch (err) {
        commit("error/display", err.data.message, { root: true });
      }
    }
    // logOut({ commit }) {
    //   localStorage.removeItem("token");
    //   commit("setUser", null);
    // }
  },
  getters: {
    isAuthed: state => !!state.user
  }
};
