import "./registerServiceWorker";
import "@/utils/axiosConfig";
import "@/assets/app.css";

import App from "./App.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import chatAPI from "@/api/chat/chatAPI";
import { createApp } from "vue";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { loadFonts } from "./plugins/webfontloader";
import routes from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

/* import the fontawesome core */

/* import font awesome icon component */

/* import specific icons */

loadFonts();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then((registration) => {
        console.log("Service Worker enregistré avec succès:", registration);

        // Force la mise à jour du service worker
        registration.update();
      })
      .catch((error) => {
        console.error("Erreur d'enregistrement du Service Worker:", error);
      });
  });
}

// Initialisez le store
store.dispatch("user/initialize").then(async () => {
  if (store.getters["user/isAuthenticated"]) {
    // Si oui, récupérez les informations de l'utilisateur

    await store.dispatch("user/fetchGetUserInfo");
    chatAPI.onConnection(() => {
      console.log("connecter");
    });
    chatAPI.onNewMessageNotif(() => {
      console.log("notif");
    });
  }

  await Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
    } else {
      console.log("Notification permission denied.");
    }
  });
  const app = createApp(App);

  // Configurez Font Awesome
  library.add(faUserSecret);
  app.component("font-awesome-icon", FontAwesomeIcon);

  app.use(store);
  app.use(vuetify);
  app.use(routes);
  app.mount("#app");
});
