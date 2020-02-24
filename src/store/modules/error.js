export default {
  namespaced: true,
  state: {
    active: false,
    message: ""
  },
  mutations: {
    display(state, message) {
      state.active = true;
      state.message = message;
    },
    dismiss(state) {
      state.active = false;
      state.message = "";
    }
  }
};
