import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import homeMovie from "../views/search_movie.vue";
import Profile from "../views/Profile.vue";
import Movie from "../views/Movie.vue";
import { state } from "@/store/user";

const routes = [
  {
    path: "/",
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

  {
    path: "/Movie",
    name: "movie",
    component: Movie,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("jwt-session");

  if (to.matched.length === 0) next("/");
  else {
    next();
  }

  // } else {
  //   if (token) {
  //     console.log(token);
  //     if (to.path === "/Login") {
  //       next("/");
  //     } else {
  //       next();
  //     }
  //   } else {
  //     if (to.path !== "/Login") {
  //       next("/Login");
  //     } else {
  //       next();
  //     }
  //   }
  // }
});
export default router;
