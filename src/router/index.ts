import Vue from "vue";
import VueRouter from "vue-router";
import AboutLeft from "../components/AboutLeft.vue";
import MainLeft from "../components/MainLeft.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: MainLeft
  },
  {
    path: "/about",
    name: "about",
    component: AboutLeft
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
