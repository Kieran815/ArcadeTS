"use strict";
console.log("Test Code Output for Boiler Plate Code");
document.addEventListener("DOMContentLoaded", function () {
    var squares = document.querySelectorAll(".grid div");
    var scoreDisplay = document.querySelector("span");
    var startBtn = document.querySelector(".start");
    var width = 10;
    var images = ["apple", "cherry", "grapes", "peach", "strawberry"];
    var currentIndex = 0;
    var fruitIndex = 0;
    var currentSnake = [2, 1, 0];
    var direction = 1;
    var score = 0;
    var speed = 0.9;
    var intervalTime = 0;
    var interval = 0;
    function startGame() {
        currentSnake.forEach(function (index) { return squares[index].classList.remove("snake"); });
        squares[fruitIndex].classList.remove("fruit");
        squares[fruitIndex].removeAttribute("id");
        clearInterval(interval);
        score = 0;
        randomFruit();
        direction = 1;
        scoreDisplay.innerText = score.toString();
        intervalTime = 1000;
        currentSnake = [2, 1, 0];
        currentIndex = 0;
        currentSnake.forEach(function (index) {
            squares[index].classList.add("snake");
        });
        interval = setInterval(collisions, intervalTime);
    }
    function collisions() {
        if ((currentSnake[0] + width >= width * width && direction === width) ||
            (currentSnake[0] % width === width - 1 && direction === 1) ||
            (currentSnake[0] % width === 0 && direction === -1) ||
            (currentSnake[0] - width < 0 && direction === -width) ||
            squares[currentSnake[0] + direction].classList.contains("snake")) {
            return clearInterval(interval);
        }
        var tail = currentSnake.pop();
        if (typeof tail == "number") {
            squares[tail].classList.remove("snake");
            currentSnake.unshift(currentSnake[0] + direction);
            if (squares[currentSnake[0]].classList.contains("fruit")) {
                squares[currentSnake[0]].classList.remove("fruit");
                squares[currentSnake[0]].removeAttribute("style");
                squares[currentSnake[0]].removeAttribute("id");
                squares[tail].classList.add("snake");
                currentSnake.push(tail);
                randomFruit();
                score++;
                scoreDisplay.textContent = score.toString();
                if (score > 14) {
                    scoreDisplay === null || scoreDisplay === void 0 ? void 0 : scoreDisplay.classList.remove("is-warning");
                    scoreDisplay === null || scoreDisplay === void 0 ? void 0 : scoreDisplay.classList.add("is-error");
                }
                else if (score > 9) {
                    scoreDisplay === null || scoreDisplay === void 0 ? void 0 : scoreDisplay.classList.remove("is-success");
                    scoreDisplay === null || scoreDisplay === void 0 ? void 0 : scoreDisplay.classList.add("is-warning");
                }
                else if (score > 4) {
                    scoreDisplay === null || scoreDisplay === void 0 ? void 0 : scoreDisplay.classList.add("is-success");
                }
                clearInterval(interval);
                intervalTime = intervalTime * speed;
                interval = setInterval(collisions, intervalTime);
            }
            squares[currentSnake[0]].classList.add("snake");
        }
    }
    function randomFruit() {
        var randomImage = images[Math.floor(Math.random() * images.length)];
        do {
            squares[fruitIndex].removeAttribute("style");
            fruitIndex = Math.floor(Math.random() * squares.length);
            squares[fruitIndex].setAttribute("style", "background-image: none");
        } while (squares[fruitIndex].classList.contains("snake"));
        squares[fruitIndex].classList.add("fruit");
        squares[fruitIndex].setAttribute("id", "fruit");
        squares[fruitIndex].setAttribute("style", "background-image: url(../images/" + randomImage + ".jpg)");
    }
    function control(e) {
        if (e.keyCode === 39 && direction != -1) {
            direction = 1;
        }
        else if (e.keyCode === 38 && direction != +width) {
            direction = -width;
        }
        else if (e.keyCode === 37 && direction != 1) {
            direction = -1;
        }
        else if (e.keyCode === 40 && direction != -width) {
            direction = +width;
        }
    }
    document.addEventListener("keyup", control);
    startBtn.addEventListener("click", startGame);
});
//# sourceMappingURL=app.js.map