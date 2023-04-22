<template>
  <div class="spinner-container">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </div>
</template>

<script>
export default {
  name: "LoadingSpinner",
};
</script>

<style scoped>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
