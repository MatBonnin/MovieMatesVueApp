import {
  acceptFriendRequest,
  checkFriendshipStatus,
  getFriendsList,
  rejectFriendRequest,
  removeFriend,
  sendFriendRequest,
} from "@/api/app/friendship";

interface Friendship {
  [key: string]: any;
}

export const namespaced = true;
export const state = {
  friendsList: [] as Friendship[],
  friendshipStatus: {} as Friendship,
};

export const mutations = {
  setFriendsList(state: any, data: any) {
    state.friendsList = data;
  },
  setFriendshipStatus(state: any, data: any) {
    state.friendshipStatus = data.status;
  },
};

export const actions = {
  async fetchSendFriendRequest({ commit }: any, friendId: number) {
    await sendFriendRequest(friendId);
  },
  async fetchAcceptFriendRequest({ commit }: any, friendId: number) {
    await acceptFriendRequest(friendId);
  },
  async fetchRejectFriendRequest({ commit }: any, friendId: number) {
    await rejectFriendRequest(friendId);
  },
  async fetchRemoveFriend({ commit }: any, friendId: number) {
    await removeFriend(friendId);
  },
  async fetchGetFriendsList({ commit }: any) {
    const data = await getFriendsList();
    commit("setFriendsList", data);
  },
  async fetchCheckFriendshipStatus({ commit }: any, data: any) {
    const result = await checkFriendshipStatus(data.userId, data.friendId);
    commit("setFriendshipStatus", result);
  },
};
