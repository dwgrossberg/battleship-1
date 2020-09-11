import { randCoords } from '../helpers/helpers';

const Gameboard = () => {
  // create a board 10x10, coords board[row][col];
  let board = Array(10).fill(null).map(() => Array(10).fill(null));
  const getBoard = () => board;

  let placedShips = [];

  // place ship at coords (y, x)
  const placeShip = (ship, y0, x0) => {
    const direction = ship.getDirection();
    // checks if out-of-bounds/collision
    const valid = checkValid(ship.length, direction, y0, x0);
    if (valid) {
      for (let i = 0; i < ship.length; i++) {
        // default: horizontal
        let x = x0 + i;
        let y = y0;
        if (direction === 'vertical') {
          x = x0;
          y = y0 + i;
        }
        // places ship w/index
        board[y][x] = { ship, index: i };
      }
      // adds it to placedShips
      placedShips.push(ship);
      return valid;
    } else {
      return valid;
    }
  };

  const checkValid = (length, direction, y0, x0) => {
    const cells = [];
    for (let i = 0; i < length; i++) {
      // default: horizontal
      let x = x0 + i;
      let y = y0;
      if (direction === 'vertical') {
        x = x0;
        y = y0 + i;
      }
      // checks that y/x are in-bounds
      if (y < 10 && x < 10) {
        cells.push(board[y][x]);
      } else {
        return false;
      }
    }
    return cells.every((cell) => cell === null);
  };

  const autoPlace = (ship) => {
    const [y, x] = randCoords();
    const changeOrient = Math.random() > 0.5;
    if (changeOrient) ship.changeDirection();
    const placed = placeShip(ship, y, x);
    if (!placed) autoPlace(ship);
  };

  const autoPlaceFleet = (fleet) => {
    for (const ship in fleet) {
      autoPlace(fleet[ship]);
    }
  };

  const receiveAttack = (y, x) => {
    // determines whether or not the attack hit a ship
    if (board[y][x] === null) {
      // records missed shot
      board[y][x] = 'miss';
    } else if (board[y][x].ship) {
      // calls ‘hit’ function of the correct ship
      board[y][x].ship.hit(board[y][x].index);
      // Records attacked cell wit 'hit' (prevents future .ship.hit())
      board[y][x] = 'hit';
    }
    return board[y][x];
  };

  const areShipsSunk = () => placedShips.every((ship) => ship.isSunk());

  const reset = () => {
    board = Array(10).fill(null).map(() => Array(10).fill(null));
    placedShips = [];
  };

  return {
    getBoard,
    placeShip,
    receiveAttack,
    areShipsSunk,
    autoPlaceFleet,
    reset,
  };
};

export default Gameboard;
