<template>
  <v-card>
    <v-toolbar :color="color" dark>
      <v-icon class="mr-2">{{ `mdi-${icon}` }}</v-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-toolbar>
    <v-list>
      <v-list-item
        v-for="game in games"
        :key="game.id"
        @click="$emit('onGameClick', game.apiId)"
      >
        <v-list-item-content>
          <v-list-item-title>{{ game.title }}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-action @click.stop.prevent>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn
                @click.prevent
                @mousedown.stop
                @touchstart.native.stop
                icon
                v-on="on"
              >
                <v-icon>
                  mdi-dots-vertical
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(value, key) in actionList"
                :key="value"
                @click="
                  $emit('onUpdateItemClick', {
                    gameId: game._id,
                    updatedStatus: value
                  })
                "
              >
                <v-list-item-title class="d-flex align-center space-between">
                  <v-icon class="mr-3">mdi-arrow-right</v-icon
                  >{{ key }}</v-list-item-title
                >
              </v-list-item>
              <v-list-item @click="$emit('onDeleteItemClick', game._id)">
                <v-list-item-title class="d-flex align-center space-between">
                  <v-icon class="mr-3">mdi-trash-can-outline</v-icon
                  >Delete</v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: ["title", "games", "color", "icon"],
  computed: {
    actionList() {
      const map = {
        Playing: "active",
        Backlog: "backlog",
        Wishlist: "wishlist",
        Completed: "completed"
      };

      delete map[this.title];
      return map;
    }
  }
};
</script>

<style></style>
