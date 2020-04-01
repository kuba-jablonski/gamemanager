import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import MainApp from "../views/MainApp.vue";
import GameLog from "../views/GameLog.vue";
import Profile from "../views/Profile.vue";
import About from "../views/About.vue";
import PageNotFound from "../views/PageNotFound.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    beforeEnter: (to, from, next) =>
      store.getters["user/isAuthed"] && from.path === "/"
        ? next("/app")
        : next()
  },
  {
    path: "/app",
    component: MainApp,
    beforeEnter: (to, from, next) =>
      store.getters["user/isAuthed"] ? next() : next("/"),
    children: [
      {
        path: "",
        name: "app",
        component: GameLog
      },
      { path: "profile", component: Profile },
      { path: "about", component: About }
    ]
  },
  {
    path: "/reset-password/:token",
    name: "resetPassword",
    component: () => import("../views/ResetPassword.vue")
  },
  {
    path: "/about",
    component: About,
    props: { withNav: true }
  },
  {
    path: "*",
    component: PageNotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
