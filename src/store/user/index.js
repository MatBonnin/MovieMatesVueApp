import { getUserInfo, getToken } from "../../api/app/auth";
export const namespaced = true;
export const state = {
    auth: {},
    token: "",
    userInfo: {},
};
export const mutations = {
    setAuth(state, data) {
        state.auth = data;
    },
    setToken(state, data) {
        state.token = data;
        window.sessionStorage.setItem("token", data);
    },
    setUserInfo(state, data) {
        state.userInfo = data;
    },
};
export const actions = {
    async fetchAuth({ commit }, data) {
        return await getToken(data);
    },
    async fetchGetUserInfo({ commit }, data) {
        return commit("setUserInfo", await getUserInfo(data));
    },
};
//# sourceMappingURL=index.js.map