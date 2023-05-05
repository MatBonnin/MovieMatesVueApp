import { isLiked, randomLikedFriendsMovies } from "@/api/app/movie";

export const namespaced = true;
export const state = {
  isLiked: false,
  likedFriendsMovies: [],
};

export const mutations = {
  setIsLiked(state: any, data: any) {
    state.isLiked = data;
  },
  setLikedFriendsMovies(state: any, data: any) {
    state.likedFriendsMovies = data;
  },
};

export const actions = {
  async fetchIsLiked({ commit }: any, data: object) {
    const res = await isLiked(data);
    commit("setIsLiked", res);
  },
  async fetchRandomLikedFriendsMovies({ commit }: any) {
    const result = await randomLikedFriendsMovies();
    commit("setLikedFriendsMovies", result);
  },
};
