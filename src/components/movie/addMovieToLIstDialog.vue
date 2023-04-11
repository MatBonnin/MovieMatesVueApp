<template>
  <v-dialog v-model="dialog" fullscreen>
    <v-card class="bg-background">
      <v-card-title class="custom-card-title">
        <v-icon class="icon-left" @click="dialog = !dialog"
          >mdi-arrow-left</v-icon
        >
        <span class="text-center">Ajouter à la liste</span>
      </v-card-title>
      <v-card-text>
        <v-btn
          rounded="xl"
          class="text-none font-weight-bold btnAddList"
          color="grey-lighten-3"
          variant="flat"
          @click="dialogAddList = true"
        >
          Nouvelle liste
        </v-btn>
        <v-list class="bg-background">
          <v-list-subheader>Mes listes</v-list-subheader>

          <v-list-item
            @click="addMovieToList(list.id)"
            v-for="(list, i) in lists"
            :key="i"
            :value="list"
          >
            <template v-slot:prepend>
              <div style="height: 70px; width: 70px">
                <v-img
                  cover
                  src="http://localhost:5000/uploads/playlist.png"
                ></v-img>
              </div>
            </template>

            <v-list-item-title class="ml-6">{{ list.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
    <AddListDialog
      :dialogAddList="dialogAddList"
      :imdbId="imdbId"
      @updtDialog="dialogAddList = !dialogAddList"
    />
  </v-dialog>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import AddListDialog from "./addListDialog.vue";

export default defineComponent({
  props: {
    dialogAddMovieToList: { type: Boolean, required: true },
    imdbId: { type: String, required: true },
  },
  name: "addMovieToListDialog",
  created() {
    this.fetchGetAllLists();
  },
  data() {
    return {
      dialogAddList: false,
    };
  },
  computed: {
    dialog: {
      get() {
        return this.dialogAddMovieToList;
      },
      set(val: boolean) {
        this.$emit("updtDialog", val);
      },
    },
    ...mapState("gestionListMovie", ["lists"]),
  },
  methods: {
    ...mapActions("gestionListMovie", ["fetchGetAllLists"]),
    ...mapActions("gestionMovieListMovie", ["fetchCreateMovielistmovie"]),
    addMovieToList(listId: number) {
      this.fetchCreateMovielistmovie({
        idMovie: this.imdbId,
        idListMovie: listId,
      });
      this.dialog = false;
    },
  },
  components: { AddListDialog },
});
</script>
<style scoped>
.btnAddList {
  display: block;
  margin: auto;
}

.custom-card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon-left {
  position: absolute;
  left: 10px;
  top: 10px;
}

.text-center {
  flex: 10;
  text-align: center;
}
</style>
