// script.js
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let gameActive = true;

// Winning combinations
const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6]
];

// Handle cell click
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (!gameState[index] && gameActive) {
      gameState[index] = currentPlayer;
      cell.textContent = currentPlayer;
      checkResult();
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      updateStatus();
    }
  });
});

// Check for win or draw
function checkResult() {
  let roundWon = false;

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
  } else if (!gameState.includes(null)) {
    statusText.textContent = 'Draw!';
    gameActive = false;
  }
}

// Update status text
function updateStatus() {
  if (gameActive) {
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

// Restart game
resetButton.addEventListener('click', () => {
  gameState.fill(null);
  cells.forEach(cell => (cell.textContent = ''));
  currentPlayer = 'X';
  gameActive = true;
  updateStatus();
});

// Initialize game
updateStatus();
