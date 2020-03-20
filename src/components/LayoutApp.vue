<template>
  <div>
    <v-app-bar app>
      <v-img
        alt="GameManager Logo"
        class="shrink"
        contain
        src="@/assets/logo.png"
        transition="scale-transition"
        width="50"
      />
      <v-spacer></v-spacer>
      <slot name="search" />
      <v-spacer></v-spacer>
      <v-btn @click="handleSignout" text>
        Sign out
      </v-btn>
    </v-app-bar>

    <v-content>
      <slot />
    </v-content>
  </div>
</template>

<script>
export default {
  methods: {
    handleSignout() {
      this.$store.dispatch("user/signOut");
    }
  }
};
</script>

<style></style>
