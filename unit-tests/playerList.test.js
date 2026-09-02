import { PlayerList } from "../src/model.js";
import { PlayerTypes } from "../src/PlayerTypes.js";

test("2 human players", () => {
  const list = new PlayerList(PlayerTypes.HUMAN);

  expect(list.player1.type).toEqual(PlayerTypes.HUMAN);
  expect(list.player2.type).toEqual(PlayerTypes.HUMAN);
});

test("1 human, 1 computer player", () => {
  const list = new PlayerList(PlayerTypes.COMPUTER);

  expect(list.player1.type).toEqual(PlayerTypes.HUMAN);
  expect(list.player2.type).toEqual(PlayerTypes.COMPUTER);
});
