<template>
  <v-form @submit.prevent="onSubmit">
    <v-text-field v-model="username" label="Username" required></v-text-field>
    <v-text-field v-model="email" label="Email" required></v-text-field>
    <v-text-field
      v-model="password"
      :type="showPassword ? 'text' : 'password'"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showPassword = !showPassword"
      label="Password"
      required
    ></v-text-field>
    <v-text-field
      v-model="passwordConfirm"
      :type="showConfirmPassword ? 'text' : 'password'"
      :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showConfirmPassword = !showConfirmPassword"
      label="Confirm Password"
      required
    ></v-text-field>
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
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      showPassword: false,
      showConfirmPassword: false
    };
  },
  methods: {
    async onSubmit() {
      await this.$store.dispatch("user/signUp", {
        username: this.username,
        email: this.email,
        password: this.password,
        passwordConfirm: this.passwordConfirm
      });
    }
  }
};
</script>

<style></style>
