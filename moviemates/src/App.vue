<template>
  <v-app>
    <navBar />

    <v-main>
      <searchMovie />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import navBar from "./components/navBar.vue";
// import HelloWorld from "./components/HelloWorld.vue";
import searchMovie from "./views/search_movie.vue";

export default defineComponent({
  name: "App",

  components: {
    // HelloWorld,
    searchMovie,
    navBar,
  },
  data() {
    return {
      drawer: false,
      group: null,
      //
    };
  },
});
</script>
