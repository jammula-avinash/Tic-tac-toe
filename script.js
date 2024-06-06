document.addEventListener("DOMContentLoaded", () => {
  const gameBoard = document.getElementById("gameBoard");
  const resultDisplay = document.getElementById("result");
  const resetButton = document.getElementById("resetButton");
  let currentPlayer = "X";
  let board = ["", "", "", "", "", "", "", "", ""];
  let isGameActive = true;

  function handleClick(event) {
    const cellIndex = event.target.dataset.index;
    if (board[cellIndex] !== "" || !isGameActive) {
      return;
    }
    board[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;
    if (checkWin()) {
      resultDisplay.textContent = `Player ${currentPlayer} Wins!`;
      isGameActive = false;
    } else if (board.every((cell) => cell !== "")) {
      resultDisplay.textContent = "It's a Draw!";
      isGameActive = false;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }

  function checkWin() {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winConditions.some((condition) => {
      return condition.every((index) => board[index] === currentPlayer);
    });
  }

  function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    currentPlayer = "X";
    resultDisplay.textContent = "";
    Array.from(gameBoard.children).forEach((cell) => (cell.textContent = ""));
  }

  function createBoard() {
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.dataset.index = i;
      cell.addEventListener("click", handleClick);
      gameBoard.appendChild(cell);
    }
  }

  resetButton.addEventListener("click", resetGame);
  createBoard();
});
