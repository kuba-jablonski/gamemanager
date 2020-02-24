export default {
  namespaced: true,
  state: {
    token: null
  },
  mutations: {
    addToken(state, token) {
      state.token = token;
    }
  }
};
