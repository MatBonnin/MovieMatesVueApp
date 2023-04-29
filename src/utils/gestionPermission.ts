export function requestNotificationPermission() {
  if ("Notification" in window) {
    const permission = localStorage.getItem("notificationPermission");

    if (permission === null) {
      Notification.requestPermission()
        .then((newPermission) => {
          localStorage.setItem("notificationPermission", newPermission);
          if (newPermission === "granted") {
            console.log("Notification permission granted.");
          } else {
            console.log("Notification permission denied.");
          }
        })
        .catch((error) => {
          console.error("Error requesting notification permission:", error);
        });
    } else {
      console.log("Notification permission already set:", permission);
    }
  } else {
    console.log("Notifications not supported in this browser.");
  }
}
