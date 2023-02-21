import {
  getMovie,
  getTopMovies,
  getTopSeries,
  getMovieInfo,
  getMovieCredit,
} from "@/api/theMovieDB/movie";

interface InfoFilm {
  [key: string]: any;
}

interface topMovies {
  [key: string]: any;
}

export const namespaced = true;
export const state = {
  infoFilm: {} as InfoFilm,
  topMovies: {} as topMovies,
  topSeries: {},
  movieInfo: {},
  movieCredit: {},
};

export const mutations = {
  setListCampagne(state: any, data: any) {
    state.infoFilm = data;
  },
  setTopMovies(state: any, data: any) {
    state.topMovies = data;
  },
  setTopSeries(state: any, data: any) {
    state.topSeries = data;
  },
  setMovieInfo(state: any, data: any) {
    state.movieInfo = data;
  },
  setMovieCredit(state: any, data: any) {
    state.movieCredit = data;
  },
};

export const actions = {
  async fetchGetFilm({ commit }: any, data: string) {
    return commit("setListCampagne", await getMovie(data));
  },
  async fetchGetTopMovies({ commit }: any, data: any) {
    return commit("setTopMovies", await getTopMovies(data));
  },
  async fetchGetTopSeries({ commit }: any, data: any) {
    return commit("setTopSeries", await getTopSeries(data));
  },
  async fetchGetMovieInfo({ commit }: any, data: string) {
    return commit("setMovieInfo", await getMovieInfo(data));
  },
  async fetchGetMovieCredit({ commit }: any, data: string) {
    return commit("setMovieCredit", await getMovieCredit(data));
  },
};
