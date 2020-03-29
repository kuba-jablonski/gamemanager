<template>
  <v-form @submit.prevent="onSubmit">
    <v-text-field
      v-model="username"
      label="Username"
      :error-messages="usernameErrors"
      @blur="$v.username.$touch()"
      required
      autocomplete="off"
    ></v-text-field>
    <v-text-field
      v-model="email"
      label="Email"
      :error-messages="emailErrors"
      @blur="$v.email.$touch()"
      required
      autocomplete="off"
    ></v-text-field>
    <v-text-field
      v-model="password"
      :type="showPassword ? 'text' : 'password'"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showPassword = !showPassword"
      label="Password"
      :error-messages="passwordErrors"
      @blur="$v.password.$touch()"
      required
      autocomplete="off"
    ></v-text-field>
    <v-text-field
      v-model="passwordConfirm"
      :type="showConfirmPassword ? 'text' : 'password'"
      :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showConfirmPassword = !showConfirmPassword"
      label="Confirm Password"
      :error-messages="passwordConfirmErrors"
      @blur="$v.passwordConfirm.$touch()"
      required
      autocomplete="off"
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
import { validationMixin } from "vuelidate";
import { usernameField, emailField, passwordFields } from "@/mixins/formFields";

export default {
  mixins: [validationMixin, usernameField(), emailField(), passwordFields],
  data() {
    return {
      showPassword: false,
      showConfirmPassword: false,
      isLoading: false
    };
  },
  methods: {
    async onSubmit() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.isLoading = true;

        await this.$store.dispatch("user/signUp", {
          username: this.username,
          email: this.email,
          password: this.password,
          passwordConfirm: this.passwordConfirm
        });

        this.isLoading = false;
      }
    }
  }
};
</script>

<style></style>
