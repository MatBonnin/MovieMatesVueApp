import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import homeMovie from "../views/search_movie.vue";
import Profile from "../views/Profile.vue";
import { state } from "@/store/user";

const routes = [
  {
    path: "/home",
    name: "home",
    component: homeMovie,
  },
  {
    path: "/Login",
    name: "about",
    component: Login,
  },
  {
    path: "/Account",
    name: "Profile",
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log(state.token ? "ok" : "pas ok");
  // if (!state.token && to.path !== "/Login") {
  //   next("/Login");
  // }
  // else if (to.path === "/Login" && state.token) {
  //   next("/home");
  // }

  if (to.matched.length === 0) {
    next("/Login");
  } else {
    next();
  }
});
export default router;
