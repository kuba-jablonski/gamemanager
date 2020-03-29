export default {
  namespaced: true,
  state: {
    active: false,
    message: "",
    type: "error"
  },
  mutations: {
    displayError(state, message) {
      state.active = true;
      state.message = message;
      state.type = "error";
    },
    displaySuccess(state, message) {
      state.active = true;
      state.message = message;
      state.type = "success";
    },
    dismiss(state) {
      state.active = false;
      state.message = "";
    }
  }
};
