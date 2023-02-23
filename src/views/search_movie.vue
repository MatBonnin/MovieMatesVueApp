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
      <!--<v-row class="w-100" justify="center">
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
          <v-btn @click="toggleTheme">toggle theme</v-btn> 
        </v-col>
      </v-row> -->
      <v-row class="w-100 mt-12 mx-0">
        <div class="pl-2 pt-10 d-flex">
          <v-icon>mdi-movie-open-star</v-icon>
          <p class="ml-2">: Le film du moment</p>
        </div>

        <v-col class="w-100 justify-center px-0" cols="12">
          <v-sheet
            :style="{
              'background-image':
                'url(\'https://image.tmdb.org/t/p/w500/' +
                topMovies.results[0].backdrop_path +
                '\')',
              'background-size': 'cover',
            }"
            class="d-flex justify-end flex-column"
            height="200"
            width="100%"
          >
            <h2 class="ml-2">{{ topMovies.results[0].title }}</h2>
          </v-sheet>
        </v-col>
      </v-row>

      <!-- <slideGroupContent :content="infoFilm" titre="Film recherché" /> -->
      <slideGroupContent :content="topMovies" titre="Tendance films" />
      <v-divider class="my-4"></v-divider>
      <slideGroupContent :content="topSeries" titre="Tendance série" />
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
    const film = ref(""); // Utilisez ref pour créer une référence de données reactive
    const drawer = true;
    const fetchGetFilm = (data: string) =>
      store.dispatch("gestionFilm/fetchGetFilm", data);

    const fetchGetTopSeries = (data: string) =>
      store.dispatch("gestionFilm/fetchGetTopSeries", data);

    const fetchTopMovies = (data: string) =>
      store.dispatch("gestionFilm/fetchGetTopMovies", data);

    const infoFilm = computed(() => store.state.gestionFilm.infoFilm);
    const topMovies = computed(() => store.state.gestionFilm.topMovies);
    const topSeries = computed(() => store.state.gestionFilm.topSeries);
    const theme = useTheme();

    let isLoading = ref(true); // Ajouter une variable isLoading
    function loadData() {
      Promise.all([
        fetchGetFilm("avatar"),
        fetchTopMovies(""),
        fetchGetTopSeries(""),
      ])
        .then(() => {
          console.log("then");
          isLoading.value = false;
        })
        .catch(() => loadData());
    }

    onMounted(() => {
      loadData();
    });

    return {
      film,
      infoFilm,
      fetchGetFilm,
      fetchTopMovies,
      fetchGetTopSeries,
      drawer,
      model,
      topMovies,
      topSeries,
      searchMovie: () => {
        console.log("salut"), fetchGetFilm(film.value);
      },
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
.rmMarge {
  margin-bottom: 0;
  margin-top: 0;
  padding-bottom: 0;
  padding-top: 0;
}
</style>
