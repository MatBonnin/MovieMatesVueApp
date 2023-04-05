// store/user/index.ts
import { authentification, getUserInfo, getToken } from "@/api/app/auth";
import { createUser } from "@/api/app/user";

export const namespaced = true;

export interface State {
  auth: object;
  token: string;
  userInfo: object;
}

export const state: State = {
  auth: {},
  token: "",
  userInfo: {},
};

export const mutations = {
  setAuth(state: State, data: any) {
    state.auth = data;
  },
  setToken(state: State, data: string) {
    console.log("setToken", data);
    state.token = data;
  },
  setUserInfo(state: State, data: object) {
    state.userInfo = data;
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
  async fetchCreateUser({ commit }: any, data: object) {
    return await createUser(data);
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

import { UserGetters } from "@/types/store-types"; // Importez UserGetters
