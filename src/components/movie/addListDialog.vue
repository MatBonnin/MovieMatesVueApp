<template>
  <v-dialog v-model="dialog" fullscreen>
    <div class="bg-background display-flex dlex-column justify-center">
      <div class="align-center" style="text-align: center; margin-top: 50%">
        <span style="margin: auto" class="font-weight-bold mb-4 text-h5"
          >Choisissez un titre de liste</span
        >
        <v-text-field
          v-model="listTitle"
          class="text-center"
          style="text-align: center"
        ></v-text-field>
        <div class="d-flex flex-row justify-space-around">
          <v-btn
            rounded="xl"
            class="text-none font-weight-bold btnAddList"
            color="grey-lighten-3"
            variant="outlined"
            @click="dialog = !dialog"
          >
            Annuler
          </v-btn>
          <v-btn
            rounded="xl"
            class="text-none font-weight-bold btnAddList"
            color="secondary"
            variant="flat"
            @click="
              fetchCreateList({ name: listTitle });
              dialog = !dialog;
            "
          >
            Ajouter
          </v-btn>
        </div>
      </div>
    </div>
  </v-dialog>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  props: {
    dialogAddList: { type: Boolean, required: true },
    imdbId: { type: String, required: true },
  },
  name: "addListDialog",
  components: {},
  data() {
    return {
      listTitle: "",
    };
  },
  computed: {
    dialog: {
      get() {
        return this.dialogAddList;
      },
      set(val: boolean) {
        this.$emit("updtDialog", val);
      },
    },
  },
  methods: {
    ...mapActions("gestionListMovie", ["fetchCreateList"]),
  },
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
  flex: 1;
}

.text-center {
  flex: 10;
  text-align: center;
}
</style>
