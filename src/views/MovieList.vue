<template>
  <div class="d-flex flex-column" style="margin-top: 10%">
    <div class="align-self-center">
      <v-img
        class="imgPlaylist"
        :key="imageUpdateKey"
        content-class="imgPlaylist"
        width="150px"
        @click="isOwner ? (editDialog = true) : ''"
        :src="
          selectedList.image
            ? urlImage(selectedList.image)
            : 'https://www.shutterstock.com/image-vector/big-open-clapper-board-movie-260nw-588108287.jpg'
        "
        :alt="selectedList.name"
      ></v-img>
    </div>
    <div class="ml-4 mt-6">
      <span class="text-h4 font-weight-bold">{{ selectedList.name }}</span>
      <div class="mt-2 d-flex align-end">
        <!-- photo de profile en petit -->
        <v-avatar size="small">
          <v-img
            cover
            :src="
              selectedList?.ownerPicture !== null
                ? `http://localhost:5000/${selectedList.ownerPicture}`
                : 'https://www.shutterstock.com/image-vector/big-open-clapper-board-movie-260nw-588108287.jpg'
            "
          ></v-img>
        </v-avatar>
        <span class="ml-2">{{ selectedList.pseudoOwner }}</span>
      </div>
      <div class="d-flex flex-row text-grey mt-2 align-center">
        <div class="nbMovie">
          <v-icon>mdi-movie-open</v-icon>
          <span class="ml-2">{{ movielistmovies.length }} </span>
        </div>
        <v-icon
          v-if="!isOwner"
          class="ml-4"
          :color="selectedList.isFollowed === 0 ? 'white' : 'secondary'"
          @click="addToFollow"
          >{{
            selectedList.isFollowed === 0 ? "mdi-heart-outline" : "mdi-heart"
          }}
        </v-icon>
      </div>
    </div>
    <div class="d-flex mt-4 flex-wrap">
      <v-img
        v-for="film in movielistmovies"
        :key="film.id"
        class="bg-black mr-2"
        max-width="70px"
        width="70"
        height="110"
        :aspect-ratio="1"
        :src="'https://image.tmdb.org/t/p/original/' + film.poster_path"
        @click="toMovie(film.imdb_id)"
      ></v-img>
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
                Sélectionner une photo de playlist
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

import { mapState, mapActions } from "vuex";
export default defineComponent({
  // eslint-disable-next-line
  name: "MovieList",
  created() {
    this.fetchGetListById(this.$route.query.id);
    this.fetchFindAllByListId(this.$route.query.id);
  },
  data() {
    return {
      editDialog: false,
      imageUpdateKey: 1,
      isFollowed: 0,
    };
  },
  methods: {
    ...mapActions("gestionMovieListMovie", ["fetchFindAllByListId"]),
    ...mapActions("gestionListMovie", [
      "fetchGetListById",
      "fetchUpdateListImage",
    ]),
    ...mapActions("gestionMovieListFollow", [
      "fetchCreateListMovieFollow",
      "fetchDeleteListMovieFollow",
      "fetchGetListMovieFollowByUserAndPlaylist",
    ]),
    urlImage(path: string) {
      return process.env.API_BACK + path;
    },
    toMovie(id: number) {
      this.$router.push({
        name: "movie",
        query: { id: id.toString(), contentType: "movie" },
      });
    },
    clickImageInput() {
      (this.$refs.imageInputRef as any).click();
    },
    async updateImage(event: Event) {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) {
        return;
      }

      await this.fetchUpdateListImage({
        listId: this.selectedList.id,
        file: file,
      });
      await this.fetchGetListById(this.$route.query.id);
      this.imageUpdateKey += 1;
      this.editDialog = false;
    },

    async addToFollow() {
      if (this.selectedList.isFollowed === 0) {
        // Suivre la playlist
        await this.fetchCreateListMovieFollow({
          idPlaylist: this.selectedList.id,
          idFollower: this.userInfo.id,
        });
      } else {
        // Ne plus suivre la playlist
        await this.fetchDeleteListMovieFollow({
          idPlaylist: this.selectedList.id,
        });
      }
      this.fetchGetListById(this.$route.query.id);
    },
  },
  computed: {
    ...mapState("gestionMovieListMovie", ["movielistmovies"]),
    ...mapState("gestionListMovie", ["selectedList"]),
    ...mapState("user", ["userInfo"]),
    isOwner() {
      return (this as any).userInfo.id === (this as any).selectedList.idOwner;
    },
  },
  components: {},
});
</script>
<style scoped>
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
</style>
