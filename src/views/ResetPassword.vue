<template>
  <v-content>
    <v-container>
      <v-sheet max-width="600" class="mx-auto">
        <v-container>
          <h2>Set new password</h2>
          <v-form @submit.prevent="onResetPassword">
            <v-text-field
              v-model="newPassword"
              label="New Password"
              :error-messages="passwordErrors"
              @blur="$v.newPassword.$touch()"
              required
              autocomplete="off"
            ></v-text-field>
            <v-text-field
              v-model="passwordConfirm"
              label="Confirm New Password"
              :error-messages="passwordConfirmErrors"
              @blur="$v.passwordConfirm.$touch()"
              required
              autocomplete="off"
            ></v-text-field>
            <v-btn
              :loading="loading"
              class="mt-2"
              color="primary"
              depressed
              type="submit"
              >Reset password</v-btn
            >
          </v-form>
        </v-container>
      </v-sheet>
    </v-container>
  </v-content>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  data() {
    return {
      newPassword: "",
      passwordConfirm: "",
      loading: false
    };
  },
  validations: {
    newPassword: { minLength: minLength(8), required },
    passwordConfirm: { required, sameAsPassword: sameAs("newPassword") }
  },
  computed: {
    passwordErrors() {
      const errors = [];
      if (!this.$v.newPassword.$dirty) return errors;
      !this.$v.newPassword.minLength &&
        errors.push("Password must be atleast 8 characters long");
      !this.$v.newPassword.required && errors.push("Password is required");
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
    async onResetPassword() {
      this.loading = true;
      await this.$store.dispatch("user/resetPassword", {
        password: this.newPassword,
        passwordConfirm: this.passwordConfirm,
        resetToken: this.$route.params.token
      });
      this.loading = false;
    }
  }
};
</script>

<style></style>
