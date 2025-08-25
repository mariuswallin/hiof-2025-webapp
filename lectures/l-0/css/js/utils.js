// js/utils.js

// Formatér dato til norsk format
export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("no-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
