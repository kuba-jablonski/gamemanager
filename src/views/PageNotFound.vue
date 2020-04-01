<template>
  <v-container>
    <h1 class="mb-5">This page does not exist.</h1>
    <v-btn outlined :to="isAuthed ? '/app' : '/'"
      ><v-icon left>mdi-arrow-left</v-icon>Back</v-btn
    >
  </v-container>
</template>

<script>
export default {
  computed: {
    isAuthed() {
      return this.$store.getters["user/isAuthed"];
    }
  }
};
</script>

<style></style>
