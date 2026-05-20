let boxes = document.querySelectorAll(".box");
let startBtn = document.querySelector("#start-btn");
let gameContainer = document.querySelector("#game-container");
let restartBtn = document.querySelector("#restart-btn");
let resetBtn = document.querySelector("#reset-btn");
let turnIndicator = document.querySelector("#turn-indicator");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let playerXName = "";
let playerOName = "";
let xScore = 0;
let oScore = 0;
let currentStarter = "O";

let playerXInput = document.querySelector("#playerX");
let playerOInput = document.querySelector("#playerO");
let xScoreDisplay = document.querySelector("#x-score");
let oScoreDisplay = document.querySelector("#o-score");

if (currentStarter === "O") {
  turnO = true;
  currentStarter = "X";
} 
else {
  turnO = false;
  currentStarter = "O";
}
let count = 0;
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

startBtn.addEventListener("click", () => {
  playerXName = playerXInput.value.trim();
  playerOName = playerOInput.value.trim();
  if (playerXName === "" || playerOName === "") {
    alert("Please Enter Both Player Names");
    return;
  }
  xScoreDisplay.innerText = `${playerXName} (X) : ${xScore}`;
  oScoreDisplay.innerText = `${playerOName} (O) : ${oScore}`;
  updateTurnIndicator();
  gameContainer.classList.remove("hide");
  document.querySelector(".player-inputs").classList.add("hide");
  startBtn.classList.add("hide");
});

restartBtn.addEventListener("click", () => {
  resetGame();
  xScore = 0;
  oScore = 0;
  xScoreDisplay.innerText = "Player X : 0";
  oScoreDisplay.innerText = "Player O : 0";
  msgContainer.classList.add("hide");
  gameContainer.classList.add("hide");
  document.querySelector(".player-inputs").classList.remove("hide");
  startBtn.classList.remove("hide");
  playerXInput.value = "";
  playerOInput.value = "";
});

const resetGame = () => {
  if (currentStarter === "O") {
    turnO = true;
    currentStarter = "X";
  }
  else {
    turnO = false;
    currentStarter = "O";
  }
  count = 0;
  enableBoxes();
  updateTurnIndicator();
  msgContainer.classList.add("hide");
};

const updateTurnIndicator = () => {
  if (turnO) {
    turnIndicator.innerText = `Current Turn: ${playerOName} (O)`;
  } else {
    turnIndicator.innerText = `Current Turn: ${playerXName} (X)`;
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    playerXName = playerXInput.value;
playerOName = playerOInput.value;
if (playerXName === "" || playerOName === "") {
  alert("Please Enter Both Player Names");
  return;
}
    if (turnO) {
      box.innerText = "O";
      turnO = false;
      updateTurnIndicator();
    } else {
      box.innerText = "X";
      turnO = true;
      updateTurnIndicator();
    }
    box.disabled = true;
    count++;
    let isWinner = checkWinner();
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `It's a Draw.`;
  msgContainer.classList.remove("hide");
  turnIndicator.innerText = "";
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  let winnerName = "";
  if (winner === "X") {
    winnerName = playerXName;
    xScore++;
    xScoreDisplay.innerText = `${playerXName} (X) : ${xScore}`;
  } else {
    winnerName = playerOName;
    oScore++;
    oScoreDisplay.innerText = `${playerOName} (O) : ${oScore}`;
  }
  msg.innerText = `Congratulations ${winnerName} (${winner}) Wins!`;
  msgContainer.classList.remove("hide");
  turnIndicator.innerText = "";
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);