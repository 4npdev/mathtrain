//Variables
const headerBest = document.getElementById("header-best");
let best = Number(localStorage.getItem("best")) || 0;

//Code
headerBest.textContent = "Highest streak: " + best;