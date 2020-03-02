// import Vue from "vue";

export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    load(state, games) {
      state.list = games;
    }
    // add(state, game) {}
  },
  actions: {
    // async add({ commit, rootState }, payload) {
    //   const game = await Vue.$http.post("/games", {
    //     ...payload,
    //     user: rootState.user.id
    //   });
    // }
  },
  getters: {
    active: state => state.list.filter(game => game.status === "active"),
    wishlist: state => state.list.filter(game => game.status === "wishlist"),
    backlog: state => state.list.filter(game => game.status === "backlog"),
    completed: state => state.list.filter(game => game.status === "completed")
  }
};
