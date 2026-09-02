import { Gameboard, Player, Ship } from "../src/model.js";
import { PlayerTypes } from "../src/types.js";

test("test the default values of a human player", () => {
  const player1 = new Player(PlayerTypes.HUMAN);
  expect(player1.gameboard).toEqual(new Gameboard());
  expect(player1.type).toEqual(PlayerTypes.HUMAN);
});

test("test the default values of a computer player", () => {
  const player1 = new Player(PlayerTypes.COMPUTER);
  expect(player1.gameboard).toEqual(new Gameboard());
  expect(player1.type).toEqual(PlayerTypes.COMPUTER);
});

test("test setShip for a valid value", () => {
  const player1 = new Player(PlayerTypes.HUMAN);
  const retVal = player1.setShip(new Ship(5), [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ]);
  expect(retVal).toBeTruthy();
});

test("test setShip for an invalid value", () => {
  const player1 = new Player(PlayerTypes.HUMAN);
  const retVal = player1.setShip(new Ship(5), [
    [0, 0],
    [0, -1],
    [0, -2],
    [0, -3],
    [0, -4],
  ]);
  expect(retVal).toBeFalsy();
});
