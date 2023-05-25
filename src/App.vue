<template>
  <v-app class="test">
    <v-main class="bg-background d-flex flex-column">
      <!-- Navigation du haut  -->
      <top-bar v-if="$route.name !== 'Chat'" />
      <!-- page charger -->
      <router-view />
      <!-- Navigation du bas  -->
      <navBar
        v-if="$route.name !== 'Chat' && isAuthenticated === true"
        class="mt-auto"
      />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import navBar from "@/components/navigation/navBar.vue";
import TopBar from "./components/navigation/topBar.vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "App",
  components: {
    navBar,
    TopBar,
  },
  data() {
    return {
      salut: "test",
      test: false,
    };
  },
  methods: {},
  computed: {
    ...mapGetters("user", ["isAuthenticated"]),
  },
});
</script>
