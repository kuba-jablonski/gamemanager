<template>
  <v-container>
    <h1 class="my-5">About GameManager</h1>
    <div class="content">
      <h2 class="title primary--text mt-9 mb-2">Project Purpose</h2>
      <p>
        This is a fullstack learning project, utilizing modern frontend and
        backend technologies.
      </p>
      <h2 class="title primary--text mt-5 mb-2">Tech Stack</h2>
      <div class="d-flex ">
        <div
          class="d-flex flex-column align-center body-2 font-weight-bold text-uppercase mr-5 "
        >
          <vue-svg class="svg" />Vue.js
        </div>
        <div
          class="d-flex flex-column align-center body-2 font-weight-bold text-uppercase mr-5"
        >
          <nodejs-svg class="svg" />Node.js
        </div>
        <div
          class="d-flex flex-column align-center body-2 font-weight-bold text-uppercase"
        >
          <mongodb-svg class="svg" />MongoDB
        </div>
      </div>
      <h2 class="title primary--text mt-5">Author</h2>
      <p>
        Created by Jakub Jabłoński, a web developer based in Zielona Góra,
        Poland
      </p>
      <p class="d-flex align-center">
        <span class="mr-3">Get in touch with me:</span>
        <v-btn
          href="https://github.com/kuba-jablonski"
          target="_blank"
          text
          icon
          large
        >
          <v-icon class="social-icon" large
            >$vuetify.icons.github</v-icon
          ></v-btn
        >
        <v-btn
          href="https://www.linkedin.com/in/jakub-jab%C5%82o%C5%84ski-47a990138"
          target="_blank"
          text
          icon
          large
        >
          <v-icon class="social-icon" large
            >$vuetify.icons.linkedin</v-icon
          ></v-btn
        >
      </p>
      <p>
        View my portfolio at:
        <a
          class="font-weight-bold secondary--text"
          href="https://jakub-jablonski.netlify.com/"
          target="_blank"
          >jakub-jablonski.netlify.com</a
        >
      </p>
    </div>
    <v-btn v-if="withNav" to="/" class="mt-3" outlined large
      ><v-icon left>mdi-arrow-left</v-icon>Back</v-btn
    >
    <info-svg class="img" />
  </v-container>
</template>

<script>
import VueSvg from "@/assets/vue.svg";
import NodejsSvg from "@/assets/nodejs.svg";
import MongodbSvg from "@/assets/mongodb.svg";
import InfoSvg from "@/assets/info.svg";

export default {
  props: {
    withNav: {
      type: Boolean,
      default: false
    }
  },
  components: {
    VueSvg,
    NodejsSvg,
    MongodbSvg,
    InfoSvg
  }
};
</script>

<style lang="scss" scoped>
.svg {
  height: 50px;
  width: 50px;
}

.img {
  height: 500px;
  width: 500px;
  position: absolute;
  top: 20%;
  right: 10%;

  @media (max-width: 1000px) {
    display: none;
  }
}

.content {
  position: relative;
  z-index: 1;
}

.social-icon {
  fill: currentColor;
}
</style>
