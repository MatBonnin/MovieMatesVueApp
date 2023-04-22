import { createRouter, createWebHistory } from "vue-router";
import gestionConnexion from "@/components/loginRegister/connexionDialog.vue";
import TrendingContent from "../views/TrendingContent.vue";
import Profile from "../views/Profile.vue";
import Movie from "../views/Movie.vue";
import MovieList from "../views/MovieList.vue";

import store from "@/store";

const routes = [
  {
    path: "/",
    name: "home",
    component: TrendingContent,
  },
  {
    path: "/TrendingContent",
    name: "TrendingContent",
    component: TrendingContent,
  },
  {
    path: "/Login",
    name: "about",
    component: gestionConnexion,
  },
  {
    path: "/Account",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true },
  },

  {
    path: "/Movie",
    name: "movie",
    component: Movie,
    // meta: { requiresAuth: true },

    props: true,
  },
  {
    path: "/MovieList",
    name: "movieList",
    component: MovieList,
    meta: { requiresAuth: true },

    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  // Utilisez RootState pour accéder au module user et aux getters
  const isAuthenticated = store.getters["user/isAuthenticated"];

  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});
export default router;
