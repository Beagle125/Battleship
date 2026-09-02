import { Gameboard, Player } from "../src/model.js";
import { Types } from "../src/types.js";

test("test the default values of a human player", () => {
  const player1 = new Player(Types.HUMAN);
  expect(player1.gameboard).toEqual(new Gameboard());
  expect(player1.type).toEqual(Types.HUMAN);
});

test("test the default values of a computer player", () => {
  const player1 = new Player(Types.COMPUTER);
  expect(player1.gameboard).toEqual(new Gameboard());
  expect(player1.type).toEqual(Types.COMPUTER);
});
