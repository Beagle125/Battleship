import { startStage, selectionStage } from "./controller.js";
import { delay } from "./displayAssets.js";
import { PlayerTypes } from "./types.js";

const loadStart = () => {
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
  loadStart,
  loadTwoPlayersEvent,
  loadComputerPlayersEvent,
  rotateEvent,
  randomizeEvent,
  finalizeEvent,
};
