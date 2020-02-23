import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.config.errorHandler = function(err, vm, info) {
  console.log("[Global Error Handler]: Error in " + info + ": " + err);
};

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
