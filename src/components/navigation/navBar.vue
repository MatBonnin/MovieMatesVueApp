<template>
  <v-bottom-navigation
    class="nav bg-background"
    v-model="value"
    color="primary"
  >
    <v-btn
      v-for="(icon, index) in icons"
      :key="index"
      :value="icon.value"
      @click="navigateTo(icon.routeName)"
    >
      <v-icon :color="icon.value === value ? 'white' : 'grey'">
        <i :class="icon.class"></i>
      </v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "navBar",
  components: {},
  data() {
    return {
      drawer: false,
      group: null,
      value: "recent",
      icons: [
        { value: "recent", class: "fa fa-house", routeName: "Home" },
        {
          value: "trending",
          class: "fa fa-film",
          routeName: "TrendingContent",
        },
        {
          value: "nearby",
          class: "fa-regular fa-message",
          routeName: "ChatList",
        },
        {
          value: "bell",
          class: "fa-regular fa-bell",
          routeName: "Notification",
        },
      ],
    };
  },
  methods: {
    navigateTo(routeName: any) {
      this.$router.push({ name: routeName });
    },
  },
  computed: {
    ...mapState("user", ["userInfo"]),
  },
});
</script>
<style scoped>
.nav {
  background-color: rgba(0, 255, 255, 0);
}
</style>
