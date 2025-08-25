// js/utils.js

// Formatér dato til norsk format
export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("no-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Genererer en unik ID basert på tid og tilfeldig tall
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
