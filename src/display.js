import hit from "../static/hit.svg";
import logo from "../static/logo.svg";
import miss from "../static/miss.svg";
import placement from "../static/placement.svg";

import { delay, Button, ClickableTile, Grid } from "./displayAssets.js";
import { currPlayers, generatePlayers } from "./controller.js";
import { PlayerTypes } from "./types.js";

const renderStart = (header, mainContainer) => {
  header.replaceChildren();
  mainContainer.replaceChildren();

  const logoImg = document.createElement("img");
  logoImg.src = logo;
  header.classList.replace("uncentered", "centered");
  header.appendChild(logoImg);

  mainContainer.classList.replace("gameplay", "start");
  const twoPlayerButton = new Button(
    "simpleBtn",
    "2 player",
    renderLoadTwoPlayers,
  );
  const computerButton = new Button(
    "simpleBtn",
    "computer",
    renderLoadComputerPlayers,
  );

  mainContainer.appendChild(twoPlayerButton.DOMNode);
  mainContainer.appendChild(computerButton.DOMNode);
};

const renderLoadTwoPlayers = async () => {
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

  generatePlayers(PlayerTypes.HUMAN);
};

const renderLoadComputerPlayers = async () => {
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

  generatePlayers(PlayerTypes.COMPUTER);
};

const renderSelection = (header, mainContainer) => {
  mainContainer.replaceChildren();

  header.classList.replace("centered", "uncentered");

  mainContainer.classList.replace("start", "gameplay");

  const grid = new Grid();
  mainContainer.appendChild(grid.DOMNode);

  return grid;
};

export { renderStart, renderSelection };
