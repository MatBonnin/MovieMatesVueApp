<template>
  <div class="d-flex flex-column">
    <div class="d-flex flex-column">
      <v-sheet
        :style="{
          'background-image': 'url(\'http://localhost:5000/uploads/back.jpg\')',
          'background-size': 'cover',
        }"
        :elevation="0"
        class="mx-auto d-flex flex-column justify-end"
        height="200"
        width="100%"
      >
        <div class="gradient d-flex justify-center">
          <v-avatar color="grey" class="mt-5" size="130">
            <v-img cover src="../../images/profile/photoProfile.jpg"></v-img>
          </v-avatar>
        </div>
      </v-sheet>

      <span class="text-h4 pseudo" max>{{ userInfo.pseudo }}</span>
      <span class="text-subtitle-1 text-grey align-self-center">
        Grenoble,Isère
      </span>
    </div>
    <div class="d-flex justify-center">
      <!-- Icon avec compteur -->
      <v-chip
        class="ma-2"
        color="pink"
        text-color="white"
        append-icon="mdi-heart-outline"
      >
        25 Films
      </v-chip>
      <v-chip
        class="ma-2"
        color="blue"
        text-color="white"
        append-icon="mdi-filmstrip-box-multiple"
      >
        3 MovieLists
      </v-chip>
      <v-chip
        class="ma-2"
        color="success"
        text-color="white"
        append-icon="mdi-account-multiple"
      >
        120 Amis
      </v-chip>
      <!-- <div class="d-flex flex-column justify-center">
        <v-icon color="grey">mdi-heart-outline</v-icon>
        <span color="text-grey">Film</span>
        <span color="text-grey">25</span>
      </div> -->
    </div>
    <div>
      <!-- Bio -->
    </div>
    <div>
      <!-- Idée: mes genres préféré -->
    </div>
    <div>
      <!-- Mes Amis -->
    </div>

    <div class="ml-4">
      <p>Mes listes</p>
      <v-slide-group v-model="slideGroupModel" selected-class="bg-success">
        <v-slide-group-item v-for="list in lists" :key="list.id" v-slot="{}">
          <div class="mr-4 d-flex justify-center flex-column">
            <v-img
              class="imgPlaylist"
              content-class="imgPlaylist"
              :src="
                list.image !== null
                  ? `http://localhost:5000/uploads/${list.image}`
                  : 'http://localhost:5000/uploads/playlist.png'
              "
              :alt="list.name"
            ></v-img>

            <span class="listName">{{ list.name }}</span>
          </div>
        </v-slide-group-item>
      </v-slide-group>
    </div>
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
    this.fetchGetAllLists();
  },
  data() {
    return {
      slideGroupModel: null,
    };
  },
  methods: {
    ...mapActions("gestionListMovie", ["fetchGetAllLists"]),
    ...mapActions("user", ["fetchGetUserInfo"]),
  },
  computed: {
    ...mapState("gestionListMovie", ["lists"]),
    ...mapState("user", ["userInfo"]),
  },
  components: {},
});
</script>
<style scoped>
.gradient {
  height: 100px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(0, 0, 0, 0.9)
  );
}

.pseudoRow {
  margin-top: 10%;
}

.imgPlaylist {
  height: 80px;
  width: 80px;
}

.listName {
  text-align: center;
  max-width: 70px;
  font-size: 12px;
}

.pseudo {
  max-width: 200px;
  margin: auto;
  padding-top: 60px;
}
</style>
