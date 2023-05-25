<template>
  <div class="d-flex flex-column">
    <div class="align-self-center"><span>Commentaires</span></div>
    <div class="comments"></div>
    <div class="">
      <v-text-field
        v-model="comment"
        variant="outlined"
        density="compact"
        append-inner-icon="mdi-comment"
        @click:append-inner="addComment"
      ></v-text-field>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  props: {
    imdbId: { type: String, required: true },
  },
  name: "comment",
  created() {
    this.fetchGetCommentsByMovieId({
      limit: 100,
      offset: 0,
      idImdbMovie: this.imdbId,
    });
  },

  data() {
    return {
      dialogAddList: false,
      comment: "",
    };
  },
  computed: {
    ...mapState("gestionComment", ["comments"]),
  },
  methods: {
    ...mapActions("gestionComment", [
      "fetchCreateComment",
      "fetchGetCommentsByMovieId",
    ]),
    ...mapActions("gestionMovieListMovie", ["fetchCreateMovielistmovie"]),
    addComment() {
      const data = { idImdbMovie: this.imdbId, text: this.comment };
      this.fetchCreateComment(data);
    },
  },
  components: {},
});
</script>
<style scoped></style>
