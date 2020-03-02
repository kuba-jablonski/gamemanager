import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import GameLog from "../views/GameLog.vue";
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
    beforeEnter: (to, from, next) => {
      if (store.getters["user/isAuthed"]) {
        next();
      } else {
        console.log("NOT AUTHED");
        next("/");
      }
      // return store.getters("user/isAuthed") ? next() : next("/");
    }
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
