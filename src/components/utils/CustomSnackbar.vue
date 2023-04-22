<template>
  <v-snackbar
    :timeout="timeout"
    :color="color"
    :value="value"
    @input="updateValue"
  >
    <v-icon v-if="icon" left>{{ icon }}</v-icon>
    {{ message }}
  </v-snackbar>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "CustomSnackbar",
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "info",
    },
    icon: {
      type: String,
      default: null,
    },
    timeout: {
      type: Number,
      default: 2000,
    },
  },
  methods: {
    updateValue(newValue) {
      this.$emit("update:modelValue", newValue);
    },
  },
});
</script>
