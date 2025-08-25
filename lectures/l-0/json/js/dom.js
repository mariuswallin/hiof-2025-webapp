// js/dom.js

// Henter inn listen med utstillinger
import { exhibitions } from "./app";
import { formatDate, generateId } from "./utils";

console.log("Script loading dom.js");

// Vis utstillinger i DOM
export function displayExhibitions() {
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
        <button data-id='${exhibition.id}' onclick="window.HIOF.toggleStatus('${
    exhibition.id
  }')">Endre status</button>
    `;
  return article;
}

// Toggle status mellom Planlagt og Aktiv
export function toggleStatus(id) {
  const exhibition = exhibitions.find((ex) => ex.id === id);
  console.log(exhibitions, id);

  // Hvis utstillingen ikke finnes, logg en feilmelding
  if (!exhibition) {
    console.error(`Ingen utstilling funnet med ID: ${id}`);
    return;
  }

  // Oppdater status.
  // Endrer objektet direkte, som kan lede til uventede feil i større applikasjoner.
  exhibition.status = exhibition.status === "Planlagt" ? "Aktiv" : "Planlagt";

  // Trigger oppdatering av visning
  displayExhibitions();

  // I en ekte app ville vi sendt dette til serveren
  console.log(`Status endret for utstilling ${id}`);
}

// Legg til ny utstilling
export function addNewExhibition() {
  // Hent input-feltene
  const titleInput = document.getElementById("new-exhibition-title");
  const artistInput = document.getElementById("new-exhibition-artist");

  if (!titleInput.value || !artistInput.value) {
    console.error("Tittel og kunstner må fylles ut");
    return;
  }

  const title = titleInput.value.trim();
  const artist = artistInput.value.trim();

  const newExhibition = {
    id: generateId(), // Generer en unik ID
    title, // Kan sette verdien direkte får da (title: `Verdien til title`)
    artist,
    date: new Date().toISOString().split("T")[0],
    status: "Planlagt",
    description: "Ny utstilling",
  };

  // Legg til i listen vår
  exhibitions.push(newExhibition);

  // Oppdater visning
  displayExhibitions();

  // Tøm skjema
  titleInput.value = "";
  artistInput.value = "";
}

// Legger til funksjonen i globalt scope
// slik at den kan kalles fra HTML-knappen
window.HIOF = {
  toggleStatus,
};
