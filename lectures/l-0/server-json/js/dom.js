// js/dom.js

import { formatDate, generateId } from "./utils";

console.log("Script loading dom.js");

// Vis utstillinger i DOM
export function displayExhibitions(exhibitions = []) {
  const container = document.getElementById("exhibitions-container");

  // Sjekk om vi har utstillinger
  if (exhibitions.length === 0) {
    container.innerHTML = "<p>Ingen utstillinger funnet</p>";
    return;
  }

  // Tøm container så vi kan fylle den på nytt
  // Forhindre duplisering
  container.innerHTML = "";

  for (const exhibition of exhibitions) {
    const exhibitionElement = createExhibitionElement(exhibition);
    container.appendChild(exhibitionElement);
  }
}

// Lag HTML-element for en utstilling
// Bruker default-verdier for å unngå feil hvis data mangler
function createExhibitionElement(exhibition = {}) {
  const article = document.createElement("article");
  article.className = "exhibition-card";
  article.innerHTML = `
        <h3>${exhibition.title}</h3>
        <p class="artist">Kunstner: ${exhibition.artist}</p>
        <p class="date">Dato: ${formatDate(exhibition.date)}</p>
        <p class="status status-${exhibition.status.toLowerCase()}">
          ${exhibition.status}
        </p>
        <p class="description">${exhibition.description}</p>
    `;
  return article;
}
