import { startStage, selectionStage } from "./controller.js";
import { delay, Grid } from "./displayAssets.js";
import {
  renderSelection,
  renderFooterMessage,
  renderPlacements,
  renderHoverPlacements,
  renderUnhoverPlacements,
  renderComputerLoader,
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

const positionShips = (gridTiles, tile, verticalAxis, ship) => {
  const coords = new Array();
  const placements = new Array();

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

  return { coords, placements };
};

const humanPlanningEvent = (player) =>
  new Promise((resolve) => {
    let verticalAxis = true;
    let shipNum = 0;
    const mainContainer = document.querySelector("#mainContainer");

    const grid = renderSelection(
      document.querySelector("#header"),
      mainContainer,
    );
    grid.DOMNode.classList.add("selectionGrid");
    const gridTiles = grid.clickableTilesArr;

    const fleet = Fleet();

    renderFooterMessage(`Selecting the ${fleet[shipNum].name}`);

    gridTiles.forEach((tile) => {
      // inputting ships
      tile.DOMNode.addEventListener("click", () => {
        if (shipNum === fleet.length) return;
        const { coords, placements } = positionShips(
          gridTiles,
          tile,
          verticalAxis,
          fleet[shipNum],
        );

        if (player.setShip(fleet[shipNum], coords)) {
          shipNum += 1;
          renderPlacements(placements);
          if (shipNum < fleet.length)
            renderFooterMessage(`Selecting the ${fleet[shipNum].name}`);
          else renderFooterMessage("Ready for battle!");
        }
      });

      // hovering over tiles
      tile.DOMNode.addEventListener("mouseenter", () => {
        if (shipNum === fleet.length) return;
        const placements = positionShips(
          gridTiles,
          tile,
          verticalAxis,
          fleet[shipNum],
        ).placements;

        renderHoverPlacements(placements);
      });

      // unhovering over tiles
      tile.DOMNode.addEventListener("mouseleave", () => {
        if (shipNum === fleet.length) return;
        const placements = positionShips(
          gridTiles,
          tile,
          verticalAxis,
          fleet[shipNum],
        ).placements;

        renderUnhoverPlacements(placements);
      });
    });

    // button events
    document.addEventListener("click", async (event) => {
      const targetRotate = event.target.closest(".rotateBtn");
      const targetRandomize = event.target.closest(".randomizeBtn");
      const targetFinalize = event.target.closest(".finalizeBtn");

      if (targetRotate) {
        verticalAxis = rotateEvent(verticalAxis);
      } else if (targetRandomize) {
        const loader = document.createElement("div");
        loader.classList.add("spinningIcon");
        renderFooterMessage("Placing your ships", loader);
        await randomizeEvent(player, gridTiles, shipNum, fleet);
        shipNum = fleet.length;
        renderFooterMessage("Ready for battle!");
      } else if (targetFinalize) {
        if (finalizeEvent(shipNum, fleet)) {
          resolve(true);
        }
      }
    });
  });

const computerPlanningEvent = (player) =>
  new Promise(async (resolve) => {
    let shipNum = 0;
    const fleet = Fleet();
    const mainContainer = document.querySelector("#mainContainer");
    const grid = new Grid();
    const gridTiles = grid.clickableTilesArr;

    renderComputerLoader(document.querySelector("#header"), mainContainer);

    await randomizeEvent(player, gridTiles, shipNum, fleet);
    resolve(true);
  });

const rotateEvent = (isVertical) => {
  return !isVertical;
};

const randomizeEvent = async (player, gridTiles, shipNum, fleet) => {
  let verticalAxis = true;

  for (let currShipNum = shipNum; currShipNum < fleet.length; currShipNum++) {
    if (Math.floor(Math.random() * 2)) verticalAxis = rotateEvent(verticalAxis);

    const filteredTiles = gridTiles.filter((tile) =>
      tile.DOMNode.classList.contains("noShip"),
    );
    let isValid = false;

    while (!isValid) {
      const tile =
        filteredTiles[Math.floor(Math.random() * filteredTiles.length)];
      const { coords, placements } = positionShips(
        gridTiles,
        tile,
        verticalAxis,
        fleet[currShipNum],
      );

      if (player.setShip(fleet[currShipNum], coords)) {
        isValid = true;
        if (player.type === PlayerTypes.HUMAN) renderPlacements(placements);
      }
    }
    await delay(1000);
  }
};

const finalizeEvent = (shipNum, fleet) => {
  return shipNum === fleet.length;
};

const playerTurnEvent = (opponent, data, grid) =>
  new Promise((resolve) => {
    const gridArr = grid.clickableTilesArr;

    // handler function
    const handler = (event) => {
      let targetTile = event.target.closest(".clickableTile");

      if (targetTile) {
        // find the appropriate tile
        const currTile = gridArr.find(
          (tile) => tile.DOMNode.id === targetTile.id,
        );

        const retVal = data.playerTurn(opponent, currTile.row, currTile.col);

        if (retVal) {
          document.removeEventListener("click", handler);
          resolve(true);
        }
      }
    };

    document.addEventListener("click", handler);
  });

export {
  loadStartEvent,
  loadTwoPlayersEvent,
  loadComputerPlayersEvent,
  humanPlanningEvent,
  computerPlanningEvent,
  rotateEvent,
  randomizeEvent,
  finalizeEvent,
  playerTurnEvent,
};
