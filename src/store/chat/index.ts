import { getUserChatRooms } from "@/api/app/chat";

export const namespaced = true;
export const state = {
  chatRooms: [],
};

export const mutations = {
  setChatRooms(state: any, data: any) {
    state.chatRooms = data;
  },
};

export const actions = {
  async fetchGetUserChatRooms({ commit }: any, id: number) {
    const data = await getUserChatRooms();
    commit("setChatRooms", data);
  },
};
