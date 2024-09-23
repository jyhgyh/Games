document.addEventListener('DOMContentLoaded', () => {
  const gridElement = document.querySelector('#grid');
  new Morpion(gridElement);
});


export class Morpion {
  constructor(gridElement) {
    this.gridElement = gridElement;
    this.cells = this.gridElement.querySelectorAll('.cell');
    this.currentPlayer = 1
    this.currentPlayerDisplay = document.getElementById('currentPlayer');
    this.scores = { 1: 0, 2: 0 };
    this.replayButton = document.getElementById('replay');
    this.addEventListeners();
    this.winDisplay = document.querySelector('.win-display');
    this.resetGame();
  }

  addEventListeners() {
    this.cells.forEach(cell => {
      cell.addEventListener('click', () => {
        this.handleClick(cell);
      });
    });

    this.replayButton.addEventListener('click', () => {
      this.resetGame();
    });
  }

  handleClick(cell) {
    if (!cell.textContent && !this.checkWinner()) {
      cell.textContent = this.currentPlayer === 1 ? 'X' : 'O';
      this.winDisplay.opacity = "1";
      this.winDisplay.transform = "translate(0, 0) scale(1)";
      if (this.checkWinner()) {
        this.winDisplay.textContent = `Игрок ${this.currentPlayer} won!`
        this.scores[this.currentPlayer]++;
      } else if (this.checkDraw()) {
        this.winDisplay.textContent = "GGWP!";
      } else {
        this.changePlayer();
      }
    }
  }

  checkWinner() {
    const zxc = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of zxc) {
      const [z, x, c] = combination;
      if (
        this.cells[z].textContent && this.cells[z].textContent === this.cells[x].textContent && this.cells[z].textContent === this.cells[c].textContent) {
        return true;
      }
    }
    return false;
  }

  checkDraw() {
    return [...this.cells].every(cell => cell.textContent)
  }

  changePlayer() {
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    this.currentPlayerDisplay.textContent = `Player ${this.currentPlayer}`;
  }

  resetGame() {
    this.cells.forEach(cell => {
      cell.textContent = '';
    });
    this.currentPlayer = 1;
    this.currentPlayerDisplay.textContent = `Player ${this.currentPlayer}`;
    this.winDisplay.textContent = '';
  }
}

