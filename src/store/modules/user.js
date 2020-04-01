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
        commit("alert/displayError", err.data.message, { root: true });
      }
    },
    async logIn({ commit }, { rememberMe, ...credentials }) {
      try {
        const {
          token,
          user: { games, ...user }
        } = await api.post("/users/login", credentials);
        if (rememberMe) localStorage.setItem("token", token);
        commit("setUser", user);
        commit("games/load", games, { root: true });
        router.push("/app");
      } catch (err) {
        commit("alert/displayError", err.data.message, { root: true });
      }
    },
    signOut({ commit }) {
      localStorage.removeItem("token");
      commit("setUser", null);
      commit("games/load", [], { root: true });
      router.replace("/");
    },
    async getMe({ commit }) {
      try {
        const {
          user: { games, ...user }
        } = await api.get("/users/me");
        commit("setUser", user);
        commit("games/load", games, { root: true });
      } catch (err) {
        commit("alert/displayError", err.data.message, { root: true });
      }
    },
    async updateMe({ commit }, payload) {
      try {
        const { user } = await api.patch("/users/me", payload);
        commit("setUser", user);
        commit("alert/displaySuccess", "Updated successfully", { root: true });
      } catch (err) {
        commit("alert/displayError", err.data.message, { root: true });
      }
    },
    async changePassword({ commit }, payload) {
      try {
        const { token } = await api.patch("/users/updateMyPassword", payload);
        localStorage.setItem("token", token);
        commit("alert/displaySuccess", "Updated successfully", { root: true });
      } catch (err) {
        commit("alert/displayError", err.data.message, { root: true });
      }
    },
    async resetPassword({ commit }, { password, passwordConfirm, resetToken }) {
      try {
        const {
          token,
          user: { games, ...user }
        } = await api.patch(`/users/resetPassword/${resetToken}`, {
          password,
          passwordConfirm
        });
        localStorage.setItem("token", token);
        commit("setUser", user);
        commit("games/load", games, { root: true });
        router.replace("/app");
      } catch (err) {
        commit("alert/displayError", err.data.message, { root: true });
      }
    }
  },
  getters: {
    isAuthed: state => !!state.user
  }
};
