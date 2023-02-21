<template>
  <div>
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
        <!-- <v-btn @click="toggleTheme">toggle theme</v-btn> -->
      </v-col>
    </v-row>
    <slideGroupContent :content="infoFilm" titre="Film recherché" />
    <slideGroupContent :content="topMovies" titre="Tendance films" />
    <slideGroupContent :content="topSeries" titre="Tendance série" />
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

    onMounted(() => {
      fetchGetFilm("avatar");
      fetchTopMovies("");
      fetchGetTopSeries("");
      console.log(infoFilm.value);
    });

    return {
      film,
      infoFilm,
      fetchGetFilm,
      fetchTopMovies,
      fetchGetTopSeries,
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
