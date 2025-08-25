import { createExhibition, renderExhibitions, toggleStatus } from "./dom";
import { Storage } from "./storage";

// Venter på at DOM er klar (garantert med defer)
const exhibitions = Storage.load();

// Initialiserer applikasjonen
function initApp() {
  console.log("App initializing...");
  // Alle DOM-elementer er nå tilgjengelige
  const addButton = document.getElementById("add-exhibition-button");
  const exhibitionList = document.getElementById("exhibition-list");

  // Legger til event listeners
  addButton.addEventListener("click", createExhibition);
  exhibitionList.addEventListener("click", (event) => toggleStatus(event));

  // Viser eksisterende utstillinger
  renderExhibitions(exhibitions);
}

// Siden vi bruker defer, kan vi trygt kalle initApp
initApp();
