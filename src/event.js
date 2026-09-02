import { startStage, selectionStage } from "./controller.js";
import { delay, ClickableTile } from "./displayAssets.js";
import {
  renderSelection,
  renderFooterMessage,
  renderPlacements,
  renderHoverPlacements,
  renderUnhoverPlacements,
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

const humanPlanningEvent = (player) => {
  let verticalAxis = true;
  let shipNum = 0;
  const maxShips = 5;

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
      if (shipNum === maxShips) return;
      const { coords, placements } = positionShips(
        gridTiles,
        tile,
        verticalAxis,
        fleet[shipNum],
      );

      if (player.setShip(fleet[shipNum], coords)) {
        shipNum += 1;
        renderPlacements(placements);
        if (shipNum < maxShips)
          renderFooterMessage(`Selecting the ${fleet[shipNum].name}`);
        else renderFooterMessage("Ready for battle!");
      }
    });

    // hovering over tiles
    tile.DOMNode.addEventListener("mouseenter", () => {
      if (shipNum === maxShips) return;
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
      if (shipNum === maxShips) return;
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
  document.addEventListener("click", (event) => {
    const targetRotate = event.target.closest(".rotateBtn");

    if (targetRotate) {
      verticalAxis = rotateEvent(verticalAxis);
    }
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

const rotateEvent = (isVertical) => {
  return !isVertical;
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
