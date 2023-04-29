import {
  CacheFirst,
  NetworkFirst,
  StaleWhileRevalidate,
} from "workbox-strategies";
import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";

import { registerRoute } from "workbox-routing";

// Mise en cache des fichiers lors de l'installation du service worker
precacheAndRoute(self.__WB_MANIFEST || []);
cleanupOutdatedCaches();
console.log("le service worker est vraiment ien initialiser");

// Exemple de stratégies de mise en cache pour différentes routes
registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst()
);

console.log("le service worker est vraiment ien initialiser");

self.addEventListener("message", (event) => {
  console.log("presque");
  if (event.data && event.data.type === "NEW_MESSAGE") {
    const { title, options } = event.data;
    console.log("Notification data before show:", { title, options });
    self.registration.showNotification(title, options);
    console.log("Notification data after show:", { title, options });
  }
});

registerRoute(
  ({ request }) =>
    request.destination === "script" || request.destination === "style",
  new StaleWhileRevalidate()
);

registerRoute(
  ({ request }) =>
    request.destination === "document" || request.destination === "navigate",
  new NetworkFirst()
);
