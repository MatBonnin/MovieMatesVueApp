import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import homeMovie from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import Movie from "../views/Movie.vue";
import chat from "../components/chatgpt/Chat.vue";

import store from "@/store";
import { RootState } from "../types/store-types";

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
    // meta: { requiresAuth: true },

    props: true,
  },

  {
    path: "/chat",
    name: "chat",
    component: chat,
    // meta: { requiresAuth: true },

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
