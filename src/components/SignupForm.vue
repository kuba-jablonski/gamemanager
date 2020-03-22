<template>
  <v-form @submit.prevent="onSubmit">
    <v-text-field
      v-model="username"
      label="Username"
      :error-messages="usernameErrors"
      @blur="$v.username.$touch()"
      required
    ></v-text-field>
    <v-text-field
      v-model="email"
      label="Email"
      :error-messages="emailErrors"
      @blur="$v.email.$touch()"
      required
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
    ></v-text-field>
    <div class="d-flex justify-center"></div>
    <v-btn class="mt-2" color="primary" type="submit" depressed block large>
      Submit
    </v-btn>
  </v-form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
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
  validations: {
    username: { required, minLength: minLength(4) },
    email: { required, email },
    password: { minLength: minLength(8), required },
    passwordConfirm: { required, sameAsPassword: sameAs("password") }
  },
  computed: {
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.minLength &&
        errors.push("Username must be atleast 4 characters long");
      !this.$v.username.required && errors.push("Username is required");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Password must be atleast 8 characters long");
      !this.$v.password.required && errors.push("Password is required");
      return errors;
    },
    passwordConfirmErrors() {
      const errors = [];
      if (!this.$v.passwordConfirm.$dirty) return errors;
      !this.$v.passwordConfirm.sameAsPassword &&
        errors.push("Passwords must match");
      !this.$v.passwordConfirm.required &&
        errors.push("Please confirm your password");
      return errors;
    }
  },
  methods: {
    async onSubmit() {
      const valid = this.$v.$touch();

      if (valid) {
        await this.$store.dispatch("user/signUp", {
          username: this.username,
          email: this.email,
          password: this.password,
          passwordConfirm: this.passwordConfirm
        });
      }
    }
  }
};
</script>

<style></style>
