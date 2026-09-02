import { PlayerList } from "./model.js";
import { renderSelection } from "./display.js";
import { PlayerTypes } from "./types.js";

let currPlayers;

const generatePlayers = (type) => {
  renderSelection(document.querySelector("#header"), mainContainer);
  currPlayers = new PlayerList(type);

  // for each player

  // check if its a human or a computer

  // then do the appropriate action
};

export { PlayerList, generatePlayers, currPlayers };
