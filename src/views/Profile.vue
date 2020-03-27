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
import LayoutApp from "@/components/LayoutApp";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  components: {
    LayoutApp
  },
  data() {
    return {
      username: this.$store.state.user.user.username,
      email: this.$store.state.user.user.email,
      currentPassword: "",
      newPassword: "",
      passwordConfirm: "",
      updatingSettings: false,
      changingPassword: false
    };
  },
  validations: {
    username: { required, minLength: minLength(4) },
    email: { required, email },
    newPassword: { minLength: minLength(8), required },
    passwordConfirm: { required, sameAsPassword: sameAs("newPassword") }
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
      this.$v.newPassword.$touch();
      this.$v.passwordConfirm.$touch();
      const isValid =
        !this.$v.newPassword.$invalid && !this.$v.passwordConfirm.$invalid;
      if (isValid) {
        this.changingPassword = true;
        await this.$store.dispatch("user/changePassword", {
          passwordCurrent: this.currentPassword,
          password: this.newPassword,
          passwordConfirm: this.passwordConfirm
        });
        this.changingPassword = false;
      }
    }
  }
};
</script>

<style></style>
