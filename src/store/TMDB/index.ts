import { getMovie, getTopMovies, getTopSeries } from "@/api/theMovieDB";

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
};

export const actions = {
  async fetchGetFilm({ commit }: any, data: string) {
    return commit("setListCampagne", await getMovie(data));
  },
  async fetchGetTopMovies({ commit }: any, data: any) {
    console.log("topMovies");
    return commit("setTopMovies", await getTopMovies(data));
  },
  async fetchGetTopSeries({ commit }: any, data: any) {
    console.log("topMovies");
    return commit("setTopSeries", await getTopSeries(data));
  },
};
