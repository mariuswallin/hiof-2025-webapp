// js/app.js

import { displayExhibitions } from "./dom";
import { fetchExhibitions } from "./load";

console.log("App script loaded");

// Hent utstillinger fra JSON-fil
async function loadExhibitions() {
  const data = await fetchExhibitions();
  displayExhibitions(data);
}

loadExhibitions();
