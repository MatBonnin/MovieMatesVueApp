<template>
  <div class="h-100">
    <v-row class="w-100 mt-0 mx-0" justify="center">
      <v-col class="mt-auto mb-auto" cols="12">
        <v-row>
          <v-sheet
            :style="{
              'background-image':
                'url(\'https://image.tmdb.org/t/p/w500/' +
                movieInfo.backdrop_path +
                '\')',
            }"
            :elevation="elevation"
            class="mx-auto d-flex flex-column justify-end"
            height="200"
            width="100%"
          >
            <h2 class="ml-2">{{ movieInfo.title }}</h2>
            <div class="d-flex flr-row ml-2">
              <v-icon>mdi-calendar</v-icon>

              <span class="ml-2">{{
                movieTime.hours + "h" + movieTime.minutes
              }}</span>
            </div>
          </v-sheet>
        </v-row>
        <v-row justify="center"> </v-row>
      </v-col>
    </v-row>
    <v-row class="w-100 mt-0 mx-0" justify="center">
      <v-col class="mt-auto mb-auto" cols="12"> </v-col>
    </v-row>

    <v-row class="mt-6 w-100 mx-0">
      <v-divider class="mt-6"></v-divider>
      <v-col cols="12">
        <slide-group-avatar />
      </v-col>
      <v-divider></v-divider>
    </v-row>
    <v-row class="w-100">
      <v-col cols="12">
        <v-row>
          <v-col cols="auto">
            <span class="ml-2 text-orange">Résumé du film : </span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="auto">
            <v-card
              class="mx-auto"
              color="#00000000"
              v-bind="props"
              flat
              theme="dark"
            >
              <v-card-text>
                <p
                  class="summary ml-2"
                  :style="{ maxHeight: showFullSummary ? 'none' : '100px' }"
                  ref="summary"
                  @click="showFullSummary = true"
                >
                  {{ movieInfo.overview }}
                </p>
              </v-card-text>

              <v-overlay
                :model-value="true"
                contained
                scrim="#03635800"
                style="
                  background: linear-gradient(
                    to bottom,
                    rgba(0, 0, 0, 0),
                    black
                  );
                  opacity: 0.7;
                "
                class="align-center justify-center"
              >
              </v-overlay>
            </v-card>
          </v-col>
        </v-row>

        <v-divider></v-divider>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import SlideGroupAvatar from "@/components/movie/slideGroupAvatar.vue";
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  // eslint-disable-next-line
  name: "Movie",
  created() {
    console.log("salut");
    this.fetchGetMovieInfo(this.id);
  },
  data() {
    return {
      isFadingToBlack: true,
      id: this.$route.query.id,
      showFullSummary: false,
      overlay: true,
    };
  },
  methods: {
    ...mapActions("gestionFilm", ["fetchGetMovieInfo"]),
  },
  computed: {
    ...mapState("gestionFilm", ["movieInfo"]),
    fadeOverlayHeight() {
      if (!this.$refs.summary) {
        return 0;
      }
      const summaryHeight = this.$refs.summary.offsetHeight;
      if (summaryHeight > 100) {
        return summaryHeight - 100;
      }
      return 0;
    },
    movieTime() {
      const totalMinutes = this.movieInfo.runtime;
      const hours = Math.floor(totalMinutes / 60);
      let minutes = totalMinutes % 60;
      if (minutes < 10) {
        minutes = "0" + minutes.toString();
      }
      return { hours, minutes };
    },
  },
  components: { SlideGroupAvatar },
});
</script>
<style scoped>
.summary {
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
  position: relative;
}

.fade-to-black {
  background-color: rgba(0, 0, 0, 0.5); /* fond noir semi-transparent */
  color: white; /* texte blanc pour un contraste optimal */
  transition: background-color 0.5s ease-out; /* transition sur le fond noir */
}
.fade-overlay {
  background: linear-gradient(
    to bottom,
    rgb(241, 234, 234),
    rgba(0, 0, 0, 0.7)
  );
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  transition: height 0.5s ease-in-out;
}
</style>
