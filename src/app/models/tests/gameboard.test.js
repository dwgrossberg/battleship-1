// GAMEBOARD
// place ships at specific coordinates
// receiveAttack function
// keep track of missed attacks
// report whether or not all of their ships have been sunk

import Gameboard from '../factories/gameboard';
import Ship from '../factories/ship';

describe('Gameboard', () => {
  describe('board', () => {
    const gameboard = Gameboard();

    test('empty board', () => {
      const actual = gameboard.getBoard().every((square) => square === null);
      const expected = false;
      expect(actual).toBe(expected);
    });
    test('board row', () => {
      const actual = gameboard.getBoard().length;
      const expected = 10;
      expect(actual).toBe(expected);
    });
    test('board column', () => {
      const actual = gameboard.getBoard()[0].length;
      const expected = 10;
      expect(actual).toBe(expected);
    });
  });

  describe('place ship', () => {
    const gameboard = Gameboard();
    const ship = Ship('cruiser');
    gameboard.placeShip(ship, 3, 2);

    test('placed ship at starter coord w/index: 0', () => {
      const actual = gameboard.getBoard()[3][2];
      expect(actual).toEqual({ ship, index: 0 });
    });
    test('placed ship at coord w/index: 1', () => {
      const actual = gameboard.getBoard()[3][3];
      expect(actual).toEqual({ ship, index: 1 });
    });
    test('placed ship at final coord w/index: 2', () => {
      const actual = gameboard.getBoard()[3][4];
      expect(actual).toEqual({ ship, index: 2 });
    });
  });
});
