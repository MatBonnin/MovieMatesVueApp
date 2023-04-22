<template>
  <v-row class="w-100">
    <v-col cols="12">
      <v-row class="rmMarge">
        <v-col class="rmMarge" cols="12">
          <span
            class="mt-3 ml-8 font-weight-bold text-subtitle-1"
            color="primary"
            variant="outlined"
          >
            {{ titre }}
          </span>
          <v-sheet class="mx-auto bg-background" max-width="800">
            <v-slide-group v-model="model">
              <v-slide-group-item
                v-for="film in content.results"
                :key="film.backdrop_path"
                v-slot="{ selectedClass }"
              >
                <v-card
                  :class="['ma-1', selectedClass, 'shadow']"
                  height="120"
                  width="80"
                  @click="toMovie(film.id)"
                >
                  <v-img
                    class="bg-white"
                    width="auto"
                    height="180"
                    :aspect-ratio="1"
                    :src="
                      'https://image.tmdb.org/t/p/original/' + film.poster_path
                    "
                  ></v-img>
                </v-card>
              </v-slide-group-item>
            </v-slide-group>
          </v-sheet>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  // eslint-disable-next-line
  props: {
    content: { type: Object, required: true },
    titre: { type: String, required: true },
    contentType: { type: String, required: true },
  },
  name: "slideGroupeContent",

  data() {
    return {
      model: null,
    };
  },
  methods: {
    toMovie(id: number) {
      this.$router.push({
        name: "movie",
        query: { id: id.toString(), contentType: this.contentType },
      });
    },
  },
  computed: {},
  components: {},
});
// export default {
//   props: {
//     content: { type: Object, required: true },
//     titre: { type: String, required: true },
//   },
//   setup() {
//     const model = null;
//     const toMovie = () => {
//
//       this.$router.push("/Account");
//     };
//     return {
//       model,
//       toMovie,
//     };
//   },
// };
</script>
<style scoped>
.shadow {
  box-shadow: 2px 2px white;
}
.rmMarge {
  margin-bottom: 0;
  margin-top: 0;
  padding: 0px;
}
</style>
