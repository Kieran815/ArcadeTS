document.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll(".grid div");
  const finalResult = document.querySelector("#final-result");
  const resultDisplay = document.querySelector("#result");
  let width = 15;
  let curHeroIndex = 202;
  let currentInvaderIndex = 0;
  let alienInvadersTakenDown: number[] = [];
  let direction = 1;
  let invaderId: number;
  let gameSpeed: number = 500;

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

  // draw invading army
  alienInvaders.forEach((invader) => {
    squares[currentInvaderIndex + invader].classList.add("invader");
  });

  // render hero
  squares[curHeroIndex].classList.add("hero");

  // move hero left/right
  function moveHero(e: KeyboardEvent) {
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

  // move Invaders
  function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0;
    const rightEdge =
      alienInvaders[alienInvaders.length - 1] % width === width - 1;

    if ((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
      direction = width;
    } else if (direction === width) {
      if (leftEdge) {
        direction = 1;
      } else {
        direction = -1;
      }
    }

    // why 3 for loops? 3 separate actions
    // 1. remove invader class
    for (let i = 0; i <= alienInvaders.length - 1; i++) {
      squares[alienInvaders[i]].classList.remove("invader");
    }
    // 2. move index up 1 div
    for (let i = 0; i <= alienInvaders.length - 1; i++) {
      alienInvaders[i] += direction;
    }
    // 3. add invader class
    for (let i = 0; i <= alienInvaders.length - 1; i++) {
      // if doesn't includes
      if (!alienInvadersTakenDown.includes(i)) {
        squares[alienInvaders[i]].classList.add("invader");
      }
    }

    // game over params

    // aliens get to bottom row
    if (
      squares[curHeroIndex].classList.contains("hero") &&
      squares[curHeroIndex].classList.contains("invader")
    ) {
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

    // win params
    if (alienInvadersTakenDown.length === alienInvaders.length) {
      // next level message
      if (resultDisplay) {
        resultDisplay.textContent = "Get Ready for the Next Level!!!";
        clearInterval(invaderId);
      }

      // countdown to reset
      setTimeout(() => {
        for (let i = 0; i < alienInvaders.length; i++) {
          alienInvaders[i] = i;
        }
        invaderId = 0;
        // reset game
        squares.forEach((square) => {
          square.className = "";
        });
        // speed up army
        gameSpeed = gameSpeed - 100;
        // reset hero index
        curHeroIndex = 202;
        squares[curHeroIndex].classList.add("hero");
        // reset invader index -- not working!!! army won't go back to 0
        currentInvaderIndex = 0;
        console.log(currentInvaderIndex);
        // draw invader army
        alienInvaders.forEach((invader) => {
          console.log(currentInvaderIndex + invader);
          squares[currentInvaderIndex + invader].classList.add("invader");
        });
        alienInvadersTakenDown = [];
        direction = 1;

        // call move aliens
        invaderId = setInterval(moveInvaders, gameSpeed);
      }, 3000);
    }
  }
  invaderId = setInterval(moveInvaders, gameSpeed);
  // destroy aliens
  function shoot(e: KeyboardEvent) {
    let laserId: number;
    let currentLaserIndex = curHeroIndex; // laser comes from hero

    function moveLaser() {
      // remove class laser
      if (squares[currentLaserIndex]) {
        squares[currentLaserIndex].classList.remove("laser");
        // move up one full row
        currentLaserIndex -= width;
        // add class 'laser'
        squares[currentLaserIndex].classList.add("laser");

        // laser/invader collision
        if (squares[currentLaserIndex].classList.contains("invader")) {
          // remove classes
          squares[currentLaserIndex].classList.remove("laser");
          squares[currentLaserIndex].classList.remove("invader");
          // add explosion timeout event
          squares[currentLaserIndex].classList.add("boom");
          setTimeout(() => {
            squares[currentLaserIndex].classList.remove("boom");
          }, 250);
          clearInterval(laserId);

          // track score
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

        // Error Fix: `boom` class no re-rendering to black
        // double-check to re-color explosions to black
        squares.forEach((square) => {
          if (square.classList.contains("boom")) {
            setTimeout(() => {
              square.className = "";
            }, 250);
          }
        });
      }
    }

    // fire on space bar
    document.addEventListener("keyup", (e) => {
      if (e.keyCode === 32) {
        laserId = setInterval(moveLaser, 100);
      }
    });
  }

  document.addEventListener("keyup", shoot);

  // ******************************************************
  // End Event Listener
});
