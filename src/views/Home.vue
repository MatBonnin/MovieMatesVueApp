<template>
  <div class="h-100">
    <loading-spinner v-if="isLoading"></loading-spinner>
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
      <div class="mt-6">
        <span class="mt-3 ml-8" color="primary" variant="outlined">
          MovieMates près de chez vous :
        </span>
        <v-slide-group
          v-model="model"
          class="ml-2 py-4"
          selected-class="bg-success"
        >
          <v-slide-group-item
            v-for="user in nearbyUsers"
            :key="user.id"
            v-slot="{}"
          >
            <div class="d-flex justify-center flex-column avatar mr-4">
              <v-avatar
                size="x-large"
                class="mr-1"
                rounded="1"
                @click="toProfile(user.id)"
              >
                <v-img
                  class="pb-4"
                  content-class="test"
                  :src="urlBack + user.profilePicture"
                  :alt="user.pseudo"
                ></v-img>
              </v-avatar>
              <span class="test">{{ user.pseudo }}</span>
            </div>
          </v-slide-group-item>
        </v-slide-group>
      </div>
      <div>
        <span class="mt-3 ml-8" color="primary" variant="outlined">
          Film aimé par vos amis :
        </span>
        <v-slide-group class="ml-4 mt-4" v-model="model">
          <v-slide-group-item
            v-for="film in likedFriendsMovies"
            :key="film.backdrop_path"
            v-slot="{ selectedClass }"
          >
            <v-card
              :class="['ma-1', selectedClass, 'shadow']"
              height="120"
              width="80"
              @click="toMovie(film.idImdb)"
            >
              <v-img
                class="bg-white"
                width="auto"
                height="120"
                :aspect-ratio="1"
                :src="'https://image.tmdb.org/t/p/original/' + film.poster_path"
              ></v-img>
              <v-avatar
                size="x-large"
                class="mr-1 profilePictureMovie"
                rounded="1"
                ><v-img
                  class="pb-4 v-img__img v-img__img--contain"
                  :src="urlBack + film.profilePicture"
                ></v-img
              ></v-avatar>
            </v-card>
          </v-slide-group-item>
        </v-slide-group>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  // eslint-disable-next-line
  name: "Home",
  async mounted() {
    await this.fetchGetTopMovies();
    await this.fetchFindNearbyUsers(1000);
    await this.fetchRandomLikedFriendsMovies();

    this.isLoading = false;
  },

  data() {
    return {
      urlBack: process.env.API_BACK,
      model: null,
      isLoading: true,
    };
  },
  methods: {
    ...mapActions("gestionLocalisation", ["fetchFindNearbyUsers"]),
    ...mapActions("gestionMovie", ["fetchRandomLikedFriendsMovies"]),
    ...mapActions("gestionFilmTMDB", ["fetchGetTopMovies"]),
    toMovie(id) {
      this.$router.push({
        name: "movie",
        query: { id: id, contentType: "movie" },
      });
    },
    toProfile(userId) {
      this.$router.push({
        name: "Profile",
        params: { profileUserId: userId },
      });
    },
  },
  computed: {
    ...mapState("gestionLocalisation", ["nearbyUsers"]),
    ...mapState("gestionMovie", ["likedFriendsMovies"]),
    ...mapState("gestionFilmTMDB", ["topMovies"]),
  },
  components: {},
});
</script>
<style scoped>
.profilePictureMovie {
  position: absolute;
  z-index: 1000;
}
</style>
