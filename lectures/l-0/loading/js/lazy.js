// js/lazy.js

console.log("Script loading lazy.js");

// Laster inn en modul kun når brukeren trenger den
async function loadAdvancedFeatures() {
  // Dynamisk import - lastes kun ved behov
  const module = await import("./advanced-features.js");
  module.initializeFeatures();
}

// Trigger lazy loading ved behov
document.getElementById("advanced-button")?.addEventListener("click", () => {
  loadAdvancedFeatures();
});
