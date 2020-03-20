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
      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <slot />
    </v-content>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
