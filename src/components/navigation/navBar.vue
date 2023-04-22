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
      @click="
        navigateTo(
          icon.routeName,
          icon.routeName === 'Profile' ? userInfo.id : null
        )
      "
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
        { value: "recent", class: "fa fa-house", routeName: "home" },
        {
          value: "trending",
          class: "fa fa-film",
          routeName: "TrendingContent",
        },
        {
          value: "nearby",
          class: "fa-regular fa-message",
          routeName: "nearby",
        },
        { value: "account", class: "fa-regular fa-user", routeName: "Profile" },
      ],
    };
  },
  methods: {
    navigateTo(routeName: any, userId: number | null = null) {
      if (routeName === "Profile" && userId) {
        this.$router.push({
          name: routeName,
          params: { profileUserId: userId },
        });
      } else {
        this.$router.push({ name: routeName });
      }
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
