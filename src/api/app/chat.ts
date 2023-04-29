import axios from "axios";
import instance from "@/utils/axiosConfig";

export async function getUserChatRooms(): Promise<any> {
  try {
    const { data } = await instance.get("/chat/getUserChatRooms");

    return data;
  } catch (e: any) {
    // eslint-disable-next-line
    return "errey";
  }
}

export async function getRoomInfo(roomId: number): Promise<any> {
  try {
    const { data } = await instance.get(`/chat/rooms/${roomId}/participants`);

    return data;
  } catch (e: any) {
    // eslint-disable-next-line
    return "error";
  }
}
