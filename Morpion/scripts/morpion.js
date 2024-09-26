document.addEventListener('DOMContentLoaded', () => {
  const gridElement = document.querySelector('#grid');
  new Morpion(gridElement);
});

export class Morpion {
  constructor(gridElement) {
    this.gridElement = gridElement;
    this.cells = this.gridElement.querySelectorAll('.cell');
    this.currentPlayer = 1;
    this.currentPlayerDisplay = document.getElementById('currentPlayer');
    this.scores = { 1: 0, 2: 0 };
    this.replayButton = document.getElementById('replay');
    this.addEventListeners();
    this.winDisplay = document.querySelector('.win-display');
    this.resetGame();
  }

  addEventListeners() {
    this.cells.forEach(cell => {
      cell.addEventListener('click', () => this.handleClick(cell));
    });

    this.replayButton.addEventListener('click', () => {
      this.resetGame();
    });
  }

  handleClick(cell) {
    if (!cell.textContent && !this.checkWinner()) {
      cell.textContent = this.currentPlayer === 1 ? 'X' : 'O';
      
      if (this.checkWinner()) {
        this.winDisplay.textContent = `Joueur ${this.currentPlayer} gagnée!`;
        this.scores[this.currentPlayer]++;
        this.updateScores();
        this.showWinMessage();
      } else if (this.checkDraw()) {
        this.winDisplay.textContent = "Cravate!";
        this.showWinMessage();
      } else {
        this.changePlayer();
      }
    }
  }

  checkWinner() {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        this.cells[a].textContent &&
        this.cells[a].textContent === this.cells[b].textContent &&
        this.cells[a].textContent === this.cells[c].textContent
      ) {
        return true;
      }
    }
    return false;
  }

  checkDraw() {
    return [...this.cells].every(cell => cell.textContent);
  }

  changePlayer() {
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    this.currentPlayerDisplay.textContent = `Joueur ${this.currentPlayer}`;
  }

  resetGame() {
    this.cells.forEach(cell => {
      cell.textContent = '';
    });
    this.currentPlayer = 1;
    this.currentPlayerDisplay.textContent = `Joueur ${this.currentPlayer}`;
    this.winDisplay.textContent = '';
    this.hideWinMessage();
  }

  updateScores() {
    document.getElementById('playerOne').textContent = this.scores[1];
    document.getElementById('playerTwo').textContent = this.scores[2];
  }

  showWinMessage() {
    this.winDisplay.style.opacity = '1';
    this.winDisplay.style.transform = 'translate(0, 0) scale(1)';
  }

  hideWinMessage() {
    this.winDisplay.style.opacity = '0';
    this.winDisplay.style.transform = 'translate(0, 50px) scale(0.5)';
  }
}
