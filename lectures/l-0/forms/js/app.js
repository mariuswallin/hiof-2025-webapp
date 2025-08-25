// js/app.js

console.log("App script loaded");

const form = document.getElementById("exhibition-form");

const validateForm = (data = {}) => {
  const errors = [];
  if (!data.title || data.title.trim() === "") {
    errors.push("Tittel er påkrevd.");
  }
  // Legg til flere valideringer her etter behov
  return errors;
};

// Håndter innsending av skjema
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Forhindre standard innsending

  const formData = new FormData(form);
  const exhibition = {
    title: formData.get("title"),
    // ... annen data som vi burde hatt med
  };

  // Valider skjemaet
  const errors = validateForm(exhibition);
  if (errors.length > 0) {
    // Hvis det er valideringsfeil, vis dem og stopp innsending
    alert("Feil i skjemaet:\n" + errors.join("\n"));
    return;
  }

  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true; // Deaktiver knappen for å forhindre dobbeltklikk
  submitButton.textContent = "Sender..."; // Endre knappetekst for tilbakemelding

  // Try-catch for å håndtere feil ved innsending
  try {
    // Send data til serveren med POST til "/exhibitions" urlen
    const response = await fetch("/exhibitions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Konverterer utstillingen til JSON for å ha valid format
      body: JSON.stringify(exhibition),
    });

    // Sjekk om responsen er OK (status 200-299)
    if (!response.ok) {
      throw new Error("Nettverksrespons var ikke OK");
    }

    // Hent JSON-data fra responsen
    const data = await response.json();
    console.log("Utstilling lagret:", data);
    form.reset(); // Tøm skjemaet etter innsending
  } catch (error) {
    console.error("Feil ved innsending av utstilling:", error);
  } finally {
    submitButton.disabled = false; // Aktiver knappen igjen
    submitButton.textContent = "Legg til utstilling";
  }
});
