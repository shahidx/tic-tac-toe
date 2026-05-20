let boxes = document.querySelectorAll(".box");
let startBtn = document.querySelector("#start-btn");
let gameContainer = document.querySelector("#game-container");
let restartBtn = document.querySelector("#restart-btn");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let playerXName = "";
let playerOName = "";

let playerXInput = document.querySelector("#playerX");
let playerOInput = document.querySelector("#playerO");

let turnO = true;
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
  gameContainer.classList.remove("hide");
  document.querySelector(".player-inputs").classList.add("hide");
  startBtn.classList.add("hide");
});

restartBtn.addEventListener("click", () => {
  resetGame();
  msgContainer.classList.add("hide");
  gameContainer.classList.add("hide");
  document.querySelector(".player-inputs").classList.remove("hide");
  startBtn.classList.remove("hide");
  playerXInput.value = "";
  playerOInput.value = "";
});

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
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
    } else {
      box.innerText = "X";
      turnO = true;
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
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
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
  } else {
    winnerName = playerOName;
  }
  msg.innerText = `Congratulations ${winnerName} (${winner}) Wins!`;
  msgContainer.classList.remove("hide");
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