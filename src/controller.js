import { Player } from "./model.js";

import { renderStart, renderGameplay, renderFooterMessage } from "./display.js";
import {
  humanPlanningEvent,
  computerPlanningEvent,
  playerTurnEvent,
  winningGameEvent,
  loadStartEvent,
} from "./event.js";
import { PlayerTypes } from "./types.js";

const startStage = () => {
  renderStart(
    document.querySelector("#header"),
    document.querySelector("#mainContainer"),
  );
};

const selectionStage = async (type) => {
  const playerArr = new Array();
  playerArr.push(new Player(PlayerTypes.HUMAN));
  playerArr.push(new Player(type));

  for (const player of playerArr) {
    if (player.type === PlayerTypes.HUMAN) await humanPlanningEvent(player);
    else await computerPlanningEvent(player);
  }

  gameplayStage(playerArr);
};

const gameplayStage = async (currPlayers) => {
  const { player1Grid, player2Grid } = renderGameplay(
    document.querySelector("#mainContainer"),
  );

  let isGameOver = false;
  let currPlayerIndex = 0;

  while (!isGameOver) {
    renderFooterMessage(`Player ${currPlayerIndex + 1}'s turn`);
    if (currPlayerIndex === 0) {
      await playerTurnEvent(
        currPlayers[(currPlayerIndex + 1) % 2],
        currPlayers[currPlayerIndex],
        player2Grid,
      );
    } else {
      await playerTurnEvent(
        currPlayers[(currPlayerIndex + 1) % 2],
        currPlayers[currPlayerIndex],
        player1Grid,
      );
    }

    currPlayerIndex = (currPlayerIndex + 1) % 2;

    isGameOver = currPlayers[0].isDefeated() || currPlayers[1].isDefeated();
  }

  let winner;

  if (currPlayers[0].isDefeated()) winner = 2;
  else winner = 1;

  await winningGameEvent(winner);
  loadStartEvent();
};

export { startStage, selectionStage, gameplayStage };
