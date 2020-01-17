<template>
  <v-container>
    <v-row class="mt-10">
      <v-col :cols="6">
        <h1 class="mb-5 display-2 font-weight-bold font-italic">
          Manage Your<br />
          Games With Ease
        </h1>
        <p class="mb-5 subtitle font-weight-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
          quaerat odio molestiae, nihil et debitis doloribus cum mollitia quod
          minima officia? Provident rerum iste cum pariatur error obcaecati odio
          odit, dolores quasi animi repellat illum totam ducimus maiores
          repellendus quibusdam nobis nam perspiciatis sequi voluptates impedit
          fuga. Voluptates, veritatis enim!
        </p>
        <v-btn depressed large>Learn more</v-btn>
      </v-col>
      <v-col :cols="5" offset="1">
        <v-fade-transition mode="out-in">
          <signin-form v-if="signin" @onFormChange="signin = false" />
          <signup-form v-else @onFormChange="signin = true" />
        </v-fade-transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SigninForm from "@/components/SigninForm";
import SignupForm from "@/components/SignupForm";

export default {
  name: "home",
  components: {
    SigninForm,
    SignupForm
  },
  data() {
    return {
      signin: true
    };
  }
};
</script>
