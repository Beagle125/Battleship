import { Tile } from "../src/model.js";

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
