<template>
  <div class="h-100">
    <loading-spinner v-if="isLoading"></loading-spinner>
    <div v-else>
      <span class="mt-3 ml-8" color="primary" variant="outlined">
        MovieMates près de chez vous :
      </span>
      <v-slide-group v-model="model" class="py-4" selected-class="bg-success">
        <v-slide-group-item
          v-for="user in nearbyUsers"
          :key="user.id"
          v-slot="{}"
        >
          <div class="d-flex justify-center flex-column avatar">
            <v-avatar size="x-large" class="mr-1 resize" rounded="1">
              <v-img
                class="pb-4 resizeImg v-img__img v-img__img--contain"
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
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  // eslint-disable-next-line
  name: "Home",
  async created() {
    await this.fetchFindNearbyUsers(1000);
    await this.fetchRandomLikedFriendsMovies();
    this.isLoading = false;
  },

  data() {
    return {
      urlBack: process.env.API_BACK,
      model: null,
    };
  },
  methods: {
    ...mapActions("gestionLocalisation", ["fetchFindNearbyUsers"]),
    ...mapActions("gestionMovie", ["fetchRandomLikedFriendsMovies"]),
  },
  computed: {
    ...mapState("gestionLocalisation", ["nearbyUsers"]),
    ...mapState("gestionMovie", ["likedFriendsMovies"]),
  },
  components: {},
});
</script>
<style scoped></style>
