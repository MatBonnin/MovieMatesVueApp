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
      <v-row class="w-100 mt-12 mx-0">
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
    </div>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import slideGroupContent from "@/components/slideGroupContent.vue";
import { useTheme } from "vuetify/lib/framework.mjs";

export default {
  setup() {
    const store = useStore();
    console.log("le token", store.state.user.token);
    const model = null;

    const drawer = true;

    const fetchGetTopSeries = (data: string) =>
      store.dispatch("gestionFilmTMDB/fetchGetTopSeries", data);

    const fetchTopMovies = (data: string) =>
      store.dispatch("gestionFilmTMDB/fetchGetTopMovies", data);

    const topMovies = computed(() => store.state.gestionFilmTMDB.topMovies);
    const topSeries = computed(() => store.state.gestionFilmTMDB.topSeries);
    const theme = useTheme();

    let isLoading = ref(true); // Ajouter une variable isLoading
    function loadData() {
      Promise.all([fetchTopMovies(""), fetchGetTopSeries("")])
        .then(() => {
          isLoading.value = false;
        })
        .catch(() => {
          loadData();
        });
    }

    onMounted(() => {
      loadData();
    });

    return {
      fetchTopMovies,
      fetchGetTopSeries,
      drawer,
      model,
      topMovies,
      topSeries,

      toggleTheme: () =>
        (theme.global.name.value = theme.global.current.value.dark
          ? "lightTheme"
          : "darkTheme"),
      isLoading,
    };
  },
  methods: {
    // searchMovie(): void {
    //   this.fetchGetFilm("jocker");
    // },
  },
  components: {
    slideGroupContent,
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
