//Variables
const headerStreak = document.getElementById("header-streak");
const headerBest = document.getElementById("header-best");
let streak = Number(localStorage.getItem("streak")) || 0;
let best = Number(localStorage.getItem("best")) || 0;

//Code
headerStreak.textContent = "Streak: " + streak;
headerBest.textContent = "Best: " + best;