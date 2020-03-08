import api from "@/api";

export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    load(state, games) {
      state.list = games;
    },
    add(state, game) {
      state.list.push(game);
    },
    updateOne(state, { gameId, updatedStatus }) {
      const index = state.list.findIndex(game => game._id === gameId);
      state.list[index].status = updatedStatus;
    },
    deleteOne(state, gameId) {
      const index = state.list.findIndex(game => game._id === gameId);
      state.list.splice(index, 1);
    }
  },
  actions: {
    async add({ commit, rootState }, payload) {
      try {
        const { game } = await api.post("/games", {
          ...payload,
          user: rootState.user.user._id
        });
        commit("add", game);
      } catch (err) {
        commit("error/display", err.data.message, { root: true });
      }
    },
    async updateOne({ commit }, { gameId, updatedStatus }) {
      try {
        commit("updateOne", { gameId, updatedStatus });
        await api.patch(`/games/${gameId}`, {
          status: updatedStatus
        });
      } catch (err) {
        commit("error/display", err.data.message, { root: true });
      }
    },
    async deleteOne({ commit }, gameId) {
      try {
        commit("deleteOne", gameId);
        await api.delete(`games/${gameId}`);
      } catch (err) {
        commit("error/display", err.data.message, { root: true });
      }
    }
  },
  getters: {
    active: state => state.list.filter(game => game.status === "active"),
    wishlist: state => state.list.filter(game => game.status === "wishlist"),
    backlog: state => state.list.filter(game => game.status === "backlog"),
    completed: state => state.list.filter(game => game.status === "completed")
  }
};
