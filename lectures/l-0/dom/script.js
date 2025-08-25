// script.js

// Finn knappen og legg til en lytter for klikk-hendelser
document
  .getElementById("add-exhibition-button")
  .addEventListener("click", function () {
    // Hent input-feltet og verdien
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
  });

// Legg til lytter på hele listen (event delegation)
document
  .getElementById("exhibition-list")
  .addEventListener("click", function (event) {
    // Sjekk om det var et LI-element som ble klikket
    if (event.target.tagName === "LI") {
      // Hent ut tekstinnholdet og del det opp
      const exhibitionText = event.target.textContent;
      const parts = exhibitionText.split(" - Status: ");

      // Toggle mellom statuser
      const currentStatus = parts[1];
      // Definer ny status basert på den nåværende
      // Hvis statusen er "Planlagt", endre den til "Aktiv", og vice versa
      const newStatus = currentStatus === "Planlagt" ? "Aktiv" : "Planlagt";

      // Oppdater tekstinnholdet med ny status
      event.target.textContent = parts[0] + " - Status: " + newStatus;
    }
  });

// Funksjon for å lagre utstillinger i LocalStorage
function saveExhibitions() {
  // Lager en tom array for å lagre utstillingene
  const exhibitions = [];

  // Finn alle li-elementer i listen
  // Bruker querySelectorAll for å hente alle <li> elementer i listen
  const exhibitionLiElements = document.querySelectorAll("#exhibition-list li");

  // Samle tekstinnholdet fra hvert element
  for (const element of exhibitionLiElements) {
    exhibitions.push(element.textContent);
  }

  // Lagre som JSON-streng i LocalStorage
  // Bruker JSON.stringify for å konvertere arrayen til en streng
  localStorage.setItem("exhibitions", JSON.stringify(exhibitions));
}

// Funksjon for å laste utstillinger fra LocalStorage
function loadExhibitions() {
  // Hent data fra localStorage (eller bruk tom array som default)
  const exhibitions = JSON.parse(localStorage.getItem("exhibitions")) || [];

  // For debugging
  console.log("Lastet utstillinger:", exhibitions);

  // Gjenskap hvert element i DOM
  for (const exhibition of exhibitions) {
    const newExhibition = document.createElement("li");
    newExhibition.textContent = exhibition;
    document.getElementById("exhibition-list").appendChild(newExhibition);
  }
}

// Lagre hver gang noe endres
document
  .getElementById("add-exhibition-button")
  .addEventListener("click", saveExhibitions);

document
  .getElementById("exhibition-list")
  .addEventListener("click", saveExhibitions);

// Last inn lagrede utstillinger når siden lastes
loadExhibitions();
