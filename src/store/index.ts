import { createStore } from "vuex";
import * as gestionFilm from "@/store/TMDB";
import * as user from "@/store/user";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    gestionFilm,
    user,
  },
});
