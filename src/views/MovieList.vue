<template>
  <div class="d-flex flex-column" style="margin-top: 30%">
    <div class="align-self-center">
      <v-img
        class="imgPlaylist"
        content-class="imgPlaylist"
        width="150px"
        :src="
          selectedList?.image !== null
            ? `http://localhost:5000/uploads/${selectedList.image}`
            : 'http://localhost:5000/uploads/likePlaylist.png'
        "
        :alt="selectedList.name"
      ></v-img>
    </div>
    <div class="ml-4 mt-6">
      <span class="text-h4 font-weight-bold">{{ selectedList.name }}</span>
      <div class="mt-2 d-flex align-end">
        <!-- photo de profile en petit -->
        <v-avatar size="small">
          <v-img
            cover
            :src="
              selectedList?.ownerPicture !== null
                ? `http://localhost:5000/${selectedList.ownerPicture}`
                : 'http://localhost:5000/uploads/likePlaylist.png'
            "
          ></v-img>
        </v-avatar>
        <span class="ml-2">{{ selectedList.pseudoOwner }}</span>
      </div>
      <div class="d-flex flex-row text-grey mt-2 align-center">
        <v-icon>mdi-movie-open</v-icon>
        <span class="ml-2">{{ movielistmovies.length }} </span>
      </div>
    </div>
    <div class="d-flex mt-4 flex-wrap">
      <v-img
        v-for="film in movielistmovies"
        :key="film.id"
        class="bg-black mr-2"
        max-width="70px"
        width="70"
        height="110"
        :aspect-ratio="1"
        :src="'https://image.tmdb.org/t/p/original/' + film.poster_path"
        @click="toMovie(film.imdb_id)"
      ></v-img>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { mapState, mapActions } from "vuex";
export default defineComponent({
  // eslint-disable-next-line
  name: "MovieList",
  created() {
    this.fetchGetListById(this.$route.query.id);
    this.fetchFindAllByListId(this.$route.query.id);
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("gestionMovieListMovie", ["fetchFindAllByListId"]),
    ...mapActions("gestionListMovie", ["fetchGetListById"]),
    toMovie(id: number) {
      this.$router.push({
        name: "movie",
        query: { id: id.toString(), contentType: "movie" },
      });
    },
  },
  computed: {
    ...mapState("gestionMovieListMovie", ["movielistmovies"]),
    ...mapState("gestionListMovie", ["selectedList"]),
  },
  components: {},
});
</script>
<style scoped></style>
