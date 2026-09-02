import "./styles.css";
import { loadStartEvent, loadTwoPlayersEvent } from "./event.js";
import { gameplayStage } from "./controller.js";
import { Player, Ship } from "./model.js";
import { PlayerTypes } from "./types.js";

//loadStartEvent();

const player1 = new Player(PlayerTypes.HUMAN);
const player2 = new Player(PlayerTypes.COMPUTER);

player1.setShip(new Ship(3), [
  [0, 0],
  [0, 1],
  [0, 2],
]);
player2.setShip(new Ship(3), [
  [0, 0],
  [0, 1],
  [0, 2],
]);

gameplayStage([player1, player2]);
