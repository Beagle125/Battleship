import { Ship } from "../src/model.js";

test("test the default values of a ship (sunk should be falsy)", () => {
  const myShip = new Ship(5);
  expect(myShip.sunk).toBeFalsy();
});

test("test hit method", () => {
  const myShip = new Ship(5);
  myShip.hit();
  expect(myShip.sunk).toBeFalsy();
});

test("test hit method for a sinking ship", () => {
  const myShip = new Ship(5);
  myShip.hit();
  myShip.hit();
  myShip.hit();
  myShip.hit();
  myShip.hit();
  expect(myShip.sunk).toBeTruthy();
});
