<template>
  <v-content>
    <v-container>
      <v-sheet max-width="600" class="mx-auto">
        <v-container>
          <h2>Set new password</h2>
          <v-form @submit.prevent="onResetPassword">
            <v-text-field
              v-model="password"
              label="New Password"
              :error-messages="passwordErrors"
              @blur="$v.password.$touch()"
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
import { passwordFields } from "@/mixins/formFields";

export default {
  mixins: [validationMixin, passwordFields],
  data() {
    return {
      loading: false
    };
  },
  methods: {
    async onResetPassword() {
      this.loading = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        await this.$store.dispatch("user/resetPassword", {
          password: this.password,
          passwordConfirm: this.passwordConfirm,
          resetToken: this.$route.params.token
        });
      }
      this.loading = false;
    }
  }
};
</script>

<style></style>
