import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

import routes from "./router";
import "./registerServiceWorker";

loadFonts();

createApp(App).use(store).use(vuetify).use(routes).mount("#app");
