document.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll(".grid div");
  const resultDisplay = document.querySelector("#result");
  let width = 15;
  let currentShooterIndex = 202;
  let currentInvaderIndex = 0;
  let alienInvadersTakenDown: number[] = [];
  let direction = 1;
  let invaderId: Function | number; // will be `setInterval(moveInvaders, 500);`

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
  squares[currentShooterIndex].classList.add("shooter");

  // move hero left/right
  function moveShooter(e: KeyboardEvent) {
    squares[currentShooterIndex].classList.remove("shooter");
    switch (e.keyCode) {
      case 37:
        if (currentShooterIndex % width !== 0) {
          currentShooterIndex -= 1;
        }
        break;
      case 39:
        if (currentShooterIndex % width < width - 1) {
          currentShooterIndex += 1;
        }
        break;
    }
    squares[currentShooterIndex].classList.add("shooter");
  }
  document.addEventListener("keydown", moveShooter);

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
      squares[currentShooterIndex].classList.contains("shooter") &&
      squares[currentShooterIndex].classList.contains("invader")
    ) {
      console.log("game over 1");
      resultDisplay!.textContent = "Game Over";
      squares[currentShooterIndex].classList.add("boom");
      clearInterval(invaderId);
    }

    for (let i = 0; i <= alienInvaders.length - 1; i++) {
      if (alienInvaders[i] > squares.length - (width - 1)) {
        console.log("game over 2");
        resultDisplay.textContent = "Game Over";
        clearInterval(invaderId);
      }
    }

    // win params
    if (alienInvadersTakenDown.length === alienInvaders.length) {
      resultDisplay.textContent = "You Win!!!";
      clearInterval(invaderId);
    }
  }
  invaderId = setInterval(moveInvaders, 500);

  // destroy aliens
  function shoot(e) {
    let laserId;
    let currentLaserIndex = currentShooterIndex; // laser comes from shooter

    function moveLaser() {
      // remove class laser
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
        resultDisplay.textContent = result.toString();
      }

      if (currentLaserIndex < width) {
        clearInterval(laserId);
        // clear animation after 1/10 sec
        setTimeout(() => {
          squares[currentLaserIndex].classList.remove("laser");
        }, 100);
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
