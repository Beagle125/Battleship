import { PlayerTypes } from "./types.js";

const Tile = class {
  #isShip = false;
  #isHit = false;
  #referenceShip = null;

  constructor() {}

  markHit() {
    this.#isHit = true;

    if (this.#referenceShip) this.referenceShip.hit();
  }

  get isShip() {
    return this.#isShip;
  }

  get isHit() {
    return this.#isHit;
  }

  get referenceShip() {
    return this.#referenceShip;
  }

  set referenceShip(ship) {
    this.#referenceShip = ship;
    this.#isShip = true;
  }
};

const Ship = class {
  #shipLength;
  #timesHit = 0;
  #sunk = false;
  #name;

  constructor(length, name = "Carrier") {
    this.#shipLength = length;
    this.#name = name;
  }

  hit() {
    this.#timesHit += 1;
    this.#checkSunk();
  }

  #checkSunk() {
    if (this.#timesHit == this.#shipLength) this.#sunk = true;
  }

  get sunk() {
    return this.#sunk;
  }

  get name() {
    return this.#name;
  }

  get shipLength() {
    return this.#shipLength;
  }
};

const Gameboard = class {
  #ships = new Array(); // array of ships
  #grid = new Array(); // 2D array of tiles

  constructor() {
    // populate the grid with empty tiles
    for (let i = 0; i < 10; i++) {
      this.#grid.push(Array.from({ length: 10 }, () => new Tile()));
    }
  }

  receiveAttack(row, col) {
    const min = 0,
      max = 9;

    if (row < min || row > max || col < min || col > max)
      throw new Error("Out of bounds coordinates");

    const currTile = this.#grid[row][col];
    currTile.markHit();
  }

  allShipsSunk() {
    return this.#ships.every((ship) => ship.sunk === true);
  }

  addShip(ship, coords) {
    this.#ships.push(ship);

    for (const pair of coords) {
      const currTile = this.#grid[pair[0]][pair[1]];
      currTile.referenceShip = ship;
    }
  }

  get grid() {
    return this.#grid;
  }
};

const Player = class {
  #gameboard;
  #type;

  constructor(type) {
    this.#type = type;
    this.#gameboard = new Gameboard();
  }

  setShip(ship, coords) {
    const min = 0,
      max = 9;
    let retVal =
      coords.flat().every((num) => num >= min && num <= max) &&
      coords.every((arr) => !this.#gameboard.grid[arr[0]][arr[1]].isShip);

    if (retVal) this.#gameboard.addShip(ship, coords);

    return retVal;
  }

  //  playerTurn() {}

  isDefeated() {
    return this.#gameboard.allShipsSunk();
  }

  get gameboard() {
    return this.#gameboard;
  }

  get type() {
    return this.#type;
  }
};

const PlayerList = class {
  #player1;
  #player2;
  constructor(type) {
    this.#player1 = new Player(PlayerTypes.HUMAN);
    this.#player2 = new Player(type);
  }

  get player1() {
    return this.#player1;
  }

  get player2() {
    return this.#player2;
  }
};

const Fleet = () => {
  const fleet = [
    new Ship(5, "Carrier"),
    new Ship(4, "Battleship"),
    new Ship(3, "Destroyer"),
    new Ship(3, "Submarine"),
    new Ship(2, "Patrol"),
  ];

  return fleet;
};

export { Tile, Ship, Gameboard, Player, PlayerList, Fleet };
