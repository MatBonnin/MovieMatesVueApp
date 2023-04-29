// registerServiceWorker.ts

import { register } from "register-service-worker";

register(`${process.env.BASE_URL}service-worker.js`, {
  ready() {
    console.log(
      "App is being served from cache by a service worker.\n" +
        "For more details, visit https://goo.gl/AFskqB"
    );
  },

  registered(registration) {
    console.log("Service worker has been registered.");

    // Inject the custom code into the service worker
    if (registration.active) {
      // Inject the custom code into the service worker
      registration.active.postMessage({ type: "INJECT_CUSTOM_CODE" });
    }
  },
  cached() {
    console.log("Content has been cached for offline use.");
  },
  updatefound() {
    console.log("New content is downloading.");
  },
  updated() {
    console.log("New content is available; please refresh.");
  },
  offline() {
    console.log(
      "No internet connection found. App is running in offline mode."
    );
  },
  error(error) {
    console.error("Error during service worker registration:", error);
  },
});
