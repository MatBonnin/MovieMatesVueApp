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
              <h2 class="ml-2">{{ movieInfo.title || movieInfo.name }}</h2>
              <div class="d-flex flr-row ml-2">
                <v-icon>mdi-calendar</v-icon>

                <span class="ml-2">{{ movieTime }}</span>
              </div>
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
        <v-row class="w-100 pl-4">
          <v-col cols="auto">
            <span class="ml-2 text-orange">Résumé du film : </span>
          </v-col>
        </v-row>
        <v-row class="w-100 mx-auto">
          <v-col cols="auto" class="ml-4">
            <div class="">
              <div
                class="movie-summary"
                :class="{ expanded: isExpanded }"
                @click="toggleExpand"
              >
                <p>{{ movieInfo.overview }}</p>
              </div>
              <div
                v-if="!isExpanded"
                class="expand-indicator"
                @click="toggleExpand"
              ></div>
            </div>
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
  name: "ContentInfo",
  created() {
    this.fetchGetContentInfo({
      type: this.$route.query.contentType,
      id: this.id,
    });
  },

  data() {
    return {
      isFadingToBlack: true,
      id: this.$route.query.id,
      isExpanded: false,
      showFullSummary: false,
      overlay: true,
    };
  },
  methods: {
    ...mapActions("gestionFilm", ["fetchGetContentInfo"]),
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },
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
      if (this.$route.query.contentType === "movie") {
        const totalMinutes = this.movieInfo.runtime;
        const hours = Math.floor(totalMinutes / 60);
        let minutes = totalMinutes % 60;
        if (minutes < 10) {
          minutes = "0" + minutes.toString();
        }
        return hours + "h" + minutes;
      } else {
        return `${this.movieInfo.seasons} saions`;
      }
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

.shadow {
  box-shadow: 5px 5px white;
}
.fade-to-black {
  background-color: rgba(0, 0, 0, 0.5); /* fond noir semi-transparent */
  color: white; /* texte blanc pour un contraste optimal */
  transition: background-color 0.5s ease-out; /* transition sur le fond noir */
}
.fade-overlay {
  background: linear-gradient(to bottom, rgba(87, 85, 85, 0), rgba(0, 0, 0, 0));
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  transition: height 0.5s ease-in-out;
}

.movie-summary {
  position: relative;
  max-height: 100px;
  overflow: hidden;
  cursor: pointer;
  padding-right: 1rem;
  text-align: justify;
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
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(0, 0, 0, 0.9)
  );
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
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(0, 0, 0, 0.9)
  );
}
</style>
