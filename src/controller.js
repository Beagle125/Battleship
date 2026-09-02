import { PlayerList } from "./model.js";
import { Types } from "./types.js";

let currPlayers;

const generatePlayers = (type) => {
  currPlayers = new PlayerList(type);

  // for each player

  // check if its a human or a computer

  // then do the appropriate action
};

export { PlayerList, generatePlayers, currPlayers };
