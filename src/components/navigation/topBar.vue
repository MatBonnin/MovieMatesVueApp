<template>
  <v-row
    class="w-100 mt-2 d-flex justify-space-between"
    :class="
      $route.name === 'movie' || $route.name === 'Profile' ? 'barAbsolute' : ''
    "
  >
    <v-col class="ml-4" cols="auto">
      <v-avatar color="black" size="50">
        <v-img
          cover
          src="../../../public/img/icons/android-launchericon-512-512.png"
        ></v-img>
      </v-avatar>
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

      <v-dialog v-if="!isAuthenticated" v-model="dialog" width="100%">
        <template v-slot:activator="{ props }">
          <v-btn color="vide" icon v-bind="props" elevation="0">
            <v-icon size="large" color="white">mdi-account</v-icon>
          </v-btn>
        </template>

        <login @connected="dialog = !dialog" />
      </v-dialog>
      <v-btn v-else color="vide" icon elevation="0">
        <v-badge dot color="success">
          <v-avatar @click="toProfile">
            <v-img
              :src="'http://localhost:5000/' + userInfo.profilePicture"
              :alt="userInfo.pseudo"
              cover
            ></v-img>
          </v-avatar>
        </v-badge>
      </v-btn>
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
import login from "../loginRegister/connexionDialog.vue";
import SearchDialog from "../searchDialog.vue";
import { mapActions, mapGetters, mapState } from "vuex";

export default defineComponent({
  name: "topBar",
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
  methods: {
    toProfile() {
      this.$router.push({
        name: "Profile",
        params: { profileUserId: this.userInfo.id },
      });
    },
  },
  computed: {
    ...mapGetters("user", ["isAuthenticated"]),
    ...mapState("user", ["userInfo"]),
  },
});
</script>
<style scoped>
.barAbsolute {
  position: absolute;
  z-index: 1;
}
</style>
