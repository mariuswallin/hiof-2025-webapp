// js/dom.js

import { Storage } from "./storage";

console.log("Script loading dom.js");

const getAllExhibitionsFromDOM = () => {
  const exhibitionList = document.getElementById("exhibition-list");
  const exhibitions = [];

  // Gå gjennom alle <li>-elementer i listen
  for (const li of exhibitionList.children) {
    // Legg til tekstinnholdet i utstillingslisten
    exhibitions.push(li.textContent);
  }

  return exhibitions;
};

export function toggleStatus(event) {
  // Sjekk at klikket er på et <li>-element
  if (event.target.tagName === "LI") {
    // Hent ut tekstinnholdet og del det opp
    const exhibitionText = event.target.textContent;
    const parts = exhibitionText.split(" - Status: ");

    // Toggle mellom statuser
    const currentStatus = parts[1];
    // Definer ny status basert på den nåværende
    const newStatus = currentStatus === "Planlagt" ? "Aktiv" : "Planlagt";

    // Oppdater tekstinnholdet med ny status
    event.target.textContent = `${parts[0]} - Status: ${newStatus}`;
  }
}

export function createExhibition() {
  const exhibitionInput = document.getElementById("new-exhibition-input");
  const exhibitionText = exhibitionInput.value;

  // Sjekk at brukeren faktisk skrev noe
  if (!exhibitionText) return;

  // Opprett et nytt <li>-element for utstillingen
  const newExhibition = document.createElement("li");
  // Sett innholdet i det nye elementet med template literal
  newExhibition.textContent = `${exhibitionText} - Status: Planlagt`;

  // Legg det nye elementet til listen
  document.getElementById("exhibition-list").appendChild(newExhibition);

  // Tømmer input-feltet for neste utstilling
  exhibitionInput.value = "";
  Storage.save(getAllExhibitionsFromDOM());
}

// Exporter funksjonen brukt for å lage utstillinger
export function renderExhibitions(exhibitions = []) {
  // Henter ut listen der utstillingene skal vises
  const exhibitionList = document.getElementById("exhibition-list");
  exhibitionList.innerHTML = ""; // Tømmer listen før rendering

  // Går gjennom utstillingene og lager et <li> for hver
  for (const exhibition of exhibitions) {
    const li = document.createElement("li");
    // Setter innholdet i <li> med utstillingens navn
    li.textContent = exhibition;
    exhibitionList.appendChild(li);
  }
}
