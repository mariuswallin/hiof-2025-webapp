// js/load.js

const API_BASE_URL = "http://localhost:3999";

// Hent alle utstillinger fra serveren
export async function fetchExhibitions() {
  try {
    const response = await fetch(`${API_BASE_URL}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Feil ved henting av utstillinger:", error);
    return [];
  }
}
