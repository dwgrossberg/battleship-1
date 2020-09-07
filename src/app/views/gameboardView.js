import { elements } from './base';

const gameboardView = (() => {
  const renderCell = (y, x, status) =>
    `<div class="grid-cell cell-${y}-${x} ${status}" data-y='${y}' data-x='${x}'></div>`;

  const renderGrid = (parent, gameboard) => {
    clearGrid(parent);
    const board = gameboard.getBoard();
    const length = board.length;
    let grid = '';
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        let status = board[i][j];
        if (status === null) {
          status = '';
        } else if (status.ship) {
          status = 'placed';
        }
        grid += renderCell(i, j, status);
      }
    }
    parent.insertAdjacentHTML('afterbegin', grid);
  };

  const clearGrid = (parent) => {
    parent.textContent = '';
  };

  const renderWinner = (winner) => {
    elements.winnerText.textContent = `${winner.toUpperCase()} WINS!`;
  };

  return { renderGrid, renderWinner };
})();

export default gameboardView;
