import { io } from "socket.io-client";

const socket = io("http://localhost:5000/"); // Remplacez par l'URL de votre serveur NestJS

const chatAPI = {
  joinRoom(roomId: number) {
    socket.emit("joinRoom", roomId);
  },

  leaveRoom(roomId: number) {
    socket.emit("leaveRoom", roomId);
  },

  getMessages(roomId: number) {
    socket.emit("getMessages", roomId);
  },

  onMessages(callback: any) {
    socket.on("messages", (messages) => {
      callback(messages);
    });
  },

  onNewMessage(callback: any) {
    socket.on("newMessage", (message) => {
      console.log("ouiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
      callback(message);
    });
  },

  sendMessage(userId: number, roomId: number, message: string) {
    socket.emit("sendMessage", {
      userId,
      roomId,
      message,
    });
  },
};

export default chatAPI;
