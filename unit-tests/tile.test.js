import { Tile, Ship } from "../src/model.js";

test("test the default values of a tile", () => {
  const myTile = new Tile();
  expect(myTile.isShip).toBeFalsy();
  expect(myTile.isHit).toBeFalsy();
  expect(myTile.referenceShip).toBeNull();
});

test("markHit changes this.isHit to true from false", () => {
  const myTile = new Tile();
  myTile.markHit(); // this calls the method
  expect(myTile.isHit).toBeTruthy();
});

test("setting a ship reference", () => {
  const myTile = new Tile();
  const myShip = new Ship(5);
  myTile.referenceShip = myShip;

  expect(myTile.referenceShip).toEqual(myShip);
  expect(myTile.isShip).toBeTruthy();
});
