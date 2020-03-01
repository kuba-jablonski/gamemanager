<template>
  <v-card>
    <v-card-text class="font-weight-bold ">
      <v-btn @click="$emit('onFormChange')" small text>
        create a new account
      </v-btn>
    </v-card-text>
    <v-card-title class="mb-6 d-flex justify-center"
      ><h2>Sign In</h2></v-card-title
    >
    <v-card-text>
      <v-form @submit.prevent="onSubmit">
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
      email: "",
      password: ""
    };
  },
  methods: {
    async onSubmit() {
      try {
        const { token, user } = await this.$http.post("/users/login", {
          email: this.email,
          password: this.password
        });
        this.$store.commit("user/addToken", token);
        this.$store.commit("games/load", user.games);
        this.$router.push("/app");
      } catch (err) {
        this.$store.commit("error/display", err.data.message);
      }
    }
  }
};
</script>

<style></style>
