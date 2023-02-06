<template>
  <div class="h-100">
    <v-row class="w-100 h-100" justify="center">
      <v-col class="mt-auto mb-auto" cols="8">
        <v-card>
          <v-card-title>Profile</v-card-title>
          <v-card-text> </v-card-text>
          <v-card-actions> </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { mapState, mapActions } from "vuex";
export default defineComponent({
  // eslint-disable-next-line
  name: "Profile",
  created() {
    this.fetchGetUserInfo();
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("user", ["fetchGetUserInfo"]),
  },
  computed: {
    ...mapState("user", ["token"]),
  },
  components: {},
});
</script>
<style scoped></style>
