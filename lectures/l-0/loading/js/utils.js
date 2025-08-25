// js/utils.js

console.log("Script loading utils.js");

// Hjelpefunksjon for å lage unike ID-er
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Formaterer dato på norsk
export function formatDate(date) {
  return new Date(date).toLocaleDateString("no-NO");
}
