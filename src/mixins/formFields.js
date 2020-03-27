import Vue from "vue";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

const strategies = Vue.config.optionMergeStrategies;
strategies.validations = strategies.methods;

export const usernameField = {
  data: () => ({ username: "" }),
  validations: { username: { required, minLength: minLength(4) } },
  computed: {
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.minLength &&
        errors.push("Username must be atleast 4 characters long");
      !this.$v.username.required && errors.push("Username is required");
      return errors;
    }
  }
};

export const emailField = {
  data: () => ({ email: "" }),
  validations: { email: { required, email } },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    }
  }
};

export const passwordFields = {
  data: () => ({ password: "", passwordConfirm: "" }),
  validations: {
    password: { minLength: minLength(8), required },
    passwordConfirm: { required, sameAsPassword: sameAs("password") }
  },
  computed: {
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
  }
};
