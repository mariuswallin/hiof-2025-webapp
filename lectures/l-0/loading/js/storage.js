// js/storage.js

console.log("Script loading storage.js");

// Modul for å håndtere all lagring
export const Storage = {
  // Lagrer utstillinger i LocalStorage
  save: function (exhibitions) {
    localStorage.setItem("exhibitions", JSON.stringify(exhibitions));
  },

  // Henter utstillinger fra LocalStorage
  load: function () {
    const data = localStorage.getItem("exhibitions");
    return data ? JSON.parse(data) : [];
  },

  // Sletter alle utstillinger
  clear: function () {
    localStorage.removeItem("exhibitions");
  },
};
