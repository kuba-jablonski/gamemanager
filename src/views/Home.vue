<template>
  <div class="home">
    <div class="content">
      <div class="login white">
        <v-container fill-height class="d-flex flex-column">
          <v-fade-transition mode="out-in">
            <div v-if="signin" key="signin" class="form-wrapper mt-10">
              <div class="d-flex align-end justify-center mb-10">
                <img class="logo" src="@/assets/logo.png" />
                <h3 class="font-weight-black">GameManager</h3>
              </div>
              <h1 class="text-center mb-10">Welcome Back</h1>
              <v-btn block depressed large>Log in with Google</v-btn>
              <div
                class="grey--text text--lighten-1 text-uppercase decorated mt-8 mb-4"
              >
                <span>or log in with email</span>
              </div>
              <signin-form />
              <div class="grey--text text-center mt-5">
                Don't have an account?
                <v-btn
                  @click="signin = false"
                  text
                  class="text-none"
                  color="secondary"
                  >Sign up</v-btn
                >
              </div>
            </div>
            <div v-else key="signup" class="form-wrapper mt-10">
              <div class="d-flex align-end justify-center mb-10">
                <img class="logo" src="@/assets/logo.png" />
                <h3 class="font-weight-black">GameManager</h3>
              </div>
              <h1 class="text-center mb-10">Create Account</h1>
              <signup-form />
              <div class="grey--text text-center mt-5">
                Already have an account?
                <v-btn
                  @click="signin = true"
                  text
                  class="text-none"
                  color="secondary"
                  >Log in</v-btn
                >
              </div>
            </div>
          </v-fade-transition>
        </v-container>
      </div>
      <div class="info blue lighten-5">
        <v-container>
          <div class="d-flex flex-column align-end mt-10">
            <h2 class="title mb-3">About GameManager</h2>
            <p class="d-flex flex-column align-end mb-5 font-weight-light">
              <span>
                This is a fullstack learning project.
              </span>
              <span>Created by Jakub Jabłoński.</span>
            </p>
            <v-btn outlined color="secondary">Learn more</v-btn>
          </div>
        </v-container>
        <game-svg class="icon" />
      </div>
    </div>
  </div>
</template>

<script>
import SigninForm from "@/components/SigninForm";
import SignupForm from "@/components/SignupForm";
import GameSvg from "@/assets/game.svg";

export default {
  name: "home",
  components: {
    SigninForm,
    SignupForm,
    GameSvg
  },
  data() {
    return {
      signin: true
    };
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
}

.content {
  height: 100%;
  display: grid;
  grid-template-columns: 46% 54%;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
}

.info {
  position: relative;
  padding-right: 30px;

  @media (max-width: 1000px) {
    display: none;
  }
}

.form-wrapper {
  width: 100%;
  max-width: 400px;
}

.logo {
  width: 35px;
}

.icon {
  width: 75%;
  position: absolute;
  bottom: 30px;
  left: 30px;
}

.decorated {
  overflow: hidden;
  text-align: center;

  & > span {
    position: relative;
    display: inline-block;

    &:before,
    &:after {
      content: "";
      position: absolute;
      top: 50%;
      border-bottom: 1px solid;
      width: 100%;
      margin: 0 20px;
    }

    &:before {
      right: 100%;
    }

    &:after {
      left: 100%;
    }
  }
}
</style>
