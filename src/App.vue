<template>
  <v-app>
    <v-app-bar app>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>
      <v-spacer></v-spacer>
      <game-search @new="openDialog($event)" />
      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view />
      <v-dialog v-model="dialog" max-width="290" @click:outside="onCloseDialog">
        <v-card v-if="game">
          <v-card-title class="headline">{{ game.name }}</v-card-title>

          <v-card-text>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="dialog = false">
              Disagree
            </v-btn>

            <v-btn color="green darken-1" text @click="dialog = false">
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-content>
  </v-app>
</template>

<script>
import GameSearch from "@/components/GameSearch";

export default {
  name: "App",
  components: {
    GameSearch
  },
  data: () => ({
    dialog: false,
    game: null
  }),
  methods: {
    openDialog({ data, reset }) {
      console.log("IN APP", data);
      this.game = data;
      this.dialog = true;
      this.resetFn = reset;
    },
    onCloseDialog() {
      this.resetFn();
    }
  }
};
</script>
