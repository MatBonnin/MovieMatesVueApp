import { io } from "socket.io-client";
import store from "@/store";

const socket = io("http://localhost:5000/"); // Remplacez par l'URL de votre serveur NestJS

const chatAPI = {
  joinRoom(roomId: number, userId: number) {
    socket.emit("joinRoom", { roomId: roomId, userId: userId });
  },

  leaveRoom(roomId: number, userId: number) {
    socket.emit("leaveRoom", { roomId: roomId, userId: userId });
  },

  getMessages(roomId: number) {
    socket.emit("getMessages", roomId);
  },

  onMessages(callback: any) {
    socket.on("messages", (messages) => {
      callback(messages);
    });
  },

  onConnection(callback: any) {
    socket.on("isConnected", () => {
      console.log("isConnected");
      socket.emit("authenticate", store.getters["user/userId"]);
      callback();
    });
  },

  onNewMessageNotif(callback: any) {
    socket.on("notifMessage", (message) => {
      console.log("Message reçu:", message);
      if (Notification.permission === "granted") {
        const title = "Nouveau message";
        const options = {
          body: `${message.user_id}: ${message.content}`,
        };

        sendNotification(title, options);
      } else {
        console.log("Autorisation de notification refusée");
      }
      callback();
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

function sendNotification(title: string, options: any) {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      if (registration.active) {
        //test

        console.log("notif envoyé");
        console.log("Autorisation de notification:", "permis");
        console.log("Données envoyées au service worker:", { title, options });
        registration.active.postMessage({
          type: "NEW_MESSAGE",
          title,
          options,
        });
      }
    });
  } else {
    console.log("Service worker not supported in this browser.");
  }
}

export default chatAPI;
