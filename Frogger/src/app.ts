document.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll(".grid div");
  // game controls
  const timeLeft: HTMLElement | null = document.querySelector("#time-left");
  const result: HTMLElement | null = document.querySelector("#result");
  const startBtn: HTMLElement | null = document.querySelector("#button");
  // board
  const width = 9;
  let currentIndex: number = 76;
  let currentTime: number = 20;
  let timerId: number;
  //
  const carsLeft = document.querySelectorAll(".car-left");
  const carsRight = document.querySelectorAll(".car-right");
  const logsLeft = document.querySelectorAll(".log-left");
  const logsRight = document.querySelectorAll(".log-right");

  // frog controls
  function moveFrog(e: KeyboardEvent) {
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
    // `frog` on `starting-block`
    squares[currentIndex].classList.add("frog");
    lose();
    win();
  }

  //  **** NPC CONTROLS ****
  // *** CAR MOVEMENTS ***
  function moveCars() {
    carsLeft.forEach((carLeft) => moveCarLeft(carLeft));
    carsRight.forEach((carRight) => moveCarRight(carRight));
  }
  // **** LEFT ****
  function moveCarLeft(carLeft: Element) {
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

  // **** RIGHT ****
  function moveCarRight(carRight: Element) {
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

  //  *** LOG MOVEMENTS ***
  function moveLogs() {
    logsLeft.forEach((logLeft) => moveLogLeft(logLeft));
    logsRight.forEach((logRight) => moveLogRight(logRight));
  }
  // **** LEFT ****
  function moveLogLeft(logLeft: Element) {
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

  // **** RIGHT ****
  function moveLogRight(logRight: Element) {
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

  // *** FROG ON A LOG ***
  // Left w/ log
  function moveWithLogLeft() {
    if (currentIndex >= 27 && currentIndex < 35) {
      squares[currentIndex].classList.remove("frog");
      currentIndex += 1;
      squares[currentIndex].classList.add("frog");
    }
  }
  // Right w/ log
  function moveWithLogRight() {
    if (currentIndex > 18 && currentIndex <= 26) {
      squares[currentIndex].classList.remove("frog");
      currentIndex -= 1;
      squares[currentIndex].classList.add("frog");
    }
  }

  // **** GAME RESULTS ****
  // *** Win Params ***
  function win() {
    if (result && squares[4].classList.contains("frog")) {
      result.textContent = "You Win!!!";
      result.style.visibility = "visible";
      squares[currentIndex].classList.remove("frog");
      clearInterval(timerId);
      document.removeEventListener("keyup", moveFrog);
    }
  }

  // *** Lose Params ***
  function lose() {
    if (currentTime === 0) {
      if (result) () => (result.innerHTML = "Times Up!!!");
      squares[currentIndex].classList.remove("frog");
      clearInterval(timerId);
      document.removeEventListener("keyup", moveFrog);
    } else if (squares[currentIndex].classList.contains("c1")) {
      if (result) () => (result.innerHTML = "You've Been Squashed!!!");
      squares[currentIndex].classList.remove("frog");
      clearInterval(timerId);
      document.removeEventListener("keyup", moveFrog);
    } else if (
      squares[currentIndex].classList.contains("l5") ||
      squares[currentIndex].classList.contains("l4")
    ) {
      if (result) () => (result.innerHTML = "You've Drowned!!!");
      squares[currentIndex].classList.remove("frog");
      clearInterval(timerId);
      document.removeEventListener("keyup", moveFrog);
    }
  }

  // call NPC and Control methods
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

  // *** START / PAUSE GAME ***
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      if (timerId) {
        clearInterval(timerId);
      } else {
        timerId = setInterval(movePieces, 1000);
        document.addEventListener("keyup", moveFrog);
      }
    });
  }

  // ******************* END OF EVENT LISTENER ***************************
});
