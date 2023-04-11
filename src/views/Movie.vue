<template>
  <div class="h-100">
    <v-row class="w-100 mt-0 mx-0" justify="center">
      <v-col class="mt-auto mb-auto" cols="12">
        <v-row>
          <v-sheet
            v-if="movieInfo.backdrop_path"
            :style="{
              'background-image':
                'url(\'https://image.tmdb.org/t/p/original/' +
                movieInfo.backdrop_path +
                '\')',
              'background-size': 'cover',
            }"
            :elevation="elevation"
            class="mx-auto d-flex flex-column justify-end"
            height="200"
            width="100%"
          >
            <div class="gradient">
              <!-- <div class="d-flex flr-row ml-2">
                <v-icon>mdi-calendar</v-icon>

                <span class="ml-2">{{ movieTime }}</span>
              </div> -->
            </div>
          </v-sheet>
        </v-row>
        <v-row class="w-100 ml-3">
          <span class="title">{{ movieInfo.title || movieInfo.name }}</span>
        </v-row>

        <v-row class="w-100">
          <v-col cols="12">
            <v-row class="w-100 mx-auto">
              <v-col cols="12" class="ml-1">
                <div class="">
                  <div
                    class="movie-summary"
                    :class="{ expanded: isExpanded }"
                    @click="toggleExpand"
                  >
                    <p>{{ movieInfo.overview }}</p>
                  </div>
                  <span @click="toggleExpand" class="plus">Voir plus...</span>
                  <div
                    v-if="!isExpanded"
                    class="expand-indicator"
                    @click="toggleExpand"
                  ></div>
                </div>
              </v-col>
            </v-row>
            <v-row class="w-100" align="center">
              <v-col cols="auto" class="ml-3">
                <v-btn
                  color="#D90130"
                  class="btnList"
                  prepend-icon="mdi-plus-box-outline"
                  @click="dialogAddList = !dialogAddList"
                >
                  Ma liste
                </v-btn>
              </v-col>
              <v-col cols="auto" class="ma-0">
                <v-icon
                  :color="isLiked === 0 ? 'white' : 'secondary'"
                  @click="addToLikeList"
                  >{{
                    isLiked === 0 ? "mdi-heart-outline" : "mdi-heart"
                  }}</v-icon
                >
              </v-col>
              <v-col cols="auto">
                <v-btn
                  prepend-icon="mdi-information-outline"
                  color="black"
                  stacked
                >
                  info
                </v-btn>
              </v-col>
            </v-row>

            <v-divider></v-divider>
          </v-col>
        </v-row>
        <v-row justify="center"> </v-row>
      </v-col>
    </v-row>
    <v-row class="w-100 mx-0">
      <v-divider class="mt-1"></v-divider>
      <v-col cols="12">
        <slide-group-avatar />
      </v-col>
      <v-divider></v-divider>
    </v-row>

    <addToLIstDialogVue
      :dialogAddMovieToList="dialogAddList"
      :imdbId="movieInfo?.imdb_id"
      @updtDialog="dialogAddList = !dialogAddList"
    />
  </div>
</template>

<script>
import SlideGroupAvatar from "@/components/movie/slideGroupAvatar.vue";
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import addToLIstDialogVue from "@/components/movie/addMovieToLIstDialog.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "Movie",
  async created() {
    await this.fetchGetContentInfo({
      type: this.$route.query.contentType,
      id: this.id,
    });
    await this.fetchIsLiked({ idImdb: this.movieInfo.imdb_id });
  },

  data() {
    return {
      isFadingToBlack: true,
      id: this.$route.query.id,
      isExpanded: false,
      showFullSummary: false,
      overlay: true,
      dialogAddList: false,
    };
  },
  methods: {
    ...mapActions("gestionFilmTMDB", ["fetchGetContentInfo"]),
    ...mapActions("gestionMovie", ["fetchIsLiked"]),
    ...mapActions("gestionMovieListMovie", ["fetchAddToLikePlaylist"]),
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },
    addToLikeList() {
      this.fetchAddToLikePlaylist({ idImdbMovie: this.movieInfo.imdb_id });
    },
  },
  computed: {
    ...mapState("gestionFilmTMDB", ["movieInfo"]),
    ...mapState("gestionMovie", ["isLiked"]),
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
      if (this.$route.query.contentType === "movie") {
        const totalMinutes = this.movieInfo.runtime;
        const hours = Math.floor(totalMinutes / 60);
        let minutes = totalMinutes % 60;
        if (minutes < 10) {
          minutes = "0" + minutes.toString();
        }
        return hours + "h" + minutes;
      } else {
        return `${
          this.movieInfo.seasons ? this.movieInfo.seasons.length : "0"
        } saions`;
      }
    },
  },
  components: { SlideGroupAvatar, addToLIstDialogVue },
});
</script>
<style scoped>
.title {
  font-weight: 700;
  font-size: 36px;
  line-height: 44px;
  text-align: center;
}
.summary {
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
  position: relative;
}

.shadow {
  box-shadow: 5px 5px white;
}
.fade-overlay {
  background: linear-gradient(to bottom, rgba(87, 85, 85, 0), rgba(0, 0, 0, 0));
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  transition: height 0.5s ease-in-out;
}

.btnList {
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
}

.plus {
  font-weight: 700;
  font-size: 14px;
  line-height: 151.02%;
}

.movie-summary {
  position: relative;
  max-height: 65px;
  overflow: hidden;
  cursor: pointer;
  padding-right: 1rem;
  text-align: initial;

  font-weight: 400;
  font-size: 14px;
  line-height: 151.02%;
}
.movie-summary.expanded {
  max-height: none;
}
.movie-summary::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20px;
  /* background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(0, 0, 0, 0.9)
  ); */
}
.movie-summary.expanded::after {
  display: none;
}
.expand-indicator {
  display: flex;
  justify-content: center;
  cursor: pointer;
}

.gradient {
  height: 100px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(0, 0, 0, 0.9)
  );
}
</style>
