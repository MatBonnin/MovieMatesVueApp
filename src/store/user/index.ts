// store/user/index.ts

import {
  createUser,
  getInfoProfileUser,
  getUserInfo,
  searchUser,
  updateProfilePicture,
} from "@/api/app/user";

import { UserGetters } from "@/types/store-types"; // Importez UserGetters
import { authentification } from "@/api/app/auth";

export const namespaced = true;

export interface State {
  auth: object;
  token: string;
  userInfo: object;
  searchResults: object[];
  userProfileInfo: object;
}

export const state: State = {
  auth: {},
  token: "",
  userInfo: {},
  searchResults: [],
  userProfileInfo: {},
};

export const mutations = {
  setAuth(state: State, data: any) {
    state.auth = data;
  },
  setToken(state: State, data: string) {
    state.token = data;
  },
  setUserInfo(state: State, data: object) {
    state.userInfo = data;
  },
  setUserProfileInfo(state: State, data: Array<any>) {
    state.userProfileInfo = data[0];
  },
  setSearchResults(state: State, data: object[]) {
    state.searchResults = data;
  },
};

export const actions = {
  async initialize({ commit }: any) {
    const token = window.localStorage.getItem("jwt-session");
    if (token) {
      commit("setToken", token);
    }
  },
  async fetchAuth({ commit }: any, data: any) {
    return await authentification(data);
  },
  async fetchGetUserInfo({ commit }: any, data: object) {
    return commit("setUserInfo", await getUserInfo(data));
  },
  async fetchGetInfoProfileUser({ commit }: any, userId: number) {
    return commit("setUserProfileInfo", await getInfoProfileUser(userId));
  },
  async fetchCreateUser({ commit }: any, data: object) {
    return await createUser(data);
  },
  async fetchUpdateProfilePicture({ commit }: any, file: File) {
    try {
      const response = await updateProfilePicture(file);
      console.log(response);
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de la photo de profil:",
        error
      );
    }
  },
  async fetchSearchUser({ commit }: any, partialUsername: string) {
    try {
      const response = await searchUser(partialUsername);
      commit("setSearchResults", response);
    } catch (error) {
      console.error("Erreur lors de la recherche d'utilisateurs:", error);
    }
  },
};

export const getters = {
  token(state: State) {
    return state.token;
  },
  isAuthenticated(state: State) {
    return !!state.token;
  },
};

export type RootState = {
  state: State;
  getters: UserGetters;
};
