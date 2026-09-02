const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Button = (type, text, action) => {
  const newButton = document.createElement("button");
  newButton.classList.add(type);
  newButton.textContent = text;

  newButton.addEventListener("click", action);

  return { newButton };
};

export { delay, Button };
