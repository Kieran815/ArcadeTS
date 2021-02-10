"use strict";
document.addEventListener("DOMContentLoaded", function () {
    var squares = document.querySelectorAll(".grid div");
    var timeLeft = document.querySelector("#time-left");
    var result = document.querySelector("#result");
    var startBtn = document.querySelector("#button");
    var width = 9;
    var currentIndex = 76;
    var currentTime = 20;
    var timerId;
    var carsLeft = document.querySelectorAll(".car-left");
    var carsRight = document.querySelectorAll(".car-right");
    var logsLeft = document.querySelectorAll(".log-left");
    var logsRight = document.querySelectorAll(".log-right");
    function moveFrog(e) {
        squares[currentIndex].classList.remove("frog");
        switch (e.keyCode) {
            case 37:
                if (currentIndex % width !== 0) {
                    currentIndex -= 1;
                }
                break;
            case 38:
                if (currentIndex - width >= 0) {
                    currentIndex -= width;
                }
                break;
            case 39:
                if (currentIndex % width < width - 1) {
                    currentIndex += 1;
                }
                break;
            case 40:
                if (currentIndex + width < width * width) {
                    currentIndex += width;
                }
                break;
        }
        squares[currentIndex].classList.add("frog");
        lose();
        win();
    }
    function moveCars() {
        carsLeft.forEach(function (carLeft) { return moveCarLeft(carLeft); });
        carsRight.forEach(function (carRight) { return moveCarRight(carRight); });
    }
    function moveCarLeft(carLeft) {
        switch (true) {
            case carLeft.classList.contains("c1"):
                carLeft.classList.remove("c1");
                carLeft.classList.add("c2");
                break;
            case carLeft.classList.contains("c2"):
                carLeft.classList.remove("c2");
                carLeft.classList.add("c3");
                break;
            case carLeft.classList.contains("c3"):
                carLeft.classList.remove("c3");
                carLeft.classList.add("c1");
                break;
        }
    }
    function moveCarRight(carRight) {
        switch (true) {
            case carRight.classList.contains("c1"):
                carRight.classList.remove("c1");
                carRight.classList.add("c3");
                break;
            case carRight.classList.contains("c2"):
                carRight.classList.remove("c2");
                carRight.classList.add("c1");
                break;
            case carRight.classList.contains("c3"):
                carRight.classList.remove("c3");
                carRight.classList.add("c2");
                break;
        }
    }
    function moveLogs() {
        logsLeft.forEach(function (logLeft) { return moveLogLeft(logLeft); });
        logsRight.forEach(function (logRight) { return moveLogRight(logRight); });
    }
    function moveLogLeft(logLeft) {
        switch (true) {
            case logLeft.classList.contains("l1"):
                logLeft.classList.remove("l1");
                logLeft.classList.add("l2");
                break;
            case logLeft.classList.contains("l2"):
                logLeft.classList.remove("l2");
                logLeft.classList.add("l3");
                break;
            case logLeft.classList.contains("l3"):
                logLeft.classList.remove("l3");
                logLeft.classList.add("l4");
                break;
            case logLeft.classList.contains("l4"):
                logLeft.classList.remove("l4");
                logLeft.classList.add("l5");
                break;
            case logLeft.classList.contains("l5"):
                logLeft.classList.remove("l5");
                logLeft.classList.add("l1");
                break;
        }
    }
    function moveLogRight(logRight) {
        switch (true) {
            case logRight.classList.contains("l1"):
                logRight.classList.remove("l1");
                logRight.classList.add("l5");
                break;
            case logRight.classList.contains("l2"):
                logRight.classList.remove("l2");
                logRight.classList.add("l1");
                break;
            case logRight.classList.contains("l3"):
                logRight.classList.remove("l3");
                logRight.classList.add("l2");
                break;
            case logRight.classList.contains("l4"):
                logRight.classList.remove("l4");
                logRight.classList.add("l3");
                break;
            case logRight.classList.contains("l5"):
                logRight.classList.remove("l5");
                logRight.classList.add("l4");
                break;
        }
    }
    function moveWithLogLeft() {
        if (currentIndex >= 27 && currentIndex < 35) {
            squares[currentIndex].classList.remove("frog");
            currentIndex += 1;
            squares[currentIndex].classList.add("frog");
        }
    }
    function moveWithLogRight() {
        if (currentIndex > 18 && currentIndex <= 26) {
            squares[currentIndex].classList.remove("frog");
            currentIndex -= 1;
            squares[currentIndex].classList.add("frog");
        }
    }
    function win() {
        if (result && squares[4].classList.contains("frog")) {
            result.textContent = "You Win!!!";
            result.style.visibility = "visible";
            squares[currentIndex].classList.remove("frog");
            clearInterval(timerId);
            document.removeEventListener("keyup", moveFrog);
        }
    }
    function lose() {
        if (currentTime === 0) {
            if (result)
                (function () { return (result.innerHTML = "Times Up!!!"); });
            squares[currentIndex].classList.remove("frog");
            clearInterval(timerId);
            document.removeEventListener("keyup", moveFrog);
        }
        else if (squares[currentIndex].classList.contains("c1")) {
            if (result)
                (function () { return (result.innerHTML = "You've Been Squashed!!!"); });
            squares[currentIndex].classList.remove("frog");
            clearInterval(timerId);
            document.removeEventListener("keyup", moveFrog);
        }
        else if (squares[currentIndex].classList.contains("l5") ||
            squares[currentIndex].classList.contains("l4")) {
            if (result)
                (function () { return (result.innerHTML = "You've Drowned!!!"); });
            squares[currentIndex].classList.remove("frog");
            clearInterval(timerId);
            document.removeEventListener("keyup", moveFrog);
        }
    }
    function movePieces() {
        currentTime--;
        if (timeLeft) {
            timeLeft.textContent = currentTime.toString();
        }
        moveCars();
        moveLogs();
        moveWithLogLeft();
        moveWithLogRight();
        lose();
    }
    if (startBtn) {
        startBtn.addEventListener("click", function () {
            if (timerId) {
                clearInterval(timerId);
            }
            else {
                timerId = setInterval(movePieces, 1000);
                document.addEventListener("keyup", moveFrog);
            }
        });
    }
});
//# sourceMappingURL=app.js.map