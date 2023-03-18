import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

import routes from "./router";
import "./registerServiceWorker";
import "@/utils/axiosConfig";

loadFonts();

// Initialisez le store
store.dispatch("user/initialize").then(() => {
  const app = createApp(App);
  app.use(store);
  app.use(vuetify);
  app.use(routes);
  app.mount("#app");
});
