<template>
  <v-navigation-drawer v-model="drawer" style="height: 100vh" temporary>
    <v-list-item
      prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
      title="John Leider"
    ></v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Home"
        value="home"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-forum"
        title="About"
        value="about"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-row
    class="w-100 mt-2 d-flex justify-space-between"
    style="position: absolute; z-index: 1"
  >
    <v-col class="ml-4" cols="auto">
      <v-icon @click.stop="drawer = !drawer" size="50">mdi-menu</v-icon>
    </v-col>
    <v-col cols="auto">
      <v-btn
        color="vide"
        elevation="0"
        icon
        @click="dialogSearch = !dialogSearch"
      >
        <v-icon color="white" size="large">mdi-magnify</v-icon>
      </v-btn>

      <v-dialog v-model="dialog" width="100%">
        <template v-slot:activator="{ props }">
          <v-btn color="vide" icon v-bind="props" elevation="0">
            <v-icon size="large" color="white">mdi-account</v-icon>
          </v-btn>
        </template>

        <login @connected="dialog = !dialog" />
      </v-dialog>
    </v-col>
  </v-row>
  <search-dialog
    @updtDialog="dialogSearch = !dialogSearch"
    :dialogSearch="dialogSearch"
  />
</template>
<script lang="ts">
import { defineComponent } from "vue";
//import navBar from "./components/navBar.vue";
// import HelloWorld from "./components/HelloWorld.vue";
// import searchMovie from "./views/search_movie.vue";
import login from "../../views/Login.vue";
import SearchDialog from "../searchDialog.vue";

export default defineComponent({
  name: "App",
  components: {
    // HelloWorld,
    // searchMovie,

    login,
    SearchDialog,
  },
  data() {
    return {
      drawer: false,

      dialog: false,
      dialogSearch: false,
      //
    };
  },
});
</script>
