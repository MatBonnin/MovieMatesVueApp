<template>
  <div>
    <div v-for="message in messages" :key="message.id">
      {{ message.content }}
    </div>
    <v-text-field v-model="message" label="Label"></v-text-field>

    <v-btn @click="sendMessage">Envoyer</v-btn>
  </div>
</template>

<script>
import chatAPI from "@/api/chat/chatAPI";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      messages: [],
      message: "",
      roomId: "1", // Vous pouvez définir l'ID de la salle en fonction de votre logique d'application
    };
  },
  mounted() {
    chatAPI.joinRoom(this.roomId);

    chatAPI.getMessages(this.roomId);
    chatAPI.onMessages((messages) => {
      this.messages = messages;
    });

    chatAPI.onNewMessage((message) => {
      console.log("salut");
      this.messages.push(message);
    });
  },
  beforeUnmount() {
    console.log("tcho");
    chatAPI.leaveRoom(this.roomId);
  },
  methods: {
    sendMessage() {
      console.log("salut");
      const userId = 13; // Remplacez par l'ID de l'utilisateur connecté
      chatAPI.sendMessage(userId, this.roomId, this.message);
    },
  },
});
</script>
