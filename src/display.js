import hit from "../static/hit.svg";
import logo from "../static/logo.svg";
import miss from "../static/miss.svg";
import placement from "../static/placement.svg";

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
  const rotateBtn = new Button("Rotate", "simpleBtn");
  const randomizeBtn = new Button("Randomize", "simpleBtn");
  const finalizeBtn = new Button("Finalize", "criticalBtn");

  buttonsDiv.appendChild(rotateBtn.DOMNode);
  buttonsDiv.appendChild(randomizeBtn.DOMNode);
  buttonsDiv.appendChild(finalizeBtn.DOMNode);

  mainContainer.appendChild(grid.DOMNode);
  mainContainer.appendChild(buttonsDiv);

  return grid;
};

const renderFooterMessage = (message) => {
  if (!document.querySelector(".footerMessage")) {
    const mainContainer = document.querySelector("#mainContainer");
    const footer = document.createElement("p");
    footer.classList.add("footerMessage");
    mainContainer.appendChild(footer);
  }
  const footer = document.querySelector(".footerMessage");
  footer.textContent = message;
};

const renderPlacements = (tiles) => {
  for (const tile of tiles) {
    const placementTile = document.createElement("img");
    const node = tile.DOMNode;
    placementTile.src = placement;
    placementTile.classList.add("placementTile");
    node.appendChild(placementTile);
  }
};

export { renderStart, renderSelection, renderFooterMessage, renderPlacements };
