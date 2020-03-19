<template>
  <v-form @submit.prevent="onSubmit">
    <v-text-field v-model="email" label="Email" required></v-text-field>
    <v-text-field v-model="password" label="Password" required></v-text-field>
    <div class="d-flex justify-center"></div>
    <v-btn class="mt-2" color="primary" type="submit" depressed block large>
      Submit
    </v-btn>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async onSubmit() {
      await this.$store.dispatch("user/logIn", {
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>

<style></style>
