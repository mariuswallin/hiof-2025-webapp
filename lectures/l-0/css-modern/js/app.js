// js/app.js

let exhibitions = [];
const form = document.querySelector(".add-exhibition-form");
const grid = document.getElementById("exhibition-list");
const themeToggle = document.querySelector(".theme-toggle");

let currentTheme =
  localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");

function renderExhibition(exhibition) {
  const card = document.createElement("article");
  card.className = "exhibition-card";
  card.innerHTML = `
    <h3 class="title">${exhibition.title}</h3>
    ${
      exhibition.description
        ? `<p class="description">${exhibition.description}</p>`
        : ""
    }
    <button class="delete-btn" data-id="${exhibition.id}">Slett</button>
  `;

  // Legger til lytter for slett-knappen
  // Dette gjør at vi kan slette utstillingen når knappen trykkes
  // Vi bruker exhibition.id for å identifisere hvilken utstilling som skal slettes
  card.querySelector(".delete-btn").addEventListener("click", () => {
    deleteExhibition(exhibition.id, card);
  });

  grid.appendChild(card);
}

function addExhibition(exhibition) {
  exhibitions.push(exhibition);
  renderExhibition(exhibition);
}

function deleteExhibition(id, element) {
  exhibitions = exhibitions.filter((ex) => ex.id !== id);
  element.style.opacity = "0";
  element.style.transform = "scale(0.9)";
  // Fjerner elementet etter en liten animasjon
  setTimeout(() => element.remove(), 300);
}

function applyTheme(theme) {
  // Setter tema på body og oppdater meta tag
  document.body.setAttribute("data-theme", theme);
  const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
  if (metaColorScheme) {
    // Oppdaterer eksisterende meta tag
    // Dette gjør at temaet endres dynamisk
    metaColorScheme.content = theme;
  }
  const icon = themeToggle.querySelector("span");
  icon.textContent = theme === "dark" ? "☀️" : "🌙";
}

function toggleTheme() {
  currentTheme = currentTheme === "light" ? "dark" : "light";
  applyTheme(currentTheme);
  // Setter valgt farge i localStorage for å huske valget
  localStorage.setItem("theme", currentTheme);
}

function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  const exhibition = {
    id: Date.now(),
    title: formData.get("title"),
    description: formData.get("description"),
  };

  addExhibition(exhibition);
  event.target.reset();
}

function init() {
  // Legger til lyttere for skjemaet og tema-bryteren
  form.addEventListener("submit", handleSubmit);
  themeToggle.addEventListener("click", toggleTheme);
  applyTheme(currentTheme);

  // Initialiserer tema basert på lagret verdi eller systeminnstilling
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        applyTheme(e.matches ? "dark" : "light");
      }
    });
}

// Kjør init-funksjonen når DOM er lastet
document.addEventListener("DOMContentLoaded", init);
