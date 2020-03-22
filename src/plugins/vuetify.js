import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import Vuetify from "vuetify/lib";
import IconGithub from "@/assets/github-square.svg";
import IconLinkedin from "@/assets/linkedin-square.svg";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    values: {
      github: {
        component: IconGithub
      },
      linkedin: {
        component: IconLinkedin
      }
    }
  },
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
