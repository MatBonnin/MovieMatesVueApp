import { auth, getUserInfo, getToken } from "@/api/app/auth";

export const namespaced = true;
export const state = {
  auth: {},
  token: "",
  userInfo: {},
};

export const mutations = {
  setAuth(state: any, data: any) {
    state.auth = data;
  },
  setToken(state: any, data: string) {
    state.token = data;
    window.sessionStorage.setItem("token", data);
  },
  setUserInfo(state: any, data: object) {
    state.userInfo = data;
  },
};

export const actions = {
  async fetchAuth({ commit }: any, data: object) {
    return await getToken(data);
  },
  async fetchGetUserInfo({ commit }: any, data: object) {
    return commit("setUserInfo", await getUserInfo(data));
  },
};
