<template>
  <v-card>
    <v-card-text class="font-weight-bold ">
      <v-btn @click="$emit('onFormChange')" small text>
        sign in
      </v-btn>
    </v-card-text>
    <v-card-title class="mb-6 d-flex justify-center"
      ><h2>Sign Up</h2></v-card-title
    >
    <v-card-text>
      <v-form @submit.prevent="onSubmit">
        <v-text-field label="Username" required outlined></v-text-field>
        <v-text-field label="Email" required outlined></v-text-field>
        <v-text-field label="Password" required outlined></v-text-field>
        <v-text-field label="Confirm Password" required outlined></v-text-field>
        <div class="d-flex justify-center"></div>
        <v-btn type="submit" depressed large>
          Submit
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import api from "@/api";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      passwordConfirm: ""
    };
  },
  methods: {
    async onSubmit() {
      try {
        const res = await api.signup({
          username: this.username,
          email: this.email,
          password: this.password,
          passwordConfirm: this.passwordConfirm
        });
        console.log("yo", res);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style></style>
