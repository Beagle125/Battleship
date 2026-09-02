const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Button = class {
  #DOMNode;
  constructor(text, ...classes) {
    this.#DOMNode = document.createElement("button");
    for (const type of classes) this.#DOMNode.classList.add(type);
    this.#DOMNode.textContent = text;
  }

  get DOMNode() {
    return this.#DOMNode;
  }
};

const ClickableTile = class {
  #DOMNode;
  #row;
  #col;

  constructor(row, col) {
    this.#DOMNode = document.createElement("div");
    this.#row = row;
    this.#col = col;

    this.#DOMNode.classList.add("clickableTile");
    this.#DOMNode.classList.add("noShip");
    this.#DOMNode.id = `${row}-${col}`;
  }

  get DOMNode() {
    return this.#DOMNode;
  }

  get row() {
    return this.#row;
  }

  get col() {
    return this.#col;
  }
};

const Grid = class {
  #DOMNode;
  #clickableTilesArr;
  constructor() {
    this.#DOMNode = document.createElement("div");
    this.#DOMNode.classList.add("gridBackground");
    this.#clickableTilesArr = new Array();

    for (let row = 0; row < 10; row++) {
      const rowOfTiles = document.createElement("div");
      rowOfTiles.classList.add("rowTiles");
      for (let col = 0; col < 10; col++) {
        const newTile = new ClickableTile(row, col);
        this.#clickableTilesArr.push(newTile);
        rowOfTiles.appendChild(newTile.DOMNode);
      }
      this.#DOMNode.appendChild(rowOfTiles);
    }
  }

  get DOMNode() {
    return this.#DOMNode;
  }

  get clickableTilesArr() {
    return this.#clickableTilesArr;
  }
};

export { delay, Button, Grid, ClickableTile };
