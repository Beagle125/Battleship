import { PlayerList } from "./model.js";
import { renderStart, renderSelection } from "./display.js";
import { humanPlanningEvent, computerPlanningEvent } from "./event.js";
import { PlayerTypes } from "./types.js";

let currPlayers;

const startStage = () => {
  renderStart(
    document.querySelector("#header"),
    document.querySelector("#mainContainer"),
  );
};

const selectionStage = async (type) => {
  currPlayers = new PlayerList(type);

  const playerArr = new Array();
  playerArr.push(currPlayers.player1);
  playerArr.push(currPlayers.player2);

  for (const player of playerArr) {
    if (player.type === PlayerTypes.HUMAN) await humanPlanningEvent(player);
    else await computerPlanningEvent(player);
  }

  startStage();
};

export { startStage, selectionStage, currPlayers };
