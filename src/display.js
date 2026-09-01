import hit from "../static/hit.svg";
import logo from "../static/logo.svg";
import miss from "../static/miss.svg";
import placement from "../static/placement.svg";

const Button = (type, text, action) => {
  const newButton = document.createElement("button");
  newButton.classList.add(type);
  newButton.textContent = text;

  return { newButton, action };
};

const renderStart = (header, mainContainer) => {
  header.replaceChildren();
  mainContainer.replaceChildren();

  const logoImg = document.createElement("img");
  logoImg.src = logo;
  header.classList.replace("uncentered", "centered");
  header.appendChild(logoImg);

  mainContainer.classList.replace("gameplay", "start");
  const twoPlayerButton = Button("simpleBtn", "2 player", () => {
    console.log("2 player");
  });
  const computerButton = Button("simpleBtn", "computer", () => {
    console.log("computer");
  });

  mainContainer.appendChild(twoPlayerButton.newButton);
  mainContainer.appendChild(computerButton.newButton);
};

export { renderStart };
