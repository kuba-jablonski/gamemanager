export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    load(state, games) {
      state.list = games;
    }
  },
  getters: {
    active: state => state.list.filter(game => game.status === "active"),
    wishlist: state => state.list.filter(game => game.status === "wishlist"),
    backlog: state => state.list.filter(game => game.status === "backlog"),
    completed: state => state.list.filter(game => game.status === "completed")
  }
};
