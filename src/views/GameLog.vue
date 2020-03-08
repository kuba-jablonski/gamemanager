<template>
  <layout-app>
    <template v-slot:search>
      <game-search v-model="game" />
    </template>

    <!-- DIALOG START -->
    <v-dialog v-model="dialog" max-width="700" @click:outside="onCloseDialog">
      <v-card v-if="gameDetails">
        <v-img
          height="300"
          class="align-end white--text"
          :src="gameDetails.background_image"
        >
          <v-card-title
            class="headline"
            style="background-color: rgba(0,0,0,0.6)"
            >{{ gameDetails.name }}

            <v-speed-dial
              v-if="dialogType === 'search'"
              v-model="fab"
              small
              right
              absolute
              direction="left"
            >
              <template v-slot:activator>
                <v-btn small fab>
                  <v-icon v-if="fab">mdi-close</v-icon>
                  <v-icon v-else>mdi-plus</v-icon>
                </v-btn>
              </template>
              <v-btn
                @click="addToLog('completed')"
                fab
                dark
                small
                color="blue-grey"
              >
                <v-icon>mdi-check</v-icon>
              </v-btn>
              <v-btn @click="addToLog('wishlist')" fab dark small color="amber">
                <v-icon>mdi-star</v-icon>
              </v-btn>
              <v-btn @click="addToLog('backlog')" fab dark small color="cyan">
                <v-icon>mdi-view-list</v-icon>
              </v-btn>
              <v-btn @click="addToLog('active')" fab dark small color="green">
                <v-icon>mdi-play</v-icon>
              </v-btn>
            </v-speed-dial>
          </v-card-title>
        </v-img>
        <v-card-subtitle class="mt-3"
          >{{ gameDetails.developers[0].name }} &bull;
          {{ gameDetails.released }}</v-card-subtitle
        >
        <v-card-text v-html="gameDetails.description" class="text--primary">
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- DIALOG END -->

    <v-container fluid>
      <v-row>
        <v-col v-for="log in logs" :key="log.type">
          <log-card
            @onGameClick="openDetailsDialog($event)"
            @onUpdateItemClick="handleGameUpdate($event)"
            @onDeleteItemClick="handleGameDelete($event)"
            :games="_self[log.type]"
            :title="log.title"
            :color="log.color"
          />
        </v-col>
      </v-row>
    </v-container>
  </layout-app>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import LayoutApp from "@/components/LayoutApp";
import GameSearch from "@/components/GameSearch";
import LogCard from "@/components/LogCard";

export default {
  components: {
    LayoutApp,
    GameSearch,
    LogCard
  },
  data: () => ({
    dialog: false,
    dialogType: null,
    game: null,
    gameDetails: null,
    fab: false,
    logs: [
      {
        title: "Playing",
        type: "active",
        color: "green"
      },
      {
        title: "Backlog",
        type: "backlog",
        color: "cyan"
      },
      {
        title: "Wishlist",
        type: "wishlist",
        color: "amber"
      },
      {
        title: "Completed",
        type: "completed",
        color: "blue-gray"
      }
    ]
  }),
  methods: {
    async getGameDetails(id) {
      // TODO: Add error handling
      const { data } = await axios.get(`https://api.rawg.io/api/games/${id}`);
      this.gameDetails = data;
    },
    openDetailsDialog(id) {
      this.dialogType = "update";
      this.dialog = true;
      this.getGameDetails(id);
    },
    onCloseDialog() {
      this.dialog = false;
      this.game = null;
      this.gameDetails = null;
    },
    async addToLog(type) {
      this.dialog = false;
      await this.$store.dispatch("games/add", {
        status: type,
        apiId: this.gameDetails.id,
        title: this.gameDetails.name
      });
    },
    async handleGameUpdate({ gameId, updatedStatus }) {
      await this.$store.dispatch("games/updateOne", {
        gameId,
        updatedStatus
      });
    },
    async handleGameDelete(gameId) {
      await this.$store.dispatch("games/deleteOne", gameId);
    }
  },
  computed: {
    ...mapGetters("games", ["active", "backlog", "wishlist", "completed"])
  },
  watch: {
    async game(val) {
      if (val) {
        this.dialogType = "search";
        this.dialog = true;
      } else {
        this.dialog = false;
        return;
      }

      await this.getGameDetails(val.id);
    }
  },
  mounted() {
    this.$store.dispatch("getAllGames");
  }
};
</script>

<style></style>
