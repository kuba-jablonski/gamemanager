<template>
  <div>
    <v-navigation-drawer class="drawer" v-model="drawer" app clipped>
      <v-list>
        <v-list-item-group color="primary">
          <v-list-item to="/app" exact link>
            <v-list-item-icon>
              <v-icon>mdi-application</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>App</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/app/profile" exact link>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/app/about" exact link>
            <v-list-item-icon>
              <v-icon>mdi-information</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>About</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <template v-slot:append>
        <div class="pb-3 px-2">
          <v-btn @click="handleSignout" block>Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="d-none d-md-flex">GameManager</v-toolbar-title>
      <div class="search">
        <game-search v-model="game" />
      </div>
    </v-app-bar>

    <v-content>
      <router-view :game="game" @onCloseDialog="game = null" />
    </v-content>
  </div>
</template>

<script>
import GameSearch from "@/components/GameSearch";

export default {
  components: { GameSearch },
  data() {
    return {
      drawer: this.$vuetify.breakpoint.lgAndUp,
      game: null
    };
  },
  methods: {
    handleSignout() {
      this.$store.dispatch("user/signOut");
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  max-width: 500px;
}
</style>
