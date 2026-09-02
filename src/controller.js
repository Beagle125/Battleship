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

  let isGameOver = false;
  let currPlayerIndex = 0;

  // main game loop
  while (!isGameOver) {
    renderFooterMessage(`Player ${currPlayerIndex + 1}'s turn`);
    if (currPlayerIndex === 0) {
      await playerTurnEvent(
        currPlayers[(currPlayerIndex + 1) % 2],
        currPlayers[currPlayerIndex],
        player1Grid,
      );
    } else {
      await playerTurnEvent(
        currPlayers[(currPlayerIndex + 1) % 2],
        currPlayers[currPlayerIndex],
        player2Grid,
      );
    }

    currPlayerIndex = (currPlayerIndex + 1) % 2;

    isGameOver = currPlayers[0].isDefeated() || currPlayers[1].isDefeated();
    console.log(isGameOver + ":" + currPlayerIndex);
  }
};

export { startStage, selectionStage, gameplayStage };
