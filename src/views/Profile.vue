<template>
  <div class="d-flex flex-column">
    <div class="d-flex flex-column">
      <v-sheet
        :style="{
          'background-image': 'url(\'http://localhost:5000/uploads/back.jpg\')',
          'background-size': 'cover',
        }"
        :elevation="0"
        class="mx-auto d-flex flex-column justify-end"
        height="200"
        width="100%"
      >
        <div class="gradient d-flex justify-center">
          <v-avatar
            color="grey"
            class="mt-5"
            size="130"
            @click="ownProfile ? (editPrfilePictureDialog = true) : ''"
          >
            <v-img
              cover
              :src="
                profileInfo.profilePicture !== ''
                  ? 'http://localhost:5000/' + profileInfo.profilePicture
                  : '../../images/profile/photoProfile.jpg'
              "
            ></v-img>
          </v-avatar>
        </div>
      </v-sheet>

      <span class="text-h4 pseudo" max>{{ profileInfo.pseudo }}</span>
      <span class="text-subtitle-1 text-grey align-self-center">
        Grenoble,Isère
      </span>
    </div>
    <div class="d-flex justify-center">
      <!-- Icon avec compteur -->
      <!-- Si le statut d'amitié est "none" et l'utilisateur est authentifié -->
      <v-chip
        v-if="friendshipStatus === 'none' && isAuthenticated"
        class="ma-2"
        color="pink"
        text-color="white"
        append-icon="mdi-account-plus-outline"
        @click="addFriend"
      >
        Ajouter ami
      </v-chip>

      <!-- Si le statut d'amitié est "pending" et l'utilisateur est authentifié -->
      <v-chip
        v-else-if="friendshipStatus === 'pending' && isAuthenticated"
        class="ma-2"
        color="orange"
        text-color="white"
        append-icon="mdi-account-clock-outline"
      >
        En attente
      </v-chip>

      <!-- Si le statut d'amitié est "friends" et l'utilisateur est authentifié -->
      <v-chip
        v-else-if="friendshipStatus === 'friends' && isAuthenticated"
        class="ma-2"
        color="green"
        text-color="white"
        append-icon="mdi-account-check-outline"
        @click="removeFriend"
      >
        Amis
      </v-chip>

      <!-- Si le statut d'amitié est "received" et l'utilisateur est authentifié -->
      <v-chip
        v-else-if="friendshipStatus === 'received' && isAuthenticated"
        class="ma-2"
        color="blue"
        text-color="white"
        append-icon="mdi-account-arrow-left-outline"
        @click="acceptFriendRequest"
      >
        Accepter la demande
      </v-chip>
      <v-chip
        class="ma-2"
        color="blue"
        text-color="white"
        append-icon="mdi-filmstrip-box-multiple"
      >
        {{ lists.length }} MovieLists
      </v-chip>
      <v-chip
        class="ma-2"
        color="success"
        text-color="white"
        append-icon="mdi-account-multiple"
      >
        120 Amis
      </v-chip>
      <!-- <div class="d-flex flex-column justify-center">
        <v-icon color="grey">mdi-heart-outline</v-icon>
        <span color="text-grey">Film</span>
        <span color="text-grey">25</span>
      </div> -->
    </div>
    <div>
      <!-- Bio -->
    </div>
    <div>
      <!-- Idée: mes genres ou/et film préféré  (top3/ou 5)-->
    </div>
    <div>
      <!-- Mes Amis -->
    </div>

    <div class="ml-4">
      <p>Mes listes</p>
      <v-slide-group v-model="slideGroupModel" selected-class="bg-success">
        <v-slide-group-item v-for="list in lists" :key="list.id" v-slot="{}">
          <div class="mr-4 d-flex justify-center flex-column">
            <v-img
              class="imgPlaylist"
              content-class="imgPlaylist"
              :src="
                list.image !== null
                  ? `http://localhost:5000/uploads/${list.image}`
                  : 'http://localhost:5000/uploads/playlist.png'
              "
              :alt="list.name"
              @click="goToMovieList(list.id)"
            ></v-img>

            <span class="listName">{{ list.name }}</span>
          </div>
        </v-slide-group-item>
      </v-slide-group>
    </div>

    <v-dialog
      v-model="editPrfilePictureDialog"
      max-width="100%"
      transition="dialog-bottom-transition"
      :overlay="false"
    >
      <v-row>
        <v-col cols="12" class="d-flex justify-center flex-row">
          <v-icon>mdi-window-minimize</v-icon>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <!-- <v-btn icon size="small" class="bg-grey mr-4">
            <v-icon>mdi-image-multiple</v-icon>
          </v-btn>

          <span>Selectionner une photo de profile</span> -->
          <v-list class="bg-transparent">
            <v-list-item active-color="primary" @click="clickFileInput()">
              <template v-slot:prepend>
                <v-btn icon size="small" class="bg-grey mr-4">
                  <v-icon>mdi-image-multiple</v-icon>
                </v-btn>
              </template>

              <v-list-item-title
                >Sélectionner une photo de profile</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-dialog>
    <v-file-input
      v-show="false"
      name="photo"
      ref="fileInputRef"
      accept="image/*"
      label="File input"
      @change="updateProfilePicture($event)"
    ></v-file-input>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { mapState, mapActions, mapGetters } from "vuex";
