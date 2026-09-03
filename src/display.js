import hit from "../static/hit.svg";
import logo from "../static/logo.svg";
import miss from "../static/miss.svg";
import placement from "../static/placement.svg";
import select from "../static/select.svg";

import { Button, Grid } from "./displayAssets.js";
import { loadTwoPlayersEvent, loadComputerPlayersEvent } from "./event.js";

const renderStart = (header, mainContainer) => {
  header.replaceChildren();
  mainContainer.replaceChildren();

  const logoImg = document.createElement("img");
  logoImg.src = logo;
  header.classList.replace("uncentered", "centered");
  header.appendChild(logoImg);

  mainContainer.classList.replace("gameplay", "start");
  const twoPlayerButton = new Button("2 player", "simpleBtn");
  const computerButton = new Button("computer", "simpleBtn");

  twoPlayerButton.DOMNode.addEventListener("click", loadTwoPlayersEvent);
  computerButton.DOMNode.addEventListener("click", loadComputerPlayersEvent);

  mainContainer.appendChild(twoPlayerButton.DOMNode);
  mainContainer.appendChild(computerButton.DOMNode);
};

const renderSelection = (header, mainContainer) => {
  mainContainer.replaceChildren();

  header.classList.replace("centered", "uncentered");

  mainContainer.classList.replace("start", "gameplay");

  const grid = new Grid();

  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("buttonSelectionContainer");
  const rotateBtn = new Button("Rotate", "simpleBtn", "rotateBtn");
  const randomizeBtn = new Button("Randomize", "simpleBtn", "randomizeBtn");
  const finalizeBtn = new Button("Finalize", "criticalBtn", "finalizeBtn");

  buttonsDiv.appendChild(rotateBtn.DOMNode);
  buttonsDiv.appendChild(randomizeBtn.DOMNode);
  buttonsDiv.appendChild(finalizeBtn.DOMNode);

  mainContainer.appendChild(grid.DOMNode);
  mainContainer.appendChild(buttonsDiv);

  return grid;
};

const renderComputerLoader = (header, mainContainer) => {
  mainContainer.replaceChildren();

  header.classList.replace("centered", "uncentered");

  mainContainer.classList.replace("start", "gameplay");

  const loader = document.createElement("div");
  loader.classList.add("spinningIcon");

  renderFooterMessage("Computer placing its fleet...", loader);
};

const renderFooterMessage = (message, ...additional) => {
  if (!document.querySelector(".footerMessage")) {
    const mainContainer = document.querySelector("#mainContainer");
    const footer = document.createElement("p");
    footer.classList.add("footerMessage");
    mainContainer.appendChild(footer);
  }
  const footer = document.querySelector(".footerMessage");
  footer.textContent = message;

  for (const node of additional) footer.appendChild(node);
};

const renderPlacements = (tiles) => {
  for (const tile of tiles) {
    const placementTile = document.createElement("img");
    const node = tile.DOMNode;
    node.classList.remove("noHit");
    placementTile.src = placement;
    placementTile.classList.add("placementTile");
    node.appendChild(placementTile);
  }
};

const renderHoverPlacements = (tiles) => {
  for (const tile of tiles) {
    if (!tile) return;
    const placementTile = document.createElement("img");
    const node = tile.DOMNode;

    if (!node.classList.contains("noHit")) break;
    placementTile.src = placement;
    placementTile.classList.add("placementTile");
    placementTile.classList.add("faded");
    node.appendChild(placementTile);
  }
};

const renderUnhoverPlacements = (tiles) => {
  for (const tile of tiles) {
    if (!tile) return;
    const node = tile.DOMNode;

    if (!node.classList.contains("noHit")) break;
    node.replaceChildren();
  }
};

const renderTile = (tile, data, row, col) => {
  let mark = document.createElement("img");
  mark.classList.add("placementTile");

  if (data.gameboard.grid[row][col].isShip) mark.src = hit;
  else mark.src = miss;

  tile.appendChild(mark);
};

const renderHoverTile = (tile) => {
  if (!tile) return;

  if (!tile.classList.contains("noHit")) return;
  const selectionTile = document.createElement("img");
  selectionTile.src = select;
  selectionTile.classList.add("placementTile");
  selectionTile.classList.add("faded");
  tile.appendChild(selectionTile);
};

const renderUnhoverTile = (tile) => {
  if (tile.classList.contains("noHit")) tile.replaceChildren();
};

const renderGameplay = (mainContainer) => {
  mainContainer.replaceChildren();

  const player1Grid = new Grid();
  const player2Grid = new Grid();

  mainContainer.appendChild(player1Grid.DOMNode);
  mainContainer.appendChild(player2Grid.DOMNode);

  return { player1Grid, player2Grid };
};

export {
  renderStart,
  renderSelection,
  renderFooterMessage,
  renderPlacements,
  renderHoverPlacements,
  renderUnhoverPlacements,
  renderComputerLoader,
  renderGameplay,
  renderHoverTile,
  renderUnhoverTile,
  renderTile,
};
