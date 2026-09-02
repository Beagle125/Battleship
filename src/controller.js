import { PlayerList } from "./model.js";
import { renderStart, renderSelection } from "./display.js";

let currPlayers;

const startStage = () => {
  renderStart(
    document.querySelector("#header"),
    document.querySelector("#mainContainer"),
  );
};

const selectionStage = (type) => {
  currPlayers = new PlayerList(type);

  // for player 1
  const player1 = currPlayers.player1;
  const grid1 = renderSelection(
    document.querySelector("#header"),
    mainContainer,
  );

  grid1.DOMNode.classList.add("selectionGrid");

  const grid1Tiles = grid1.clickableTilesArr;

  grid1Tiles.forEach((tile) => {
    tile.DOMNode.addEventListener("click", (event) => {
      console.log("Clicked!");
    });
  });

  // for player 2
  const player2 = currPlayers.player2;
};

export { startStage, selectionStage, currPlayers };
