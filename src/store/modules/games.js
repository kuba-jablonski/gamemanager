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
    }
  },
  actions: {
    async add({ commit, rootState }, payload) {
      console.log(rootState);
      try {
        const { game } = await api.post("/games", {
          ...payload,
          user: rootState.user.user._id
        });
        commit("add", game);
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
