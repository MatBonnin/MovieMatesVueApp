<template>
  <v-bottom-navigation v-model="value" color="primary">
    <v-btn value="recent">
      <span>Movie</span>

      <v-icon @click="toMovie">mdi-movie</v-icon>
    </v-btn>

    <v-btn value="favorites">
      <span>Favorites</span>

      <v-icon>mdi-heart</v-icon>
    </v-btn>
    <v-btn>
      <v-img
        :width="40"
        cover
        src="../../../public/img/icons/movieMatesIcon.png"
      ></v-img>
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import HelloWorld from "./components/HelloWorld.vue";

export default defineComponent({
  name: "navBar",
  components: {
    // HelloWorld,
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
