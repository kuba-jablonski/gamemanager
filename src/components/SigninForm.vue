<template>
  <v-form @submit.prevent="onSubmit">
    <v-text-field v-model="email" label="Email" required></v-text-field>
    <v-text-field
      v-model="password"
      :type="showPassword ? 'text' : 'password'"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showPassword = !showPassword"
      label="Password"
      required
    ></v-text-field>
    <div class="d-flex justify-center"></div>
    <v-btn
      class="mt-2"
      color="primary"
      type="submit"
      :loading="isLoading"
      depressed
      block
      large
    >
      Submit
    </v-btn>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      isLoading: false
    };
  },
  methods: {
    async onSubmit() {
      this.isLoading = true;

      await this.$store.dispatch("user/logIn", {
        email: this.email,
        password: this.password
      });

      this.isLoading = false;
    }
  }
};
</script>

<style></style>
