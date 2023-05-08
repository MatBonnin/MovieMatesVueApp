import {
  getGenres,
  getMovie,
  getMovieCredit,
  getMovieInfo,
  getSerieCredit,
  getSerieInfo,
  getTopMovies,
  getTopMoviesByGenre,
  getTopSeries,
} from "@/api/theMovieDB/movie";

interface InfoFilm {
  [key: string]: any;
}

interface topMovies {
  [key: string]: any;
}

interface topMoviesByGenre {
  [key: string]: any;
}

interface genres {
  [key: string]: any;
}

export const namespaced = true;
export const state = {
  infoFilm: {} as InfoFilm,
  topMovies: {} as topMovies,
  topSeries: {},
  movieInfo: {},
  movieCredit: {},
  serieInfo: {},
  topMoviesByGenre: [] as topMoviesByGenre,
  genres: {} as genres,
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
  setSerieInfo(state: any, data: any) {
    state.serieInfo = data;
  },
  setTopMoviesByGenre(state: any, payload: { genreId: number; data: any }) {
    const newEntry = { genreId: payload.genreId, data: payload.data };
    state.topMoviesByGenre.push(newEntry);
  },
  setGenres(state: any, data: any) {
    state.genres = data;
  },
};

export const actions = {
  async fetchGetFilm({ commit }: any, data: any) {
    return commit("setListCampagne", await getMovie(data));
  },
  async fetchGetTopMovies({ commit }: any, data: any) {
    return commit("setTopMovies", await getTopMovies(data));
  },
  async fetchGetTopSeries({ commit }: any, data: any) {
    return commit("setTopSeries", await getTopSeries(data));
  },
  async fetchGetContentInfo({ commit }: any, data: any) {
    if (data.type === "movie") {
      return commit("setMovieInfo", await getMovieInfo(data.id));
    } else if (data.type === "serie") {
      return commit("setMovieInfo", await getSerieInfo(data.id));
    }
  },
  async fetchGetSerieInfo({ commit }: any, data: string) {
    return commit("setSerieInfo", await getSerieInfo(data));
  },
  async fetchGetCredit({ commit }: any, data: any) {
    if (data.type === "movie") {
      return commit("setMovieCredit", await getMovieCredit(data.id));
    } else if (data.type === "serie") {
      return commit("setMovieCredit", await getSerieCredit(data.id));
    }
  },
  async fetchGetTopMoviesByGenre({ commit }: any, genreId: number) {
    return commit("setTopMoviesByGenre", {
      genreId,
      data: await getTopMoviesByGenre(genreId),
    });
  },
  async fetchGetGenres({ commit }: any) {
    return commit("setGenres", await getGenres());
  },
};
