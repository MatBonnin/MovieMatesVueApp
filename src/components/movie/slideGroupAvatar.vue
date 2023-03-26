<template>
  <div>
    <v-row class="rmMarge">
      <v-col cols="auto" class="rmMarge">
        <!-- <v-chip class="ml-2" color="orange"> Casting : </v-chip> -->
        <span class="ml-2 mt-4 titleDistrib">Distribution : </span>
      </v-col>
    </v-row>
    <v-row class="mt-0">
      <v-col class="pa-0" cols="12">
        <v-slide-group v-model="model" class="py-4" selected-class="bg-success">
          <v-slide-group-item
            v-for="cast in movieCredit.cast"
            :key="cast.id"
            v-slot="{}"
          >
            <div class="d-flex justify-center flex-column avatar">
              <v-avatar size="x-large" class="mr-1 resize" rounded="0">
                <v-img
                  class="pb-4 resizeImg v-img__img v-img__img--contain"
                  content-class="test"
                  :src="
                    'https://image.tmdb.org/t/p/original/' + cast.profile_path
                  "
                  :alt="cast.name"
                ></v-img>
              </v-avatar>
              <span class="test">{{ cast.name }}</span>
            </div>
          </v-slide-group-item>
        </v-slide-group>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  // eslint-disable-next-line

  name: "slideGroupeAvatar",
  created() {
    this.fetchGetCredit({
      type: this.$route.query.contentType,
      id: this.$route.query.id,
    });
  },
  data() {
    return {
      model: null,
    };
  },
  methods: {
    ...mapActions("gestionFilm", ["fetchGetCredit"]),
  },
  computed: {
    ...mapState("gestionFilm", ["movieCredit"]),
  },
  components: {},
});
</script>
<style scoped>
.titleDistrib {
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
}

.avatar {
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 1)
  );
}
.rmMarge {
  margin-bottom: 0;
  margin-top: 0;
  padding-bottom: 0;
  padding-top: 0;
}

.resize {
  width: calc(var(--v-avatar-height) + 30px);
  height: calc(var(--v-avatar-height) + 30px);
}

.resizeImg {
  width: 100%;
  height: 150%;
  max-height: none;
}
.test {
  font-size: 10px;
  max-width: 70px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
