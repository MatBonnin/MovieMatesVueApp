<template>
  <v-app class="test">
    <v-main>
      <navBar />
      <router-view />

      <v-bottom-navigation v-model="value" color="orange">
        <v-btn value="recent">
          <span>Recent</span>

          <v-icon>mdi-history</v-icon>
        </v-btn>

        <v-btn value="favorites">
          <span>Favorites</span>

          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn value="nearby">
          <span>Nearby</span>

          <v-icon>mdi-map-marker</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import navBar from "./components/navBar.vue";
// import HelloWorld from "./components/HelloWorld.vue";
// import searchMovie from "./views/search_movie.vue";
import login from "./views/Login.vue";

export default defineComponent({
  name: "App",
  components: {
    // HelloWorld,
    // searchMovie,
    navBar,
  },
  data() {
    return {
      drawer: false,
      group: null,
      value: "recent",
      //
    };
  },
});
</script>
<style scoped>
.test {
  width: 100%;
}
</style>
