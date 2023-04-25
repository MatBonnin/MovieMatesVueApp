<template>
  <div class="d-flex flex-column fill-height">
    <div class="d-flex flex-column">
      <v-chip
        :class="
          message.user_id === userInfo.id ? myMessageClass : yourMessageClass
        "
        :color="message.user_id === userInfo.id ? 'red' : 'blue'"
        width="fit-content"
        v-for="message in messages"
        :key="message.id"
      >
        {{ message.content }}
      </v-chip>
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
import { mapState } from "vuex";
export default defineComponent({
  props: {
    roomId: { type: String, required: true },
  },
  data() {
    return {
      messages: [],
      message: "",
      myMessageClass: "myMessageClass mt-2 message",
      yourMessageClass: "yourMessageClass mt-2 message",
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
  computed: {
    ...mapState("user", ["userInfo"]),
  },
  methods: {
    sendMessage() {
      // Remplacez par l'ID de l'utilisateur connecté
      chatAPI.sendMessage(this.userInfo.id, this.roomId, this.message);
      this.message = "";
    },
  },
});
</script>
<style scoped>
.my-input.v-input .v-input__slot {
  border-radius: 100px;
}

::v-deep .v-field.v-field--appended {
  border-radius: 50px;
}
.message {
  width: fit-content;
}
::v-deep .v-field__outline {
  display: none;
}
</style>
