import Vue from "vue";
import Vuex from "vuex";
import alert from "./modules/alert";
import user from "./modules/user";
import games from "./modules/games";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { alert, user, games }
});
