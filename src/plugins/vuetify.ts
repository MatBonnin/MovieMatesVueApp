// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import "@fortawesome/fontawesome-free/css/all.css";
import { aliases, fa } from "vuetify/iconsets/fa";
import { mdi } from "vuetify/iconsets/mdi";
// Vuetify
import { createVuetify, ThemeDefinition } from "vuetify";

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    // background: "#334395",
    background: "#FFFFFF",
    surface: "#FFFFFF",
    primary: "#000000",
    "primary-darken-1": "#3700B3",
    secondary: "#D90130",
    "secondary-darken-1": "#018786",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
    vide: "rgba(0,0,0,0)",
  },
};
const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: "#000000",
    surface: "#FFFFFF",
    primary: "#FFFFFF",
    "primary-darken-1": "#3700B3",
    secondary: "#D90130",
    "secondary-darken-1": "#018786",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
    vide: "rgba(0,0,0,0)",
  },
};

export default createVuetify({
  theme: {
    defaultTheme: "darkTheme",
    themes: {
      lightTheme,
      darkTheme,
    },
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      fa,
      mdi,
    },
  },
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
