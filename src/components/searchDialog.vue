<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    :scrim="false"
    transition="dialog-top-transition"
  >
    <v-card color="background">
      <v-card-title>
        <v-row>
          <v-col cols="auto">
            <v-icon class="mt-4" size="large" @click="dialog = !dialog"
              >mdi-arrow-left</v-icon
            >
          </v-col>
          <v-col cols="auto">
            <v-text-field
              v-model="rechercheText"
              label="Rechercher"
              density="compact"
              rounded
              variant="solo"
              class="mt-4"
              color="primary"
              single-line
              @keyup="onKeyUp"
              append-inner-icon="mdi-magnify"
              hide-details
            >
            </v-text-field>
            <v-chip-group
              v-model="searchType"
              active-class="primary--text custom-chip--selected"
              column
              class="mt-2 d-flex justify-center"
            >
              <v-chip
                :class="{ 'custom-chip--selected': searchType === 'movie' }"
                value="movie"
              >
                movie
              </v-chip>
              <v-chip
                :class="{
                  'custom-chip--selected': searchType === 'acteurs',
                }"
                value="acteurs"
              >
                Acteurs
              </v-chip>
              <v-chip
                :class="{
                  'custom-chip--selected': searchType === 'utilisateurs',
                }"
                value="utilisateurs"
              >
                Utilisateurs
              </v-chip>
            </v-chip-group>
          </v-col>
        </v-row>
      </v-card-title>

      <v-row class="w-100" v-if="searchType === 'utilisateurs'">
        <v-col cols="12">
          <v-list-item
            v-for="user in searchResults"
            :key="user.id"
            :title="user.pseudo"
            @click="toProfile(user.id)"
          >
            <template v-slot:prepend>
              <v-avatar>
                <v-img
                  :src="'http://localhost:5000/' + user.profilePicture"
                  :alt="user.pseudo"
                  cover
                />
              </v-avatar>
            </template>

            <template v-slot:append>
              <v-btn
                color="grey-lighten-1"
                icon="mdi-information"
                variant="text"
              ></v-btn>
            </template>
          </v-list-item>
        </v-col>
      </v-row>
      <div v-if="searchType === 'movie'" class="d-flex flex-wrap flew-row ml-6">
        <v-card
          v-for="film in infoFilm.results"
          :key="film.id"
          class="ma-1"
          height="120"
          width="80"
          @click="toMovie(film.id)"
        >
          <v-img
            class="bg-white"
            width="auto"
            height="180"
            :aspect-ratio="1"
            :src="'https://image.tmdb.org/t/p/original/' + film.poster_path"
          ></v-img>
        </v-card>
      </div>
      <!-- <slide-group-content :content="infoFilm" titre="" /> -->
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  props: {
    dialogSearch: { type: Boolean, required: true },
  },
  name: "App",
  components: {},
  data() {
    return {
      rechercheText: "",
      searchType: "movie",
    };
  },
  computed: {
    dialog: {
      get() {
        return this.dialogSearch;
      },
      set(val: boolean) {
        this.$emit("updtDialog", val);
      },
    },
    ...mapState("gestionFilmTMDB", ["infoFilm"]),
    ...mapState("user", ["searchResults"]),
  },
  methods: {
    ...mapActions("gestionFilmTMDB", ["fetchGetFilm"]),
    ...mapActions("user", ["fetchSearchUser"]),
    onKeyUp() {
      if (this.rechercheText.length >= 3) {
        console.log("search");
        this.search();
      }
    },
    toMovie(id: number) {
      this.$router.push({
        name: "movie",
        query: { id: id.toString(), contentType: "movie" },
      });
    },
    search() {
      switch (this.searchType) {
        case "movie":
          this.fetchGetFilm(this.rechercheText);
          break;
        case "acteurs":
          // Fonction pour rechercher des acteurs
          break;
        case "utilisateurs":
          // Fonction pour rechercher des utilisateurs
          this.fetchSearchUser(this.rechercheText);
          break;
        default:
          this.fetchGetFilm(this.rechercheText);
      }
    },
    toProfile(userId: number) {
      this.$router.push({
        name: "Profile",
        params: { profileUserId: userId },
      });
      this.dialog = false;
    },
  },
});
</script>
<style scoped>
.custom-chip {
  border: 1px solid transparent;
}

.custom-chip--selected {
  border-color: red !important;
  border: 1px solid transparent;
}
</style>
