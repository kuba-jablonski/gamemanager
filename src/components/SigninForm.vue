<template>
  <v-form @submit.prevent="onSubmit">
    <v-text-field
      v-model="email"
      label="Email"
      autocomplete="off"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      :type="showPassword ? 'text' : 'password'"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showPassword = !showPassword"
      label="Password"
      required
      autocomplete="off"
    ></v-text-field>
    <div class="d-flex justify-space-between align-center">
      <v-checkbox
        color="primary"
        v-model="rememberMe"
        label="Remember me"
      ></v-checkbox>
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on }">
          <a v-on="on" class="secondary--text">Forgot password?</a>
        </template>
        <v-card>
          <v-card-title class="headline grey lighten-2 mb-4" primary-title>
            Send reset email
          </v-card-title>
          <v-card-text>
            <p>Please enter your email address.</p>
            <v-text-field
              v-model="resetEmail"
              label="Email"
              autocomplete="off"
              required
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn
              :loading="sendingEmail"
              color="primary"
              text
              @click="sendResetEmail"
            >
              Send
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
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
import api from "@/api";

export default {
  data() {
    return {
      email: "",
      resetEmail: "",
      password: "",
      showPassword: false,
      isLoading: false,
      rememberMe: true,
      dialog: false,
      sendingEmail: false
    };
  },
  methods: {
    async onSubmit() {
      this.isLoading = true;

      await this.$store.dispatch("user/logIn", {
        email: this.email,
        password: this.password,
        rememberMe: this.rememberMe
      });

      this.isLoading = false;
    },
    async sendResetEmail() {
      this.sendingEmail = true;
      try {
        await api.post("/users/forgotPassword", { email: this.resetEmail });
        this.resetEmail = "";
        this.dialog = false;
      } catch (err) {
        this.$store.commit("error/display", err.data.message);
      }
      this.sendingEmail = false;
    }
  }
};
</script>

<style></style>
