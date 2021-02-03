document.addEventListener("DOMContentLoaded", () => {
  const cardArray: Array<{ name: string; [img: string]: string }> = [
    {
      name: "cloud",
      img: "../images/cloud.png",
    },
    {
      name: "cloud",
      img: "../images/cloud.png",
    },

    {
      name: "coin",
      img: "../images/coin.png",
    },
    {
      name: "coin",
      img: "../images/coin.png",
    },

    {
      name: "deadpool",
      img: "../images/deadpool.png",
    },
    {
      name: "deadpool",
      img: "../images/deadpool.png",
    },

    {
      name: "fire_flower",
      img: "../images/fire_flower.png",
    },
    {
      name: "fire_flower",
      img: "../images/fire_flower.png",
    },

    {
      name: "fish",
      img: "../images/fish.png",
    },
    {
      name: "fish",
      img: "../images/fish.png",
    },

    {
      name: "heart",
      img: "../images/heart.png",
    },
    {
      name: "heart",
      img: "../images/heart.png",
    },

    {
      name: "mushroom",
      img: "../images/mushroom.png",
    },
    {
      name: "mushroom",
      img: "../images/mushroom.png",
    },

    {
      name: "star",
      img: "../images/star.png",
    },
    {
      name: "star",
      img: "../images/star.png",
    },
  ];

  // const cardArray: Array<{ name: string; img: string }>;
  cardArray.sort(() => 0.5 - Math.random());
  const grid = document.querySelector(".grid");
  const resultDisplay = document.querySelector<HTMLElement>("#result");
  const restartButton = document.querySelector<HTMLElement>("#restart");
  // var === globallyAccessible
  var cardsChosen: Array<[name: string, img: string]> = [];
  var cardsChosenId: Array<[name: string, img: string]> = [];
  var cardMatches = [];
  var gameOn: boolean = false;

  // map and set array for backs of all cards
  function createBoard() {
    gameOn = true;
    for (let i: number = 0; i < cardArray.length; i++) {
      var card = document.createElement("img");
      card.setAttribute("src", "images/mario_block.jpg");
      card.setAttribute("data-id", i.toString());
      card.addEventListener("click", flipCard);
      grid!.appendChild(card);
    }
  }
  createBoard();

  function resetBoard() {
    gameOn = true;
    grid!.textContent = "";
    resultDisplay!.textContent = "0";
    cardMatches.length = 0;
    restartButton!.style.display = "none";
    createBoard();
  }
  restartButton!.addEventListener("click", resetBoard);

  function flipCard(): void {
    // add DefinitelyTyped Lib?:
    // https://github.com/DefinitelyTyped/DefinitelyTyped
    var cardId = this.getAttribute("data-id");
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute("src", cardArray[cardId].img);
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 200);
    }
  }

  function checkForMatch() {
    var cards = document.querySelectorAll("img");
    const optOne = cardsChosenId[0];
    const optTwo = cardsChosenId[1];
    if (cardsChosen[0] === cardsChosen[1]) {
      alert("Match!");
      cards[optOne].setAttribute("src", "images/mario_bg.jpg");
      cards[optOne].removeEventListener("click", flipCard);
      cards[optTwo].setAttribute("src", "images/mario_bg.jpg");
      cards[optTwo].removeEventListener("click", flipCard);
      cardMatches.push(cardsChosen);
    } else {
      cards[optOne].setAttribute("src", "images/mario_block.jpg");
      cards[optTwo].setAttribute("src", "images/mario_block.jpg");
      alert("Try Again...");
    }

    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay!.textContent = cardMatches.length.toString();
    if (cardMatches.length === cardArray.length / 2) {
      gameOn = false;
      resultDisplay!.textContent = "Congratulations!";
      restartButton!.style.display = "block";
    }
  }
});
