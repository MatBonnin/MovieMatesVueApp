import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
// import * as dotenv from "dotenv";

// dotenv.config();
loadFonts();

createApp(App).use(store).use(vuetify).mount("#app");
