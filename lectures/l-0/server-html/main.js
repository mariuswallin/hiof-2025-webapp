// Vent til HTML-en er ferdig lastet
document.addEventListener("DOMContentLoaded", function () {
  // Hent data fra serveren
  fetch("http://localhost:3999/exhibitions", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json()) // Konverter responsen til JSON
    .then((data) => {
      // Logg dataen så vi kan se strukturen
      console.log(data);

      // Finn ul-elementet hvor vi skal vise utstillingene
      const exhibitionList = document.getElementById("exhibition-list");

      // Gå gjennom hver utstilling og lag et li-element
      data.forEach((exhibition) => {
        let listItem = document.createElement("li");
        listItem.textContent = `${exhibition.title}`;
        exhibitionList.appendChild(listItem);
      });
    });
});
