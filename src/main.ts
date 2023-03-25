import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

import routes from "./router";
import "./registerServiceWorker";
import "@/utils/axiosConfig";
import "@/assets/app.css";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

loadFonts();

// Initialisez le store
store.dispatch("user/initialize").then(() => {
  const app = createApp(App);

  // Configurez Font Awesome
  library.add(faUserSecret);
  app.component("font-awesome-icon", FontAwesomeIcon);

  app.use(store);
  app.use(vuetify);
  app.use(routes);
  app.mount("#app");
});
