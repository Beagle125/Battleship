import { PlayerList } from "./model.js";
import { renderStart, renderGameplay, renderFooterMessage } from "./display.js";
import {
  humanPlanningEvent,
  computerPlanningEvent,
  playerTurnEvent,
} from "./event.js";
import { PlayerTypes } from "./types.js";

const startStage = () => {
  renderStart(
    document.querySelector("#header"),
    document.querySelector("#mainContainer"),
  );
};

const selectionStage = async (type) => {
  let currPlayers = new PlayerList(type);

  const playerArr = new Array();
  playerArr.push(currPlayers.player1);
  playerArr.push(currPlayers.player2);

  for (const player of playerArr) {
    if (player.type === PlayerTypes.HUMAN) await humanPlanningEvent(player);
    else await computerPlanningEvent(player);
  }

  gameplayStage(currPlayers);
};

const gameplayStage = async (currPlayers) => {
  const { player1Grid, player2Grid } = renderGameplay(
    document.querySelector("#mainContainer"),
  );

  const player1 = { data: currPlayers[0], grid: player1Grid };
  const player2 = { data: currPlayers[1], grid: player2Grid };

  let isGameOver = false;
  let currPlayerIndex = 0;

  while (!isGameOver) {
    let currPlayer;
    if (currPlayerIndex === 1) currPlayer = player1;
    else currPlayer = player2;

    renderFooterMessage(`Player ${currPlayerIndex + 1}'s turn`);

    await playerTurnEvent(currPlayer.data, currPlayer.grid);

    currPlayerIndex = (currPlayerIndex + 1) % 2;
  }
};

export { startStage, selectionStage, gameplayStage };
