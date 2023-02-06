<template>
  <v-app-bar dense>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-toolbar-title>MovieMates</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon @click="routeAccount">mdi-account</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-menu left bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="n in 5" :key="n" @click="() => {}">
          <v-list-item-title>Option {{ n }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import HelloWorld from "./components/HelloWorld.vue";

export default defineComponent({
  name: "navBar",
  components: {
    // HelloWorld,
  },
  data() {
    return {
      drawer: false,
      group: null,
      //
    };
  },
  methods: {
    routeAccount() {
      this.$router.push("/Account");
    },
  },
});
</script>
