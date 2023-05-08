<template>
  <div class="h-100">
    <div
      v-if="isLoading === true"
      class="d-flex justify-center align-center h-75"
    >
      <!-- Écran de chargement -->
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
        absol
      ></v-progress-circular>
    </div>
    <div v-else>
      <!-- Le reste de votre code de template -->
      <v-row class="w-100 mx-0">
        <!-- ... -->
      </v-row>

      <slideGroupContent
        :content="topMovies"
        contentType="movie"
        titre="Tendance films"
      />
      <v-divider color="primary" class="my-4"></v-divider>
      <slideGroupContent
        contentType="serie"
        :content="topSeries"
        titre="Tendance série"
      />

      <slideGroupContent
        v-for="(moviesByGenreEntry, index) in topMoviesByGenre"
        :key="index"
        contentType="movie"
        :content="moviesByGenreEntry.data"
        :titre="genres.find((g) => g.id == moviesByGenreEntry.genreId)?.name"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import slideGroupContent from "@/components/slideGroupContent.vue";
export default {
  async created() {
    await this.fetchGetTopSeries("");
    await this.fetchGetTopMovies("");
    await this.fetchGetGenres();
    // this.loadMoreGenres();
    for (let i = 0; i < 4; i++) {
      await this.fetchGetTopMoviesByGenre(this.genres[i].id);
    }
    this.isLoading = false;
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  data() {
    return {
      model: null,
      drawer: true,
      isLoading: true,
    };
  },
  computed: {
    ...mapState("gestionFilmTMDB", [
      "topMovies",
      "topSeries",
      "genres",
      "topMoviesByGenre",
    ]),
  },
  components: { slideGroupContent },

  methods: {
    ...mapActions("gestionFilmTMDB", [
      "fetchGetTopSeries",
      "fetchGetTopMovies",
      "fetchGetGenres",
      "fetchGetTopMoviesByGenre",
    ]),

    toggleTheme() {
      const theme = this.$vuetify.theme;
      theme.current = theme.current === "dark" ? "light" : "dark";
    },

    handleScroll() {
      const bottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight;

      if (bottom) {
        this.loadMoreGenres();
      }
    },

    async loadMoreGenres() {
      const currentIndex = this.topMoviesByGenre.length;
      const endIndex = Math.min(currentIndex + 2, this.genres.length);

      for (let i = currentIndex; i < endIndex; i++) {
        await this.fetchGetTopMoviesByGenre(this.genres[i].id);
      }
    },
  },
};
</script>

<style scoped>
.shadow {
  box-shadow: 5px 5px white;
}
.rmMarge {
  margin-bottom: 0;
  margin-top: 0;
  padding-bottom: 0;
  padding-top: 0;
}
</style>
