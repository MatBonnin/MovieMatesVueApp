<template>
  <div class="d-flex flex-column">
    <div class="d-flex flex-column">
      <v-sheet
        :key="imageUpdateKey"
        :style="{
          'background-image': `url(\'${backdropUrl}\')`,
          'background-size': 'cover',
        }"
        @click="ownProfile ? openEditDialog('backdrop') : ''"
        :elevation="0"
        class="mx-auto d-flex flex-column justify-end"
        height="200"
        width="100%"
      >
        <div class="gradient d-flex justify-center"></div>
      </v-sheet>
      <v-avatar
        color="grey"
        class="mt-5 profilePicture"
        size="130"
        @click="ownProfile ? openEditDialog('profilePicture') : ''"
      >
        <v-img
          :key="imageUpdateKey"
          cover
          :src="
            profileInfo.profilePicture !== ''
              ? 'http://localhost:5000/' + profileInfo.profilePicture
              : '../../images/profile/photoProfile.jpg'
          "
        ></v-img>
      </v-avatar>

      <span class="text-h4 pseudo" max>{{ profileInfo.pseudo }}</span>
      <span class="text-subtitle-1 text-grey align-self-center">
        Grenoble,Isère
      </span>
    </div>
    <div class="d-flex justify-center">
      <!-- Icon avec compteur -->
      <!-- Si le statut d'amitié est "none" et l'utilisateur est authentifié -->
      <div v-if="!ownProfile">
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
          v-else-if="friendshipStatus === 'accepted' && isAuthenticated"
          class="ma-2"
          color="pink"
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
      </div>
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
        {{ friendsList.length }} Amis
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
      <span>{{ ownProfile ? "Mes" : "Ses" }} listes :</span>
      <v-slide-group
        class="mt-2"
        v-model="slideGroupModel"
        selected-class="bg-success"
      >
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
      v-model="editDialog"
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
          <v-list class="bg-transparent">
            <v-list-item active-color="primary" @click="clickImageInput()">
              <template v-slot:prepend>
                <v-btn icon size="small" class="bg-grey mr-4">
                  <v-icon>mdi-image-multiple</v-icon>
                </v-btn>
              </template>

              <v-list-item-title>
                {{
                  dialogType === "profilePicture"
                    ? "Sélectionner une photo de profil"
                    : "Sélectionner une image de fond"
                }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-dialog>
    <v-file-input
      v-show="false"
      name="image"
      ref="imageInputRef"
      accept="image/*"
      label="File input"
      @change="updateImage($event)"
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
    this.fetchGetFriendsList(this.profileUserId);
  },
  data() {
    return {
      slideGroupModel: null,
      editDialog: false,
      imageUpdateKey: 1,
      profileInfo: {
        id: 0,
        username: "",
        email: "",
        image: "",
        backdrop_path: "",
        bio: "",
        createdAt: "",
        updatedAt: "",
      },
      dialogType: "",
    };
  },
  methods: {
    ...mapActions("gestionListMovie", ["fetchGetAllLists"]),
    ...mapActions("user", [
      "fetchUpdateProfilePicture",
      "fetchGetInfoProfileUser",
      "fetchUpdateProfileBackdrop",
      "fetchGetUserInfo",
    ]),
    ...mapActions("gestionFriendship", [
      "fetchCheckFriendshipStatus",
      "fetchSendFriendRequest",
      "fetchAcceptFriendRequest",
      "fetchRemoveFriend",
      "fetchGetFriendsList",
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
    async updateImage(event: Event) {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) {
        return;
      }

      if (this.dialogType === "profilePicture") {
        await this.fetchUpdateProfilePicture(file);
      } else if (this.dialogType === "backdrop") {
        // Faites l'appel pour mettre à jour l'image de fond ici
        await this.fetchUpdateProfileBackdrop(file);
      }
      await this.fetchGetUserInfo();
      await this.updateProfileData();
      this.imageUpdateKey += 1;
      this.editDialog = false;
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
    openEditDialog(type: string) {
      this.dialogType = type;
      this.editDialog = true;
    },
    clickImageInput() {
      (this.$refs.imageInputRef as any).click();
    },
  },
  computed: {
    ...mapState("gestionListMovie", ["lists"]),
    ...mapGetters("user", ["isAuthenticated"]),
    ...mapState("gestionFriendship", ["friendshipStatus", "friendsList"]),
    ...mapState("user", ["userInfo", "userProfileInfo"]),
    ownProfile(): boolean {
      // Vérifie si l'ID du profil consulté correspond à l'ID de l'utilisateur connecté
      return this.profileUserId === this.userInfo.id.toString();
    },
    backdropUrl() {
      if (this.profileInfo.backdrop_path) {
        return (
          process.env.API_BACK +
          this.profileInfo.backdrop_path.replace(/\\/g, "/")
        );
      }
      return "";
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

.profilePicture {
  position: relative;
  margin: 0 auto;
  margin-top: -70px !important;
}
.pseudo {
  max-width: 200px;
  margin: auto;
  padding-top: 10px;
}
</style>
