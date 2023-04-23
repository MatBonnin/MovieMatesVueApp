<template>
  <div>
    <v-tabs v-model="tab" color="secondary" align-tabs="center">
      <v-tab :value="1">Relation</v-tab>
      <v-tab :value="2">Film</v-tab>
      <v-tab :value="3">Autres</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item :value="1">
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <div
                v-for="(request, index) in friendRequests"
                class="d-flex flex-column"
                :key="index"
              >
                <div>
                  <v-avatar
                    size="48"
                    class="mr-2"
                    @click="toProfile(request.id)"
                  >
                    <v-img
                      :src="apiUrl + request.profilePicture"
                      :alt="request.name"
                      cover
                    />
                  </v-avatar>
                  <span class="ml-4"
                    >{{ request.firstName }} vous a demandé en ami</span
                  >
                </div>
                <div class="align-self-center">
                  <v-btn
                    color="primary"
                    class="ml-2"
                    size="x-small"
                    @click="fetchAcceptFriendRequest(request.id)"
                    >Accepter</v-btn
                  >
                  <v-btn
                    color="error"
                    class="ml-2"
                    size="x-small"
                    @click="fetchRejectFriendRequest(request.id)"
                    >Refuser</v-btn
                  >
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-window-item>
    </v-window>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  // eslint-disable-next-line
  name: "Movie",
  mounted() {
    this.fetchGetFriendRequests();
  },
  data() {
    return { tab: null };
  },
  methods: {
    ...mapActions("gestionFriendship", [
      "fetchGetFriendRequests",
      "fetchAcceptFriendRequest",
      "fetchRejectFriendRequest",
    ]),
    toProfile(userId: number) {
      this.$router.push({
        name: "Profile",
        params: { profileUserId: userId },
      });
    },
  },
  computed: {
    ...mapState("gestionFriendship", ["friendRequests"]),
    apiUrl() {
      return process.env.API_BACK;
    },
  },
  components: {},
});
</script>
<style scoped></style>
