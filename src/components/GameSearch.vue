<template>
  <v-autocomplete
    @input="boop($event)"
    :value="model"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    item-value="name"
    item-text="name"
    hide-no-data
    hide-selected
    return-object
    cache-items
    hide-details
    prepend-icon="mdi-magnify"
    placeholder="Search for a game..."
  >
  </v-autocomplete>
</template>

<script>
import axios from "axios";
import debounce from "debounce-async";

export default {
  data: () => ({
    model: null,
    items: [],
    isLoading: false,
    search: null,
    dialog: false
  }),
  methods: {
    fetchData: debounce(async function(searchTerm) {
      const { data } = await axios.get(
        `https://api.rawg.io/api/games?search=${searchTerm}&page_size=40`
      );
      this.items = data.results;
    }, 500),
    boop(ev) {
      console.log("BOOPING", ev);
      this.model = ev;
      this.$emit("new", ev);
    }
  },
  watch: {
    async search(val) {
      if (this.model && val === this.model.name) {
        return;
      }
      console.log("logging", val);

      this.isLoading = true;
      try {
        await this.fetchData(val);
      } catch (e) {
        if (e !== "canceled") {
          // TODO: handle errors
          console.log(e);
        }
      }
      this.isLoading = false;
    }
  }
};
</script>

<style></style>
