import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#00BCD4",
        secondary: "#D400BB",
        accent: "#8c9eff",
        error: "#b71c1c"
      }
    }
  }
});
