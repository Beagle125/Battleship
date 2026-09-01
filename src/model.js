const Tile = class {
  #isShip = false;
  #isHit = false;
  #referenceShip = null;

  constructor() {}

  markHit() {
    this.#isHit = true;
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

export { Tile, Ship };
