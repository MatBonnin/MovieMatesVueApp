<template>
  <v-row class="w-100">
    <v-col cols="12">
      <v-row class="rmMarge">
        <v-col class="rmMarge" cols="auto">
          <v-chip class="mt-3 ml-6" color="orange" variant="outlined">
            {{ titre }}
          </v-chip></v-col
        >
      </v-row>
      <v-row class="rmMarge">
        <v-col class="rmMarge" cols="12">
          <v-sheet class="mx-auto bg-background" max-width="800">
            <v-slide-group
              v-model="model"
              class="pa-4"
              selected-class="bg-success"
            >
              <v-slide-group-item
                v-for="film in content.results"
                :key="film.backdrop_path"
                v-slot="{ toggle, selectedClass }"
              >
                <v-card
                  :class="['ma-4', selectedClass]"
                  height="120"
                  width="80"
                  @click="toggle"
                >
                  <v-img
                    class="bg-white"
                    width="auto"
                    height="120"
                    :aspect-ratio="1"
                    :src="'https://image.tmdb.org/t/p/w500/' + film.poster_path"
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
export default {
  props: {
    content: { type: Object, required: true },
    titre: { type: String, required: true },
  },
  setup() {
    const model = null;
    return {
      model,
    };
  },
};
</script>
<style scoped>
.rmMarge {
  margin-bottom: 0;
  margin-top: 0;
  padding-bottom: 0;
  padding-top: 0;
}
</style>
