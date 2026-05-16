//Variables
const headerStreak = document.getElementById("header-streak");
const headerBest = document.getElementById("header-best");
const gameTask = document.getElementById("game-task");
const gameInput = document.getElementById("game-input");
const incorrect = document.getElementById("incorrect");
const overlay = document.getElementById("overlay");
const incorrectCorrection = document.getElementById("incorrect-correction");
let streak = Number(localStorage.getItem("streak")) || 0;
let best = Number(localStorage.getItem("best")) || 0;
let task;
let operator;
let randomIndex;
let result;

//Code
headerStreak.textContent = "Streak: " + streak;
headerBest.textContent = "Best: " + best;
const saved = localStorage.getItem("currentTask");
if (saved) {
    const t = JSON.parse(saved)
    operator = t.op
    task = t.a + " " + t.op + " " + t.b
    result = t.res
    gameTask.textContent = task
    resetUI()
} else {
    resetUI()
    generateTask()
}

function resetUI() {
    incorrect.classList.remove("show");
    overlay.classList.remove("show");

    gameInput.focus();
}

function generateTask() {
    resetUI();
    let a = Math.floor(Math.random() * 100);
    let b = Math.floor(Math.random() * 100);

    let operators = ["+", "-", "*"];

    if(streak < 10) {
        operator = operators[0];
    } else if(streak < 20) {
        randomIndex = Math.floor(Math.random() * 2);
        operator = operators[randomIndex];
    } else {
        randomIndex = Math.floor(Math.random() * 3);
        operator = operators[randomIndex];
    }

    task = a + " " + operator + " " + b;
    
    if(operator === "+") {
        result = a + b;
    }

    if (operator === "-") {
        result = a - b;
    }

    if(operator === "*") {
        result = a * b;
    }

    saveTask(a, b, operator, result)

    gameTask.textContent = task;
}

function saveTask(a, b, op, res) {
    localStorage.setItem("currentTask", JSON.stringify({ a, b, op, res }))
}

gameInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        tryGuess();
    }
});

function tryGuess() {
    let guess = Number(gameInput.value);
    
    if(gameInput.value === "") {
        return;
    }

    gameInput.value = "";

    if(guess === result) {
        streak++;
        localStorage.setItem("streak", streak);
        headerStreak.textContent = "Streak: " + streak;
        generateTask();

        if(streak > best) {
            best = streak;
            localStorage.setItem("best", best);
            headerBest.textContent = "Best: " + best;
        }
    } else {
        streak = 0;
        localStorage.setItem("streak", streak);
        localStorage.removeItem("currentTask");
        headerStreak.textContent = "Streak: " + streak;

        incorrect.classList.add("show");
        overlay.classList.add("show");
        incorrectCorrection.textContent = "The correct answer was " + result;

        gameInput.focus();
}
}

