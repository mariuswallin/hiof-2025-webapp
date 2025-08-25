// js/robustLoading.js

async function robustDataLoading() {
  // Vis loading-state
  showLoadingIndicator();

  try {
    const response = await fetch("data.json");

    // Sjekk HTTP-status
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    // Sjekk at vi får JSON
    const contentType = response.headers.get("content-type");

    // Hvis content-type ikke er satt eller ikke er JSON, kast feil
    // Dette kan skje hvis serveren returnerer feil format
    // eller hvis det er en teknisk feil som forhindrer riktig respons
    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("Forventet JSON, men fikk noe annet!");
    }

    // Konverter responsen til JSON
    const data = await response.json();

    // Valider datastruktur
    if (!Array.isArray(data)) {
      throw new Error("Forventet en array med utstillinger");
    }

    return data;
  } catch (error) {
    // Logg teknisk feil
    console.error("Teknisk feil:", error);

    // Vis brukervennlig melding
    if (error.name === "TypeError") {
      showUserError("Kunne ikke tolke serverdata. Kontakt support.");
    } else if (error.message.includes("HTTP")) {
      showUserError("Kunne ikke nå serveren. Sjekk internettforbindelsen.");
    } else {
      showUserError("Noe gikk galt. Prøv igjen senere.");
    }

    return []; // Returner tom array som fallback
  } finally {
    hideLoadingIndicator();
  }
}
