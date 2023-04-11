import { createStore } from "vuex";
import * as gestionFilmTMDB from "@/store/TMDB";
import * as user from "@/store/user";
import * as gestionListMovie from "@/store/listMovie";
import * as gestionMovieListMovie from "@/store/movieListMovie";
import * as gestionMovie from "@/store/movie";
export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    gestionFilmTMDB,
    user,
    gestionListMovie,
    gestionMovieListMovie,
    gestionMovie,
  },
});
