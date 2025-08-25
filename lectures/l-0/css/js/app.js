// js/app.js

import { loadFromJSON } from "./load";

console.log("App script loaded");

await loadFromJSON();

// Hent referanse til knappen
const addButton = document.getElementById("add-exhibition-button");

// Endre stil når bruker klikker
addButton.addEventListener("click", function (event) {
  // Forhindre standard handling (f.eks. form sending)
  event.preventDefault();

  const element = event.target;
  // Midlertidig visuell tilbakemelding
  element.style.backgroundColor = "#27ae60";
  element.textContent = "Lagt til!";

  // Tilbakestill etter 2 sekunder
  setTimeout(() => {
    element.style.backgroundColor = "";
    element.textContent = "Legg til utstilling";
  }, 2000);
});
