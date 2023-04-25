<template>
  <div class="h-100"></div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  // eslint-disable-next-line
  name: "ChatList",
  async created() {
    await this.fetchGetUserChatRooms();
  },

  data() {
    return {};
  },
  methods: {
    ...mapActions("gestionChat", ["fetchGetUserChatRooms"]),
  },
  computed: {
    ...mapState("gestionChat", ["chatRooms"]),
  },
  components: {},
});
</script>
<style scoped></style>
