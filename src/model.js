import { StatusTypes } from "./types.js";

const Tile = class {
  #isShip = false;
  #isHit = false;
  #referenceShip = null;

  constructor() {}

  markHit() {
    this.#isHit = true;

    if (this.#isShip) this.referenceShip.hit();
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
    else if (this.#grid[row][col].isHit) throw new Error("Already hit");

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

  playerTurn(player, row, col) {
    try {
      player.#gameboard.receiveAttack(row, col);
      return true;
    } catch (error) {
      return false;
    }
  }

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

const AI = class {
  /* 
    statuses
  random choosing
  
  1 in a row hit
    it will check the left first, then up, then right, then down.
    Once it has exhausted all 4 directions, it will go back to random choosing
  
  2 in a row hit
    it will keep going the same direction until hitting a miss, then it will go back 
    to the previous starge (1 in a row hit)
  */

  #status;
  #referenceTile;
  #direction;
  #streak;

  constructor() {
    this.#status = StatusTypes.RANDOM;
    this.#referenceTile = null;
    this.#direction = null;
    this.#streak = 1;
  }

  evaluateChoice(isSuccess, clickableTile) {
    switch (this.#status) {
      case StatusTypes.RANDOM:
        if (isSuccess) {
          this.#status = StatusTypes.ONE;
          this.#referenceTile = clickableTile;
          this.#streak = 1;
          this.#direction = 0;
        }
        break;
      case StatusTypes.ONE:
        if (isSuccess) {
          this.#status = StatusTypes.TWO;
          this.#streak += 1;
        } else if (!isSuccess && this.#direction < 3) {
          this.#direction += 1;
          this.#streak = 1;
        } else {
          this.#status = StatusTypes.RANDOM;
          this.#referenceTile = null;
          this.#direction = null;
        }
        break;
      case StatusTypes.TWO:
        if (!isSuccess && this.#direction < 3) {
          this.#status = StatusTypes.ONE;
          this.#direction += 1;
          this.#streak = 1;
        } else if (!isSuccess && this.#direction >= 3) {
          this.#status = StatusTypes.RANDOM;
          this.#referenceTile = null;
          this.#direction = null;
          this.#streak = 1;
        } else {
          this.#streak += 1;
        }
        break;
    }
  }
  makeChoice(filteredTiles) {
    let chosenTile = null;

    while (chosenTile == null) {
      switch (this.#status) {
        case StatusTypes.RANDOM:
          chosenTile =
            filteredTiles[Math.floor(Math.random() * filteredTiles.length)];
          break;
        case StatusTypes.ONE:
          const targetProperties = this.generateTargetTile();
          chosenTile = filteredTiles.find(
            (tile) =>
              tile.row === targetProperties[0] &&
              tile.col === targetProperties[1],
          );

          if (chosenTile == null && this.#direction < 3) this.#direction += 1;
          else if (chosenTile == null && this.#direction >= 3) {
            this.#status = StatusTypes.RANDOM;
            this.#referenceTile = null;
            this.#direction = null;
          }
          break;
        case StatusTypes.TWO:
          const targetPropertiesTwo = this.generateTargetTile();
          chosenTile = filteredTiles.find(
            (tile) =>
              tile.row === targetPropertiesTwo[0] &&
              tile.col === targetPropertiesTwo[1],
          );

          if (chosenTile == null && this.#direction < 3) {
            this.#status = StatusTypes.ONE;
            this.#direction += 1;
            this.#streak = 1;
          } else if (chosenTile == null && this.#direction >= 3) {
            this.#status = StatusTypes.RANDOM;
            this.#referenceTile = null;
            this.#direction = null;
            this.#streak = 0;
          }
      }
    }

    return chosenTile;
  }

  generateTargetTile() {
    switch (this.#direction) {
      case 0: // left
        return [
          this.#referenceTile.row,
          this.#referenceTile.col - this.#streak,
        ];
      case 1: // up
        return [
          this.#referenceTile.row - this.#streak,
          this.#referenceTile.col,
        ];
      case 2: // right
        return [
          this.#referenceTile.row,
          this.#referenceTile.col + this.#streak,
        ];
      case 3: // down
        return [
          this.#referenceTile.row + this.#streak,
          this.#referenceTile.col,
        ];
    }
  }

  get status() {
    return this.#status;
  }

  get referenceTile() {
    return this.#referenceTile;
  }

  get direction() {
    return this.#direction;
  }
};

export { Tile, Ship, Gameboard, Player, Fleet, AI };
