import { startStage, selectionStage } from "./controller.js";
import { delay, ClickableTile } from "./displayAssets.js";
import {
  renderSelection,
  renderFooterMessage,
  renderPlacements,
} from "./display.js";
import { PlayerTypes } from "./types.js";
import { Fleet } from "./model.js";

const loadStartEvent = () => {
  startStage();
};

const loadTwoPlayersEvent = async () => {
  const mainContainer = document.querySelector("#mainContainer");
  mainContainer.replaceChildren();

  const loadMessage = document.createElement("p");
  loadMessage.textContent = "Loading Fleet";
  loadMessage.classList.add("loadingMessage");
  mainContainer.appendChild(loadMessage);

  const loadingIcon = document.createElement("div");
  loadingIcon.classList.add("spinningIcon");
  mainContainer.appendChild(loadingIcon);

  await delay(2000);

  selectionStage(PlayerTypes.HUMAN);
};

const loadComputerPlayersEvent = async () => {
  const mainContainer = document.querySelector("#mainContainer");
  mainContainer.replaceChildren();

  const loadMessage = document.createElement("p");
  loadMessage.textContent = "Loading Fleet";
  loadMessage.classList.add("loadingMessage");
  mainContainer.appendChild(loadMessage);

  const loadingIcon = document.createElement("div");
  loadingIcon.classList.add("spinningIcon");
  mainContainer.appendChild(loadingIcon);

  await delay(2000);

  selectionStage(PlayerTypes.COMPUTER);
};

const humanPlanningEvent = (player) => {
  const verticalAxis = true;
  let currShip;
  let shipNum = 0;

  const grid = renderSelection(
    document.querySelector("#header"),
    mainContainer,
  );
  grid.DOMNode.classList.add("selectionGrid");
  const gridTiles = grid.clickableTilesArr;

  const fleet = Fleet();

  renderFooterMessage(`Selecting the ${fleet[shipNum].name}`);

  gridTiles.forEach((tile) => {
    tile.DOMNode.addEventListener("click", () => {
      const coords = new Array();
      const placements = new Array();
      const ship = fleet[shipNum];
      coords.push([tile.row, tile.col]);

      for (let i = 1; i < ship.shipLength; i++) {
        if (verticalAxis) coords.push([tile.row + i, tile.col]);
        else coords.push([tile.row, tile.col - i]);
      }

      for (const coord of coords) {
        const clickableTile = gridTiles.find(
          (obj) => obj.row === coord[0] && obj.col === coord[1],
        );
        placements.push(clickableTile);
      }

      if (player.setShip(ship, coords)) {
        shipNum += 1;
        renderPlacements(placements);
        renderFooterMessage(`Selecting the ${fleet[shipNum].name}`);
      }
    });
  });
};

const computerPlanningEvent = (player) => {
  const grid = renderSelection(
    document.querySelector("#header"),
    mainContainer,
  );

  grid.DOMNode.classList.add("selectionGrid");

  const gridTiles = grid.clickableTilesArr;

  gridTiles.forEach((tile) => {
    tile.DOMNode.addEventListener("click", (event) => {
      console.log("Clicked!");
    });
  });
};

const rotateEvent = () => {
  console.log("rotate");
};

const randomizeEvent = () => {
  console.log("randomize");
};

const finalizeEvent = () => {
  console.log("finalize");
};

export {
  loadStartEvent,
  loadTwoPlayersEvent,
  loadComputerPlayersEvent,
  humanPlanningEvent,
  computerPlanningEvent,
  rotateEvent,
  randomizeEvent,
  finalizeEvent,
};
