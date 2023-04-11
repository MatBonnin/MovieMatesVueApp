<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    :scrim="false"
    transition="dialog-top-transition"
  >
    <v-card color="background">
      <v-card-title>
        <v-icon size="large" @click="dialog = !dialog"
          >mdi-arrow-left-thick</v-icon
        >
      </v-card-title>
      <v-row class="w-100" justify="center">
        <v-col cols="6">
          <v-text-field
            v-model="film"
            label="Rechercher film"
            density="compact"
            variant="solo"
            class="mt-4"
            color="primary"
            single-line
            @keyup.enter="searchMovie"
            append-inner-icon="mdi-magnify"
            @click:append-inner="searchMovie"
            hide-details
          >
          </v-text-field>
        </v-col>
      </v-row>
      <slide-group-content :content="infoFilm" titre="Film recherché" />
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
      film: "",
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
  },
  methods: {
    ...mapActions("gestionFilmTMDB", ["fetchGetFilm"]),
    searchMovie() {
      this.fetchGetFilm(this.film);
    },
  },
});
</script>
