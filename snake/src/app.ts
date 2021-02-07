console.log("Test Code Output for Boiler Plate Code");

document.addEventListener("DOMContentLoaded", () => {
  const squares: NodeListOf<Element> = document.querySelectorAll(".grid div");
  const scoreDisplay: HTMLElement | null = document.querySelector("span");
  const startBtn: HTMLElement | null = document.querySelector(".start");

  const width: number = 10;
  const images: string[] = ["apple", "cherry", "grapes", "peach", "strawberry"];
  let currentIndex: number = 0; // starting location
  let fruitIndex: number = 0;
  let currentSnake: number[] = [2, 1, 0]; // 2 = head, 1 = body, 0 = tail
  let direction: number = 1; // move one div per cycle
  let score: number = 0;
  let speed: number = 0.9;
  let intervalTime: number = 0;
  let interval: number = 0;

  function startGame() {
    currentSnake.forEach((index) => squares[index].classList.remove("snake"));
    squares[fruitIndex].classList.remove("fruit");
    squares[fruitIndex].removeAttribute("id");
    clearInterval(interval);
    score = 0;
    randomFruit();
    direction = 1;
    scoreDisplay!.innerText = score.toString();
    intervalTime = 1000; // 1sec
    currentSnake = [2, 1, 0];
    currentIndex = 0;
    currentSnake.forEach((index) => {
      squares[index].classList.add("snake");
    });
    interval = setInterval(collisions, intervalTime);
  }

  // handle ALL collisions ([snake/snake], [snake/wall], [snake, fruit])
  function collisions() {
    // collision != fruit
    if (
      (currentSnake[0] + width >= width * width && direction === width) || // hits bottom
      (currentSnake[0] % width === width - 1 && direction === 1) || // right wall
      (currentSnake[0] % width === 0 && direction === -1) || // left wall
      (currentSnake[0] - width < 0 && direction === -width) || // top wall
      squares[currentSnake[0] + direction].classList.contains("snake") // hits itself
    ) {
      return clearInterval(interval);
    }

    const tail: number | undefined = currentSnake.pop(); // remove/display last item in array
    if (typeof tail == "number") {
      squares[tail].classList.remove("snake"); // remove `.snake` from tail
      currentSnake.unshift(currentSnake[0] + direction); // direct head

      // collision === fruit
      // based on class names of div
      if (squares[currentSnake[0]].classList.contains("fruit")) {
        squares[currentSnake[0]].classList.remove("fruit");
        squares[currentSnake[0]].removeAttribute("style");
        squares[currentSnake[0]].removeAttribute("id");
        squares[tail].classList.add("snake");
        currentSnake.push(tail);
        randomFruit();
        score++; // increase score
        scoreDisplay!.textContent = score.toString();
        if (score > 14) {
          scoreDisplay?.classList.remove("is-warning");
          scoreDisplay?.classList.add("is-error");
        } else if (score > 9) {
          scoreDisplay?.classList.remove("is-success");
          scoreDisplay?.classList.add("is-warning");
        } else if (score > 4) {
          scoreDisplay?.classList.add("is-success");
        }
        // clear and reset faster interval
        clearInterval(interval);
        intervalTime = intervalTime * speed;
        interval = setInterval(collisions, intervalTime);
      }
      squares[currentSnake[0]].classList.add("snake");
    }
  }

  // update fruit
  function randomFruit() {
    let randomImage: string = images[Math.floor(Math.random() * images.length)];
    do {
      squares[fruitIndex].removeAttribute("style");
      fruitIndex = Math.floor(Math.random() * squares.length);
      squares[fruitIndex].setAttribute("style", "background-image: none");
    } while (squares[fruitIndex].classList.contains("snake"));
    squares[fruitIndex].classList.add("fruit");
    squares[fruitIndex].setAttribute("id", "fruit");
    squares[fruitIndex].setAttribute(
      "style",
      `background-image: url(../images/${randomImage}.jpg)`
    );
  }

  // assign keycode for movement
  function control(e: KeyboardEvent) {
    if (e.keyCode === 39 && direction != -1) {
      direction = 1; // right
    } else if (e.keyCode === 38 && direction != +width) {
      direction = -width; // up
    } else if (e.keyCode === 37 && direction != 1) {
      direction = -1; // left
    } else if (e.keyCode === 40 && direction != -width) {
      direction = +width;
    }
  }

  document.addEventListener("keyup", control);
  startBtn!.addEventListener("click", startGame);
  // end DOMContentLoaded
});
