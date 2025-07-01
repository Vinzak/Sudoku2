// Lav sudoku-felter
const sudokuContainer = document.getElementById('sudoku');

// Eksempel på et simpelt Sudoku-spil
const puzzle = [
  [5, 3, null, null, 7, null, null, null, null],
  [6, null, null, 1, 9, 5, null, null, null],
  [null, 9, 8, null, null, null, null, 6, null],
  [8, null, null, null, 6, null, null, null, 3],
  [4, null, null, 8, null, 3, null, null, 1],
  [7, null, null, null, 2, null, null, null, 6],
  [null, 6, null, null, null, null, 2, 8, null],
  [null, null, null, 4, 1, 9, null, null, 5],
  [null, null, null, null, 8, null, null, 7, 9]
];

// Udfyld sudoku-felter i HTML
for (let row = 0; row < 9; row++) {
  for (let col = 0; col < 9; col++) {
    const input = document.createElement('input');
    input.maxLength = 1; // Tillader kun ét tegn
    if (puzzle[row][col] !== null) {
      input.value = puzzle[row][col];
      input.disabled = true; // Gør feltet ikke-redigerbart
    }
    sudokuContainer.appendChild(input);
  }
}

// Validering af Sudoku
document.getElementById('check').addEventListener('click', () => {
  const inputs = sudokuContainer.querySelectorAll('input');
  const grid = Array.from(inputs).map(input => parseInt(input.value, 10) || 0);

  if (isSolved(grid)) {
    document.getElementById('message').textContent = "Du finder det i F/K over skabet ved håndvasken";
  } else {
    document.getElementById('message').textContent = "Fejl! Så nemt slipper du ikke Pernille!";
  }
});

function isSolved(grid) {
  // Tjekker om alle felter er udfyldt
  if (grid.includes(0)) return false;

  // Tjekker rækker, kolonner og bokse
  for (let i = 0; i < 9; i++) {
    if (!isValidGroup(getRow(grid, i)) ||
        !isValidGroup(getCol(grid, i)) ||
        !isValidGroup(getBox(grid, i))) {
      return false;
    }
  }
  return true;
}

function isValidGroup(numbers) {
  const filtered = numbers.filter(n => n > 0);
  return new Set(filtered).size === filtered.length;
}

function getRow(grid, row) {
  return grid.slice(row * 9, row * 9 + 9);
}

function getCol(grid, col) {
  return grid.filter((_, i) => i % 9 === col);
}

function getBox(grid, box) {
  const startRow = Math.floor(box / 3) * 3;
  const startCol = (box % 3) * 3;
  const numbers = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      numbers.push(grid[(startRow + r) * 9 + (startCol + c)]);
    }
  }
  return numbers;
}