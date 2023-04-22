import instance from "@/utils/axiosConfig";

export async function sendFriendRequest(friendId: number): Promise<any> {
  try {
    const { data } = await instance.post(`/friendships/request/${friendId}`);
    return data;
  } catch (e: any) {
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}

export async function acceptFriendRequest(friendId: number): Promise<any> {
  try {
    const { data } = await instance.post(`/friendships/accept/${friendId}`);
    return data;
  } catch (e: any) {
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}

export async function rejectFriendRequest(friendId: number): Promise<any> {
  try {
    const { data } = await instance.delete(`/friendships/reject/${friendId}`);
    return data;
  } catch (e: any) {
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}

export async function removeFriend(friendId: number): Promise<any> {
  try {
    const { data } = await instance.delete(`/friendships/remove/${friendId}`);
    return data;
  } catch (e: any) {
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}

export async function getFriendsList(): Promise<any> {
  try {
    const { data } = await instance.get("/friendships/list");
    return data;
  } catch (e: any) {
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}

export async function checkFriendshipStatus(
  userId: number,
  friendId: number
): Promise<any> {
  try {
    const { data } = await instance.get(
      `/friendships/status/${userId}/${friendId}`
    );
    return data;
  } catch (e: any) {
    return { statusCode: e.response.status, message: e.response.data.message };
  }
}
