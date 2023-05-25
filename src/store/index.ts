import * as gestionChat from "@/store/chat";
import * as gestionComment from "@/store/comment";
import * as gestionFilmTMDB from "@/store/TMDB";
import * as gestionFriendship from "@/store/friendship";
import * as gestionListMovie from "@/store/listMovie";
import * as gestionLocalisation from "@/store/localisation";
import * as gestionMovie from "@/store/movie";
import * as gestionMovieListFollow from "@/store/movieListFollow";
import * as gestionMovieListMovie from "@/store/movieListMovie";
import * as user from "@/store/user";

import { createStore } from "vuex";

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
    gestionFriendship,
    gestionMovieListFollow,
    gestionChat,
    gestionLocalisation,
    gestionComment,
  },
});
