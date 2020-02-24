<template>
  <v-app>
    <router-view />
    <v-snackbar
      @input="$store.commit('error/dismiss')"
      color="red"
      v-model="$store.state.error.active"
      :timeout="5000"
    >
      {{ $store.state.error.message }}
      <v-btn text @click="$store.commit('error/dismiss')">
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>
