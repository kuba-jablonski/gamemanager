import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import GameLog from "../views/GameLog.vue";
import Profile from "../views/Profile.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/app",
    name: "app",
    component: GameLog,
    beforeEnter: (to, from, next) =>
      store.getters["user/isAuthed"] ? next() : next("/")
  },
  {
    path: "/user",
    name: "profile",
    component: Profile,
    beforeEnter: (to, from, next) =>
      store.getters["user/isAuthed"] ? next() : next("/")
  },
  {
    path: "/reset-password/:token",
    name: "resetPassword",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ResetPassword.vue")
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
