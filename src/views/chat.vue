<template>
  <div class="d-flex flex-column main">
    <div class="topBar d-flex flex-row align-center mt-2">
      <v-icon @click="toChatList" class="ml-2">mdi-arrow-left</v-icon>
      <div>
        <v-avatar class="ml-6">
          <v-img cover :src="apiUrl + roomInfo.roomPicture"
        /></v-avatar>
        <span class="ml-4">{{ roomInfo.roomName }}</span>
      </div>
    </div>
    <div
      max-height="10%"
      class="messageBox d-flex flex-column py-2 overflow-y-auto"
    >
      <div
        :class="
          message.user_id === userInfo.id ? myMessageClass : yourMessageClass
        "
        v-for="message in messages"
        :key="message.id"
      >
        <v-avatar size="x-small" v-if="message.user_id !== userInfo.id">
          <v-img cover :src="getParticipantImg(message.user_id)"></v-img
        ></v-avatar>
        <v-chip
          :class="
            message.user_id === userInfo.id
              ? 'myMessageClass mr-2'
              : 'yourMessageClass ml-2'
          "
          width="fit-content"
          elevation="6"
        >
          {{ message.content }}
        </v-chip>
      </div>
    </div>

    <div class="mt-auto ml-2 mr-2">
      <v-text-field
        class="my-input"
        v-model="message"
        density="compact"
        append-icon="mdi-send"
        :append-inner-icon="marker ? 'mdi-map-marker' : 'mdi-map-marker-off'"
        prepend-icon="mdi-emoticon"
        variant="filled"
        clear-icon="mdi-close-circle"
        clearable
        placeholder="Aa"
        type="text"
        @keyup.enter="sendMessage"
        @click:append-inner="toggleMarker"
        @click:append="sendMessage"
        @click:prepend="changeIcon"
        @click:clear="clearMessage"
      ></v-text-field>
    </div>
  </div>
</template>

<script>
import chatAPI from "@/api/chat/chatAPI";
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
export default defineComponent({
  props: {
    roomId: { type: String, required: true },
  },
  data() {
    return {
      messages: [],
      message: "",
      myMessageClass: " mt-2 mr-2 message align-self-end",
      yourMessageClass: " mt-2 ml-2 message align-self-start",
    };
  },
  async mounted() {
    chatAPI.joinRoom(this.roomId, this.userInfo.id);
    await this.fetchRoomInfo(this.roomId);
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
    chatAPI.leaveRoom(this.roomId, this.userInfo.id);
  },
  computed: {
    ...mapState("user", ["userInfo"]),
    ...mapState("gestionChat", ["roomInfo"]),
    apiUrl() {
      return process.env.API_BACK;
    },
  },
  methods: {
    ...mapActions("gestionChat", ["fetchRoomInfo"]),
    sendMessage() {
      // Remplacez par l'ID de l'utilisateur connecté
      chatAPI.sendMessage(this.userInfo.id, this.roomId, this.message);
      this.message = "";
    },
    toChatList() {
      this.$router.push({
        name: "ChatList",
      });
    },
    getParticipantImg(userId) {
      return (
        process.env.API_BACK +
        this.roomInfo.participants.find(
          (participant) => participant.id === userId
        ).profilePicture
      );
    },
  },
});
</script>
<style scoped>
.main {
  height: 100vh;
}
.my-input.v-input .v-input__slot {
  border-radius: 100px;
}

::v-deep .v-field.v-field--appended {
  border-radius: 50px;
}
.message {
  width: fit-content;
}
.messageBox {
  max-height: 100%;
}

.topBar {
  height: 5vh;
}
.yourMessageClass {
  background-color: white;
  color: black;
}
::v-deep .v-field__outline {
  display: none;
}
</style>
