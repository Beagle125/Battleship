import { PlayerList } from "../src/model.js";
import { Types } from "../src/types.js";

test("2 human players", () => {
  const list = new PlayerList(Types.HUMAN);

  expect(list.player1.type).toEqual(Types.HUMAN);
  expect(list.player2.type).toEqual(Types.HUMAN);
});

test("1 human, 1 computer player", () => {
  const list = new PlayerList(Types.COMPUTER);

  expect(list.player1.type).toEqual(Types.HUMAN);
  expect(list.player2.type).toEqual(Types.COMPUTER);
});
