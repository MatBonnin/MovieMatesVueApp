import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Movie from "../views/Movie.vue";
import MovieList from "../views/MovieList.vue";
import Notification from "@/views/Notification.vue";
import Profile from "../views/Profile.vue";
import TrendingContent from "../views/TrendingContent.vue";
import chat from "../views/chat.vue";
import chatList from "../views/chatList.vue";
import gestionConnexion from "@/components/loginRegister/connexionDialog.vue";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/TrendingContent",
    name: "TrendingContent",
    component: TrendingContent,
  },
  {
    path: "/chat/:roomId",
    name: "Chat",
    component: chat,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/chatList",
    name: "ChatList",
    component: chatList,
  },
  {
    path: "/Login",
    name: "about",
    component: gestionConnexion,
  },
  {
    path: "/profile/:profileUserId",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/notification",
    name: "Notification",
    component: Notification,
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
