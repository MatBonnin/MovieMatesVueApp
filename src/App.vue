<template>
  <v-app class="test">
    <v-main>
      <v-row class="w-100 mt-2 d-flex justify-space-between">
        <v-col class="ml-4" cols="auto">
          <v-icon size="50">mdi-menu</v-icon>
        </v-col>
        <v-col cols="auto">
          <v-avatar color="white" size="54"></v-avatar>
        </v-col>
      </v-row>

      <router-view />

      <v-bottom-navigation v-model="value" color="orange">
        <v-btn value="recent">
          <span>Movie</span>

          <v-icon @click="toMovie">mdi-movie</v-icon>
        </v-btn>

        <v-btn value="favorites">
          <span>Favorites</span>

          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn value="nearby">
          <span>Nearby</span>

          <v-icon>mdi-map-marker</v-icon>
        </v-btn>
        <v-btn value="account">
          <span>Profile</span>

          <v-icon>mdi-account</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
//import navBar from "./components/navBar.vue";
// import HelloWorld from "./components/HelloWorld.vue";
// import searchMovie from "./views/search_movie.vue";
import login from "./views/Login.vue";

export default defineComponent({
  name: "App",
  components: {
    // HelloWorld,
    // searchMovie,
    // navBar,
  },
  data() {
    return {
      drawer: false,
      group: null,
      value: "recent",
      //
    };
  },
  methods: {
    toMovie() {
      this.$router.push({ name: "home" });
    },
  },
});
</script>
<style scoped>
.test {
  width: 100%;
}
</style>
