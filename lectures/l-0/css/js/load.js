// js/load.js

import { displayExhibitions } from "./dom";

console.log("Script loading json load.js");

export function loadFromJSON() {
  return fetch("data.json")
    .then((response) => {
      // Konverterer data til json format
      return response.json();
    })
    .then((data) => {
      displayExhibitions(data);
    })
    .catch((error) => {
      console.error("Error loading JSON data:", error);
    });
}
