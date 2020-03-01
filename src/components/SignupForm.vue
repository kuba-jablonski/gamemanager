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
        <v-text-field
          v-model="username"
          label="Username"
          required
          outlined
        ></v-text-field>
        <v-text-field
          v-model="email"
          label="Email"
          required
          outlined
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          required
          outlined
        ></v-text-field>
        <v-text-field
          v-model="passwordConfirm"
          label="Confirm Password"
          required
          outlined
        ></v-text-field>
        <div class="d-flex justify-center"></div>
        <v-btn type="submit" depressed large>
          Submit
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
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
        const res = await this.$http.post("/users/signup", {
          username: this.username,
          email: this.email,
          password: this.password,
          passwordConfirm: this.passwordConfirm
        });
        this.$store.commit("user/addToken", res.token);
        this.$store.commit("games/load", res.user.games);
        this.$router.push("/app");
      } catch (err) {
        this.$store.commit("error/display", err.data.message);
      }
    }
  }
};
</script>

<style></style>
