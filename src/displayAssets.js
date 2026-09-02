const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Button = class {
  #DOMNode;
  constructor(type, text, action) {
    this.#DOMNode = document.createElement("button");
    this.#DOMNode.classList.add(type);
    this.#DOMNode.textContent = text;
    this.#DOMNode.addEventListener("click", action);
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
};

export { delay, Button, Grid, ClickableTile };
