<template>
  <div>
    <v-row justify="center">
      <v-col cols="6">
        <v-text-field
          v-model="film"
          label="Rechercher film"
          variant="outlined"
          class="mt-4"
          color="orange"
          @keyup.enter="searchMovie"
        >
          <template v-slot:append-inner>
            <v-icon color="orange" icon="mdi-magnify" />
          </template>
        </v-text-field>
      </v-col>
    </v-row>
    <slideGroupContent :content="topMovies" titre="Top films de la semaine" />
    <slideGroupContent :content="infoFilm" titre="Film recherché" />
    <slideGroupContent :content="topSeries" titre="Top series de la semaine" />
  </div>
</template>
<script lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import slideGroupContent from "@/components/slideGroupContent.vue";

export default {
  setup() {
    const store = useStore();
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
