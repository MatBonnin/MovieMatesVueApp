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
      <v-row class="w-100 mx-0">
        <div class="pl-2 pt-10 d-flex">
          <v-icon>mdi-movie-open-star</v-icon>
          <p class="ml-2">: Le film du moment</p>
        </div>

        <v-col class="w-100 justify-center px-0 ma-auto" cols="10">
          <v-sheet
            :style="{
              'background-image':
                'url(\'https://image.tmdb.org/t/p/original/' +
                topMovies.results[0].backdrop_path +
                '\')',
              'background-size': 'cover',
            }"
            class="d-flex justify-end flex-column shadow"
            height="200"
            width="100%"
          >
            <h2 class="ml-2">{{ topMovies.results[0].title }}</h2>
          </v-sheet>
        </v-col>
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
        v-for="(moviesByGenre, index) in topMoviesByGenre"
        :key="index"
        contentType="movie"
        :content="moviesByGenre"
        :titre="genres.find((g) => g.id == index)?.name"
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
    this.genres.forEach(async (element) => {
      await this.fetchGetTopMoviesByGenre(element.id);
    });
    this.isLoading = false;
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
    // topMoviesByGenre() {
    //   return this.genreIds.map(
    //     (genreId) => this.$store.state.gestionFilmTMDB.topMoviesByGenre[genreId]
    //   );
    // },
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
