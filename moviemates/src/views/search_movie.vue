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
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col cols="2"><span>Recherche </span></v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-sheet
              class="mx-auto bg-background"
              elevation="8"
              max-width="800"
            >
              <v-slide-group
                v-model="model"
                class="pa-4"
                selected-class="bg-success"
              >
                <v-slide-group-item
                  v-for="film in infoFilm.results"
                  :key="film.backdrop_path"
                  v-slot="{ toggle, selectedClass }"
                >
                  <v-card
                    :class="['ma-4', selectedClass]"
                    height="120"
                    width="80"
                    @click="toggle"
                  >
                    <v-img
                      class="bg-white"
                      width="auto"
                      height="120"
                      :aspect-ratio="1"
                      :src="
                        'https://image.tmdb.org/t/p/w500/' + film.poster_path
                      "
                    ></v-img>
                  </v-card>
                </v-slide-group-item>
              </v-slide-group>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const model = null;
    const film = ref(""); // Utilisez ref pour créer une référence de données reactive
    const fetchGetFilm = (data: string) =>
      store.dispatch("gestionFilm/fetchGetFilm", data);
    const infoFilm = computed(() => store.state.gestionFilm.infoFilm);

    onMounted(() => {
      fetchGetFilm("avatar");
      console.log(infoFilm.value);
    });

    return {
      film,
      infoFilm,
      fetchGetFilm,
      model,
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
};
</script>
