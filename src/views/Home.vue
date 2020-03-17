<template>
  <div class="home">
    <div class="content">
      <div class="login white">
        <v-container fill-height class="d-flex flex-column justify-center">
          <div class="d-flex">
            <v-img src="@/assets/logo.png"></v-img>
            <h2>GameManager</h2>
          </div>
          <h1>Welcome Back</h1>
          <v-form class="form mt-8" @submit.prevent="onSubmit">
            <v-text-field
              v-model="email"
              label="Email"
              required
              dense
              outlined
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              required
              dense
              outlined
            ></v-text-field>
            <div class="d-flex justify-center"></div>
            <v-btn type="submit" depressed large>
              Submit
            </v-btn>
          </v-form>
        </v-container>
      </div>
      <div class="bullshit blue lighten-5">
        <v-container>
          <div class="d-flex flex-column align-end">
            <h2 class="title mb-3">About GameManager</h2>
            <p class="d-flex flex-column align-end mb-5 font-weight-light">
              <span>
                This is a fullstack learning project.
              </span>
              <span>Created by Jakub Jabłoński.</span>
            </p>

            <v-btn outlined>Learn more</v-btn>
          </div>
        </v-container>

        <game-svg class="icon" />
      </div>
    </div>
    <!-- <v-container fluid>
      <v-row class="mt-10">
        <v-col class="dark" :cols="6">
          <game-svg class="icon" />
        </v-col>
        <v-col :cols="5" offset="1">
          <h2 class=" headline	">Sign in to GameManager</h2>
          <p class="font-weight-light subtitle-2">
            Enter details below
          </p>
          <v-form class="mt-8" @submit.prevent="onSubmit">
            <v-text-field
              v-model="email"
              label="Email"
              required
              dense
              outlined
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              required
              dense
              outlined
            ></v-text-field>
            <div class="d-flex justify-center"></div>
            <v-btn type="submit" depressed large>
              Submit
            </v-btn>
          </v-form>
          <v-fade-transition mode="out-in">
              <signin-form v-if="signin" @onFormChange="signin = false" />
              <signup-form v-else @onFormChange="signin = true" />
            </v-fade-transition>
        </v-col>
      </v-row>
    </v-container> -->
  </div>
</template>

<script>
// import SigninForm from "@/components/SigninForm";
// import SignupForm from "@/components/SignupForm";
import GameSvg from "@/assets/game.svg";

export default {
  name: "home",
  components: {
    // SigninForm,
    // SignupForm,
    GameSvg
  },
  data() {
    return {
      signin: true
    };
  }
};
</script>

<style scoped>
.home {
  height: 100%;
}

.content {
  height: 100%;
  display: grid;
  grid-template-columns: 45% 55%;
}

.form {
  width: 100%;
  max-width: 400px;
}

.logo-svg {
  width: 30px;
}

.login {
  /* background-color: red; */
}

.bullshit {
  position: relative;
  padding-right: 30px;
}

.icon {
  width: 75%;
  position: absolute;
  bottom: 30px;
  left: 30px;
}
</style>
