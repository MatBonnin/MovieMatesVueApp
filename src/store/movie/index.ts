import { isLiked } from "@/api/app/movie";

export const namespaced = true;
export const state = {
  isLiked: false,
};

export const mutations = {
  setIsLiked(state: any, data: any) {
    state.isLiked = data;
  },
};

export const actions = {
  async fetchIsLiked({ commit }: any, data: object) {
    const res = await isLiked(data);
    commit("setIsLiked", res);
  },
};
