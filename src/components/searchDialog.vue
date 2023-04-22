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
                :class="{ 'custom-chip--selected': searchType === 'films' }"
                value="films"
              >
                Films
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

      <v-row class="w-100">
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
      <slide-group-content
        :content="infoFilm"
        titre="rechercheText recherché"
      />
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import SlideGroupContent from "./slideGroupContent.vue";

export default defineComponent({
  props: {
    dialogSearch: { type: Boolean, required: true },
  },
  name: "App",
  components: { SlideGroupContent },
  data() {
    return {
      rechercheText: "",
      searchType: "films",
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
    search() {
      switch (this.searchType) {
        case "films":
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
