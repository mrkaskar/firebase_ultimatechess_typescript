if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((reg) => console.log("service worker registered", reg))
    .catch((err) => console.log("service worker not registered"));
}

let deferredPrompt;

let install = document.getElementById("installapp");
let installbtn = document.getElementById("yes");

installbtn.addEventListener("click", async () => {
  hideInstallPromotion();
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  deferredPrompt = null;
});

function showInstallPromotion() {
  install.style.display = "flex";
}

function hideInstallPromotion() {
  install.style.display = "none";
}

window.addEventListener("appinstalled", () => {
  hideInstallPromotion();
  deferredPrompt = null;
});

window.addEventListener("beforeinstallprompt", async (e) => {
  e.preventDefault();
  deferredPrompt = e;

  if ("getInstalledRelatedApps" in navigator) {
    let apps = await navigator.getInstalledRelatedApps();
    if (apps.length > 0) {
      return;
    }
  }
  // Update UI notify the user they can install the PWA
  showInstallPromotion();
});
