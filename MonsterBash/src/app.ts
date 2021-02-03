const square: NodeListOf<HTMLElement> | null = document.querySelectorAll(
  ".square"
);
const monster: NodeListOf<HTMLElement> | null = document.querySelectorAll(
  ".monster"
);
const timeLeft: HTMLElement | null = document.querySelector("#time-left");
const score: HTMLElement | null = document.querySelector("#score");
const resetBtn: HTMLElement | null = document.querySelector("#reset-button");
var monsterLocation: number | null;
let monsterTimerId: number | undefined;
let result: number = 0;
let currentTime: number = parseInt(timeLeft?.textContent!);

// randomly assign monster to square on function call
function randomSquare() {
  // remove monster class from all squares
  square?.forEach((className: HTMLElement) => {
    className.classList.remove("monster");
  });

  // randomly add 'monster' class to square
  let randomPosition = square![Math.floor(Math.random() * 9)];
  randomPosition.classList.add("monster");
  monsterLocation = parseInt(randomPosition.id);
}

//  track hits/score
// for each square
square.forEach((id: HTMLElement) => {
  // listen for mouseup
  id.addEventListener("mouseup", () => {
    // check square id against monster location
    if (parseInt(id.id) === monsterLocation) {
      // increase score
      result = result + 1;
      // send result to screen
      score!.textContent = result.toString();
    }
  });
});

// move monster location at interval
function moveMonster() {
  monsterTimerId = setInterval(randomSquare, 1000);
  if (currentTime === 0) {
    clearInterval(monsterTimerId);
  }
}

moveMonster();

function countDown() {
  currentTime = currentTime - 1;
  timeLeft!.textContent = currentTime.toString();
  resetBtn!.style.visibility = "hidden";
  if (currentTime < 0) {
    clearInterval(monsterTimerId);
    clearInterval(timerId);
    timeLeft!.textContent = "0";
    alert("Game Over. Final Score: " + result);
    resetBtn!.style.visibility = "visible";
  }
}

let timerId = setInterval(countDown, 1000);

// reset original values
function startGame() {
  clearInterval(timerId);
  monsterTimerId = undefined;
  result = 0;
  score!.textContent = result.toString();
  timeLeft!.textContent = "5";
  currentTime = parseInt(timeLeft!.textContent);
  monsterTimerId = setInterval(randomSquare, 1000);
  timerId = setInterval(countDown, 1000);
}
