<template>
  <div class="h-100">
    <v-row class="w-100 h-100" justify="center">
      <v-col class="mt-auto mb-auto" cols="10">
        <v-card class="bg-background">
          <v-tabs v-model="tab" color="secondary">
            <v-tab value="one">Connexion</v-tab>
            <v-tab value="two">Inscription</v-tab>
          </v-tabs>
          <v-card-text>
            <v-window v-model="tab">
              <v-window-item value="one">
                <login @connected="redirect()" />
              </v-window-item>

              <v-window-item value="two">
                <register @connected="redirect()" />
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapMutations } from "vuex";
import login from "./windows/login.vue";
import register from "./windows/register.vue";

export default defineComponent({
  // eslint-disable-next-line
  name: "connexionDialog",
  data() {
    return {
      tab: null,
    };
  },
  methods: {
    redirect() {
      this.$router.push({ name: "home" });
    },
  },
  computed: {},
  components: { login, register },
});
</script>
<style scoped></style>
