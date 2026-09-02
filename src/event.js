import { startStage, selectionStage } from "./controller.js";
import { delay } from "./displayAssets.js";
import { renderSelection } from "./display.js";
import { PlayerTypes } from "./types.js";

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
  const grid = renderSelection(
    document.querySelector("#header"),
    mainContainer,
  );

  grid.DOMNode.classList.add("selectionGrid");

  const grid1Tiles = grid.clickableTilesArr;

  grid1Tiles.forEach((tile) => {
    tile.DOMNode.addEventListener("click", () => {
      console.log("Clicked!");
    });
  });
};

const computerPlanningEvent = (player) => {
  const grid = renderSelection(
    document.querySelector("#header"),
    mainContainer,
  );

  grid.DOMNode.classList.add("selectionGrid");

  const grid1Tiles = grid.clickableTilesArr;

  grid1Tiles.forEach((tile) => {
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
