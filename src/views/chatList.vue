<template>
  <div class="h-100">
    <v-row class="w-100">
      <v-col cols="12">
        <v-list-item
          v-for="conversation in chatRooms"
          :key="conversation.id"
          :title="conversation.userPseudo"
          @click="toChat(conversation.id)"
        >
          <template v-slot:prepend>
            <v-avatar @click="toProfile(conversation.userId)">
              <v-img
                :src="
                  'http://localhost:5000/' + conversation.userProfilePicture
                "
                :alt="conversation.userPseudo"
                cover
              />
            </v-avatar>
          </template>

          <template v-slot:append>
            <v-icon>mdi-message</v-icon>
          </template>
        </v-list-item>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  // eslint-disable-next-line
  name: "ChatList",
  async created() {
    await this.fetchGetUserChatRooms();
  },

  data() {
    return {};
  },
  methods: {
    ...mapActions("gestionChat", ["fetchGetUserChatRooms"]),
    toChat(roomId) {
      // const id = roomId.toString();
      this.$router.push({
        name: "Chat",
        params: { roomId: roomId },
      });
      this.dialog = false;
    },
    toProfile(userId) {
      this.$router.push({
        name: "Profile",
        params: { profileUserId: userId },
      });
      this.dialog = false;
    },
  },
  computed: {
    ...mapState("gestionChat", ["chatRooms"]),
  },
  components: {},
});
</script>
<style scoped></style>
