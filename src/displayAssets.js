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

export { delay, Button };
