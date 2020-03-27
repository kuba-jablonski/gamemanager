<template>
  <layout-app>
    <v-container>
      <v-sheet max-width="600" class="mx-auto mb-4">
        <v-container>
          <h2>Your account settings</h2>
          <v-form @submit.prevent="onUpdateSettings">
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
            <v-btn
              color="primary"
              :loading="updatingSettings"
              depressed
              type="submit"
              >Save settings</v-btn
            >
          </v-form>
        </v-container>
      </v-sheet>
      <v-sheet max-width="600" class="mx-auto">
        <v-container>
          <h2>Change password</h2>
          <v-form @submit.prevent="onUpdatePassword">
            <v-text-field
              v-model="currentPassword"
              label="Current Password"
              required
              autocomplete="off"
            ></v-text-field>
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
              color="primary"
              @click="onChangePassword"
              depressed
              type="submit"
              >Save password</v-btn
            >
          </v-form>
        </v-container>
      </v-sheet>
    </v-container>
  </layout-app>
</template>

<script>
import { validationMixin } from "vuelidate";
import { usernameField, emailField, passwordFields } from "@/mixins/formFields";
import LayoutApp from "@/components/LayoutApp";

export default {
  mixins: [validationMixin, usernameField, emailField, passwordFields],
  components: {
    LayoutApp
  },
  data() {
    return {
      currentPassword: "",
      updatingSettings: false,
      changingPassword: false
    };
  },
  methods: {
    async onUpdateSettings() {
      this.$v.username.$touch();
      this.$v.email.$touch();
      const isValid = !this.$v.username.$invalid && !this.$v.email.$invalid;
      if (isValid) {
        this.updatingSettings = true;
        await this.$store.dispatch("user/updateMe", {
          username: this.username,
          email: this.email
        });
        this.updatingSettings = false;
      }
    },
    async onChangePassword() {
      this.$v.password.$touch();
      this.$v.passwordConfirm.$touch();
      const isValid =
        !this.$v.password.$invalid && !this.$v.passwordConfirm.$invalid;
      if (isValid) {
        this.changingPassword = true;
        await this.$store.dispatch("user/changePassword", {
          passwordCurrent: this.currentPassword,
          password: this.password,
          passwordConfirm: this.passwordConfirm
        });
        this.changingPassword = false;
      }
    }
  }
};
</script>

<style></style>
