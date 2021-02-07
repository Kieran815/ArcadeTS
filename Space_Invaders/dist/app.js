"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const squares = document.querySelectorAll(".grid div");
    const finalResult = document.querySelector("#final-result");
    const resultDisplay = document.querySelector("#result");
    let width = 15;
    let curHeroIndex = 202;
    let currentInvaderIndex = 0;
    let alienInvadersTakenDown = [];
    let direction = 1;
    let invaderId;
    let gameSpeed = 500;
    let result = 0;
    const alienInvaders = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
    ];
    alienInvaders.forEach((invader) => {
        squares[currentInvaderIndex + invader].classList.add("invader");
    });
    squares[curHeroIndex].classList.add("hero");
    function moveHero(e) {
        squares[curHeroIndex].classList.remove("hero");
        switch (e.keyCode) {
            case 37:
                if (curHeroIndex % width !== 0) {
                    curHeroIndex -= 1;
                }
                break;
            case 39:
                if (curHeroIndex % width < width - 1) {
                    curHeroIndex += 1;
                }
                break;
        }
        squares[curHeroIndex].classList.add("hero");
    }
    document.addEventListener("keydown", moveHero);
    function moveInvaders() {
        const leftEdge = alienInvaders[0] % width === 0;
        const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;
        if ((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
            direction = width;
        }
        else if (direction === width) {
            if (leftEdge) {
                direction = 1;
            }
            else {
                direction = -1;
            }
        }
        for (let i = 0; i <= alienInvaders.length - 1; i++) {
            squares[alienInvaders[i]].classList.remove("invader");
        }
        for (let i = 0; i <= alienInvaders.length - 1; i++) {
            alienInvaders[i] += direction;
        }
        for (let i = 0; i <= alienInvaders.length - 1; i++) {
            if (!alienInvadersTakenDown.includes(i)) {
                squares[alienInvaders[i]].classList.add("invader");
            }
        }
        if (squares[curHeroIndex].classList.contains("hero") &&
            squares[curHeroIndex].classList.contains("invader")) {
            console.log("game over 1");
            if (finalResult) {
                finalResult.textContent = `You Have Been Destroyed! Final Score: ${result}`;
            }
            squares[curHeroIndex].classList.add("boom");
            clearInterval(invaderId);
        }
        for (let i = 0; i <= alienInvaders.length - 1; i++) {
            if (alienInvaders[i] > squares.length - (width - 1)) {
                console.log("game over 2");
                if (finalResult) {
                    finalResult.textContent = `The Aliens have Landed! Final Score: ${result}`;
                }
                clearInterval(invaderId);
            }
        }
        if (alienInvadersTakenDown.length === alienInvaders.length) {
            if (resultDisplay) {
                resultDisplay.textContent = "Get Ready for the Next Level!!!";
                clearInterval(invaderId);
            }
            setTimeout(() => {
                for (let i = 0; i < alienInvaders.length; i++) {
                    alienInvaders[i] = i;
                }
                invaderId = 0;
                squares.forEach((square) => {
                    square.className = "";
                });
                gameSpeed = gameSpeed - 100;
                curHeroIndex = 202;
                squares[curHeroIndex].classList.add("hero");
                currentInvaderIndex = 0;
                console.log(currentInvaderIndex);
                alienInvaders.forEach((invader) => {
                    console.log(currentInvaderIndex + invader);
                    squares[currentInvaderIndex + invader].classList.add("invader");
                });
                alienInvadersTakenDown = [];
                direction = 1;
                invaderId = setInterval(moveInvaders, gameSpeed);
            }, 3000);
        }
    }
    invaderId = setInterval(moveInvaders, gameSpeed);
    function shoot(e) {
        let laserId;
        let currentLaserIndex = curHeroIndex;
        function moveLaser() {
            if (squares[currentLaserIndex]) {
                squares[currentLaserIndex].classList.remove("laser");
                currentLaserIndex -= width;
                squares[currentLaserIndex].classList.add("laser");
                if (squares[currentLaserIndex].classList.contains("invader")) {
                    squares[currentLaserIndex].classList.remove("laser");
                    squares[currentLaserIndex].classList.remove("invader");
                    squares[currentLaserIndex].classList.add("boom");
                    setTimeout(() => {
                        squares[currentLaserIndex].classList.remove("boom");
                    }, 250);
                    clearInterval(laserId);
                    const alienTakenDown = alienInvaders.indexOf(currentLaserIndex);
                    alienInvadersTakenDown.push(alienTakenDown);
                    result++;
                    if (resultDisplay) {
                        resultDisplay.textContent = result.toString();
                    }
                }
                if (currentLaserIndex < width) {
                    clearInterval(laserId);
                    squares[currentLaserIndex].classList.remove("laser");
                }
                squares.forEach((square) => {
                    if (square.classList.contains("boom")) {
                        setTimeout(() => {
                            square.className = "";
                        }, 250);
                    }
                });
            }
        }
        document.addEventListener("keyup", (e) => {
            if (e.keyCode === 32) {
                laserId = setInterval(moveLaser, 100);
            }
        });
    }
    document.addEventListener("keyup", shoot);
});
//# sourceMappingURL=app.js.map