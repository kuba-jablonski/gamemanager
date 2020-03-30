<template>
  <v-autocomplete
    @input="$emit('input', $event)"
    :value="value"
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
  props: ["value"],
  data: () => ({
    items: [],
    isLoading: false,
    search: null,
    dialog: false
  }),
  methods: {
    fetchData: debounce(async function(searchTerm) {
      this.isLoading = true;
      try {
        const { data } = await axios.get(
          `https://api.rawg.io/api/games?search=${searchTerm}&page_size=40`
        );
        this.items = data.results;
      } catch (e) {
        // TODO: handle errors
        // console.log(e);
      }
      this.isLoading = false;
    }, 500)
  },
  watch: {
    async search(val) {
      if (!val) return;
      if ((this.value && val === this.value.name) || val.trim() === "") return;

      try {
        await this.fetchData(val);
      } catch (e) {
        if (e !== "canceled") {
          // TODO: handle errors
          // console.log(e);
        }
      }
    }
  }
};
</script>

<style></style>