export default defineComponent({
  // eslint-disable-next-line
  props: {
    profileUserId: { type: Number, required: true },
  },
  name: "Profile",
  async created() {
    // this.fetchGetUserInfo();
    await this.updateProfileData();
    if (this.isAuthenticated) {
      await this.fetchCheckFriendshipStatus({
        friendId: this.profileUserId,
        userId: this.userInfo.id,
      });
    }
  },
  data() {
    return {
      slideGroupModel: null,
      editPrfilePictureDialog: false,
      profileInfo: {},
    };
  },
  methods: {
    ...mapActions("gestionListMovie", ["fetchGetAllLists"]),
    ...mapActions("user", [
      "fetchUpdateProfilePicture",
      "fetchGetInfoProfileUser",
    ]),
    ...mapActions("gestionFriendship", [
      "fetchCheckFriendshipStatus",
      "fetchSendFriendRequest",
      "fetchAcceptFriendRequest",
      "fetchRemoveFriend",
    ]),

    async updateProfileData() {
      if (!this.ownProfile) {
        await this.fetchGetInfoProfileUser(this.profileUserId);
        this.profileInfo = this.userProfileInfo;
      } else {
        this.profileInfo = this.userInfo;
      }
      this.fetchGetAllLists(this.profileUserId);
    },
    async addFriend() {
      await this.fetchSendFriendRequest(this.profileUserId);
      await this.fetchCheckFriendshipStatus({
        friendId: this.profileUserId,
        userId: this.userInfo.id,
      });
    },
    async acceptFriendRequest() {
      await this.fetchAcceptFriendRequest(this.profileUserId);
      await this.fetchCheckFriendshipStatus({
        friendId: this.profileUserId,
        userId: this.userInfo.id,
      });
    },

    async removeFriend() {
      await this.fetchRemoveFriend(this.profileUserId);
      await this.fetchCheckFriendshipStatus({
        friendId: this.profileUserId,
        userId: this.userInfo.id,
      });
    },
    goToMovieList(idListMovie: number) {
      this.$router.push({ name: "movieList", query: { id: idListMovie } });
    },
    clickFileInput() {
      (this.$refs.fileInputRef as any).click();
    },
    updateProfilePicture(event: Event) {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) {
        return;
      }

      this.fetchUpdateProfilePicture(file);
    },
  },
  computed: {
    ...mapState("gestionListMovie", ["lists"]),
    ...mapGetters("user", ["isAuthenticated"]),
    ...mapState("gestionFriendship", ["friendshipStatus"]),
    ...mapState("user", ["userInfo", "userProfileInfo"]),
    ownProfile(): boolean {
      // Vérifie si l'ID du profil consulté correspond à l'ID de l'utilisateur connecté
      return this.profileUserId === this.userInfo.id.toString();
    },
  },
  components: {},
  watch: {
    $route(to, from) {
      this.updateProfileData();
    },
  },
});
</script>
<style scoped>
.gradient {
  height: 100px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(0, 0, 0, 0.9)
  );
}

::v-deep .v-overlay__content {
  position: fixed;
  width: 100% !important;
  margin: 0px !important;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;

  bottom: 0;
  left: 0;
  right: 0;
  height: 15%; /* Réglez cette valeur pour modifier la hauteur du menu */
  background-color: rgb(64, 60, 60);

  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);

  justify-content: center;
  display: block !important;
}

.v-overlay__content.test {
  background-color: red;
}

.pseudoRow {
  margin-top: 10%;
}

.imgPlaylist {
  height: 80px;
  width: 80px;
}

.listName {
  text-align: center;
  max-width: 70px;
  font-size: 12px;
}

.pseudo {
  max-width: 200px;
  margin: auto;
  padding-top: 60px;
}
</style>
