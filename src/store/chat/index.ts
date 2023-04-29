// store/chat.ts

import { getRoomInfo, getUserChatRooms } from "@/api/app/chat";

export const namespaced = true;
export const state = {
  chatRooms: [],
  roomInfo: [],
};

export const mutations = {
  setChatRooms(state: any, data: any) {
    state.chatRooms = data;
  },
  setRoomParticipantsInfo(state: any, data: any) {
    state.roomInfo = data;
  },
};

export const actions = {
  async fetchGetUserChatRooms({ commit }: any, id: number) {
    const data = await getUserChatRooms();
    commit("setChatRooms", data);
  },
  async fetchRoomInfo({ commit }: any, roomId: number) {
    const data = await getRoomInfo(roomId);
    commit("setRoomParticipantsInfo", data);
  },
};
