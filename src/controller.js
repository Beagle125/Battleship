import { PlayerList } from "./model.js";
import { renderSelection } from "./display.js";
import { Grid, ClickableTile } from "./displayAssets.js";
import { PlayerTypes } from "./types.js";

let currPlayers;

const generatePlayers = (type) => {
  currPlayers = new PlayerList(type);

  // for player 1
  const player1 = currPlayers.player1;
  const grid1 = renderSelection(
    document.querySelector("#header"),
    mainContainer,
  );

  const grid1Tiles = grid1.clickableTilesArr;

  grid1Tiles.forEach((tile) => {
    tile.DOMNode.addEventListener("click", (event) => {
      console.log("Clicked!");
    });
  });

  // for player 2
  const player2 = currPlayers.player2;
};

export { PlayerList, generatePlayers, currPlayers };
