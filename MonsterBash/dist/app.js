"use strict";
var square = document.querySelectorAll(".square");
var monster = document.querySelectorAll(".monster");
var timeLeft = document.querySelector("#time-left");
var score = document.querySelector("#score");
var resetBtn = document.querySelector("#reset-button");
var gameOver = document.querySelector("#game-over");
var final = document.querySelector("#final-score");
var monsterLocation;
var monsterTimerId;
var result = 0;
var currentTime = parseInt(timeLeft === null || timeLeft === void 0 ? void 0 : timeLeft.textContent);
function randomSquare() {
    square === null || square === void 0 ? void 0 : square.forEach(function (className) {
        className.classList.remove("monster");
    });
    var randomPosition = square[Math.floor(Math.random() * 9)];
    randomPosition.classList.add("monster");
    monsterLocation = parseInt(randomPosition.id);
}
square.forEach(function (id) {
    id.addEventListener("mouseup", function () {
        if (parseInt(id.id) === monsterLocation && currentTime > -1) {
            result = result + 1;
            score.textContent = result.toString();
        }
    });
});
function moveMonster() {
    monsterTimerId = setInterval(randomSquare, 1000);
    if (currentTime === 0) {
        clearInterval(monsterTimerId);
    }
}
moveMonster();
function countDown() {
    currentTime = currentTime - 1;
    timeLeft.textContent = currentTime.toString();
    resetBtn.style.visibility = "hidden";
    if (currentTime < 6) {
        timeLeft.classList.remove("is-disabled");
        timeLeft.classList.add("is-error");
    }
    if (currentTime < 0) {
        clearInterval(monsterTimerId);
        clearInterval(timerId);
        timeLeft.textContent = "0";
        gameOver.style.visibility = "visible";
        final.textContent = "Final Score: " + result.toString();
        resetBtn.style.visibility = "visible";
    }
}
var timerId = setInterval(countDown, 1000);
function startGame() {
    location.reload();
}
//# sourceMappingURL=app.js.map