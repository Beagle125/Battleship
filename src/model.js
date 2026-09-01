const Types = Object.freeze({
  HUMAN: "HUMAN",
  COMPUTER: "COMPUTER",
});

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
  #length;
  #timesHit = 0;
  #sunk = false;

  constructor(length) {
    this.#length = length;
  }

  hit() {
    this.#timesHit += 1;
    this.#checkSunk();
  }

  #checkSunk() {
    if (this.#timesHit == this.#length) this.#sunk = true;
  }

  get sunk() {
    return this.#sunk;
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

  //   playerTurn() {
  //   }

  isWin() {
    return this.#gameboard.allShipsSunk();
  }

  get gameboard() {
    return this.#gameboard;
  }

  get type() {
    return this.#type;
  }
};

export { Tile, Ship, Gameboard, Player, Types };
