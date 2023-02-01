import { getMovie } from "@/api/theMovieDB";

interface InfoFilm {
  [key: string]: any;
}

export const namespaced = true;
export const state = {
  infoFilm: {} as InfoFilm,
};

export const mutations = {
  setListCampagne(state: any, data: any) {
    state.infoFilm = data;
  },
};

export const actions = {
  async fetchGetFilm({ commit }: any, data: string) {
    return commit("setListCampagne", await getMovie(data));
  },
};
