import Vue from "vue";
import Vuex from "vuex";
import error from "./modules/error";
import user from "./modules/user";
import games from "./modules/games";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { error, user, games }
});
