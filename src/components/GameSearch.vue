<template>
  <v-autocomplete
    v-model="model"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    item-value="name"
    item-text="name"
    hide-no-data
    hide-selected
    return-object
    ><template v-slot:append-item><v-btn block>Load more</v-btn></template>
  </v-autocomplete>
</template>

<script>
export default {
  data: () => ({
    model: null,
    items: [],
    isLoading: false,
    search: null
  }),
  watch: {
    search(val) {
      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load input items
      fetch(`https://api.rawg.io/api/games?search=${val}&page_size=40`)
        .then(res => res.json())
        .then(res => {
          const { count, results } = res;
          this.count = count;
          this.items = results;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    }
  }
};
</script>

<style></style>
