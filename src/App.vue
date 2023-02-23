<template>
  <v-app class="test">
    <v-main>
      <!-- Navigation du haut  -->
      <top-bar />
      <!-- page charger -->
      <router-view />
      <!-- Navigation du bas  -->
      <navBar />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import navBar from "@/components/navigation/navBar.vue";
import TopBar from "./components/navigation/topBar.vue";

export default defineComponent({
  name: "App",
  components: {
    navBar,
    TopBar,
  },
  data() {
    return {
      //
    };
  },
  methods: {},
});
</script>
