// js/app.js

import { addNewExhibition, displayExhibitions } from "./dom";
import { loadFromJSON } from "./load";

console.log("App script loaded");

// Global variabel for utstillinger
export const exhibitions = [];

// Hent utstillinger fra JSON-fil
async function loadExhibitions() {
  // Vis lasting-indikator
  document.getElementById("loading").style.display = "block";

  try {
    // Hent data med fetch
    const data = await loadFromJSON();
    exhibitions.push(...data);
    displayExhibitions();
  } catch (error) {
    console.error("Feil ved lasting av utstillinger:", error);
    document.getElementById("exhibitions-container").innerHTML =
      '<p class="error">Kunne ikke laste utstillinger. Prøv igjen senere.</p>';
  } finally {
    // Skjul lasting-indikator
    document.getElementById("loading").style.display = "none";
  }
}

// Initialiser applikasjonen
function init() {
  // Last utstillinger
  loadExhibitions();

  // Sett opp event listeners
  document
    .getElementById("add-exhibition-button")
    .addEventListener("click", addNewExhibition);
}

// Start appen når DOM er klar
init();
