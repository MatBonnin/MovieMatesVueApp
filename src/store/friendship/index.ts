import {
  acceptFriendRequest,
  checkFriendshipStatus,
  getFriendRequests,
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
  friendRequests: [] as Friendship[],
};

export const mutations = {
  setFriendsList(state: any, data: any) {
    state.friendsList = data;
  },
  setFriendshipStatus(state: any, data: any) {
    state.friendshipStatus = data.status;
  },
  setFriendRequests(state: any, data: any) {
    // Ajoutez cette mutation
    state.friendRequests = data;
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
  async fetchGetFriendsList({ commit }: any, userId: number) {
    try {
      const friendsList = await getFriendsList(userId);
      commit("setFriendsList", friendsList);
    } catch (error) {
      console.error("Error fetching friends list:", error);
    }
  },
  async fetchCheckFriendshipStatus({ commit }: any, data: any) {
    const result = await checkFriendshipStatus(data.userId, data.friendId);
    commit("setFriendshipStatus", result);
  },
  async fetchGetFriendRequests({ commit }: any) {
    // Ajoutez cette action
    const data = await getFriendRequests();
    commit("setFriendRequests", data);
  },
};
