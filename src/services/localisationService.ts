// src/services/geolocationService.ts

export async function getLocationPermission() {
  try {
    const status = await navigator.permissions.query({ name: "geolocation" });
    if (status.state === "granted") {
      return true;
    } else if (status.state === "prompt") {
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          () => resolve(true),
          () => resolve(false)
        );
      });
    }
  } catch (error) {
    console.error("Erreur lors de la demande de permission :", error);
  }
  return false;
}

export function getCurrentPosition(callback: any, errorCallback: any) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(callback, errorCallback);
  } else {
    console.error("La géolocalisation n'est pas disponible sur ce navigateur.");
  }
}
