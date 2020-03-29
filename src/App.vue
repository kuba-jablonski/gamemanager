<template>
  <v-app>
    <router-view />
    <v-snackbar
      @input="$store.commit('alert/dismiss')"
      :color="$store.state.alert.type"
      v-model="$store.state.alert.active"
      :timeout="5000"
    >
      {{ $store.state.alert.message }}
      <v-btn text @click="$store.commit('alert/dismiss')">
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
