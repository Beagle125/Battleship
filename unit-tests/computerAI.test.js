import { AI } from "../src/model";
import { ClickableTile } from "../src/displayAssets";
import { StatusTypes } from "../src/types";

test("Check evaluate choice status to update random to one upon a hit", () => {
  const myAI = new AI();
  const clickable = { tile: "ship" };

  myAI.evaluateChoice(true, clickable);

  expect(myAI.status).toEqual(StatusTypes.ONE);
  expect(myAI.referenceTile).toMatchObject(clickable);
  expect(myAI.direction).toEqual(0);
});

test("Check evaluate choice status to not update upon a miss", () => {
  const myAI = new AI();
  const clickable = { tile: "space" };

  myAI.evaluateChoice(false, clickable);

  expect(myAI.status).toEqual(StatusTypes.RANDOM);
  expect(myAI.referenceTile).toBeNull();
  expect(myAI.direction).toBeNull();
});

test("Check evaluate direction updating upon 1 successful hit and 1 miss", () => {
  const myAI = new AI();
  const clickable = { tile: "ship" };
  const clickable2 = { tile: "space" };

  myAI.evaluateChoice(true, clickable);
  myAI.evaluateChoice(false, clickable2);

  expect(myAI.status).toEqual(StatusTypes.ONE);
  expect(myAI.referenceTile).toMatchObject(clickable);
  expect(myAI.direction).toEqual(1);
});

test("Check evaluate direction updating back down to random", () => {
  const myAI = new AI();
  const clickable = { tile: "ship" };
  const clickable2 = { tile: "space" };

  myAI.evaluateChoice(true, clickable);
  expect(myAI.direction).toEqual(0);
  myAI.evaluateChoice(false, clickable2); // fail left
  expect(myAI.direction).toEqual(1);
  myAI.evaluateChoice(false, clickable2); // fail up
  expect(myAI.direction).toEqual(2);
  myAI.evaluateChoice(false, clickable2); // fail right
  expect(myAI.direction).toEqual(3);
  myAI.evaluateChoice(false, clickable2); // fail down

  expect(myAI.status).toEqual(StatusTypes.RANDOM);
  expect(myAI.referenceTile).toBeNull();
  expect(myAI.direction).toBeNull();
});

test("Check evaluate choice status to update up to TWO", () => {
  const myAI = new AI();
  const clickable = { tile: "ship" };
  const clickable2 = { tile: "ship" };

  myAI.evaluateChoice(true, clickable);
  myAI.evaluateChoice(true, clickable2);

  expect(myAI.status).toEqual(StatusTypes.TWO);
  expect(myAI.referenceTile).toMatchObject(clickable);
  expect(myAI.direction).toEqual(0);
});

test("Check evaluate choice status to update back down to one", () => {
  const myAI = new AI();
  const clickable = { tile: "ship" };
  const clickable2 = { tile: "ship" };
  const clickable3 = { tile: "space" };

  myAI.evaluateChoice(true, clickable);
  myAI.evaluateChoice(true, clickable2);
  myAI.evaluateChoice(false, clickable3);

  expect(myAI.status).toEqual(StatusTypes.ONE);
  expect(myAI.referenceTile).toMatchObject(clickable);
  expect(myAI.direction).toEqual(1);
});

test("Check evaluate choice status to go from two, to one, to random", () => {
  const myAI = new AI();
  const clickable = { tile: "ship" };
  const clickable2 = { tile: "ship" };
  const clickable3 = { tile: "space" };

  myAI.evaluateChoice(true, clickable);
  myAI.evaluateChoice(true, clickable2);
  myAI.evaluateChoice(false, clickable3);
  expect(myAI.direction).toEqual(1);
  myAI.evaluateChoice(false, clickable3);
  expect(myAI.direction).toEqual(2);
  myAI.evaluateChoice(false, clickable3);
  expect(myAI.direction).toEqual(3);
  myAI.evaluateChoice(false, clickable3);

  expect(myAI.status).toEqual(StatusTypes.RANDOM);
  expect(myAI.referenceTile).toBeNull();
  expect(myAI.direction).toBeNull();
});

test("Test choosing a random tile", () => {
  const myAI = new AI();
  const filteredTiles = [{ tile: "ship" }, { tile: "space" }];

  const tile = myAI.makeChoice(filteredTiles);

  expect(filteredTiles).toContain(tile);
});

test("Test choosing in Type ONE so it looks to the left", () => {
  const myAI = new AI();
  const filteredTiles = [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: 2 },
  ];

  myAI.evaluateChoice(true, filteredTiles[1]); // getting a hit
  expect(myAI.direction).toEqual(0);

  const tile = myAI.makeChoice(filteredTiles);

  expect(tile).toMatchObject(filteredTiles[0]);
});

test("Test choosing in Type ONE whilst looking in all directions", () => {
  const myAI = new AI();
  const filteredTiles = [
    { row: 1, col: 0 }, // left
    { row: 1, col: 1 }, // center
    { row: 1, col: 2 }, // right
    { row: 0, col: 1 }, // up
    { row: 2, col: 1 }, // down
  ];

  let tile;
  myAI.evaluateChoice(true, filteredTiles[1]); // getting a hit
  expect(myAI.direction).toEqual(0);

  tile = myAI.makeChoice(filteredTiles);
  expect(tile).toMatchObject(filteredTiles[0]); // left
  myAI.evaluateChoice(false, tile); // getting a miss

  tile = myAI.makeChoice(filteredTiles);
  expect(tile).toMatchObject(filteredTiles[3]); // up
  myAI.evaluateChoice(false, tile); // getting a miss

  tile = myAI.makeChoice(filteredTiles);
  expect(tile).toMatchObject(filteredTiles[2]); // right
  myAI.evaluateChoice(false, tile); // getting a miss

  tile = myAI.makeChoice(filteredTiles);
  expect(tile).toMatchObject(filteredTiles[4]); //down
  myAI.evaluateChoice(false, tile); // getting a miss
});

test("Test Type ONE, choosing in rotation", () => {
  const myAI = new AI();
  const filteredTiles = [
    // { row: 1, col: 0 }, // no left
    { row: 1, col: 1 }, // center
    // { row: 1, col: 2 }, // right no down
    // { row: 0, col: 1 }, // no up
    { row: 2, col: 1 }, // down
  ];

  let tile;
  myAI.evaluateChoice(true, filteredTiles[0]); // getting a hit
  expect(myAI.direction).toEqual(0);

  tile = myAI.makeChoice(filteredTiles);
  expect(tile).toMatchObject(filteredTiles[1]); // checks down immediately
});

test("Test Type TWO, choosing in a streak", () => {
  const myAI = new AI();
  const filteredTiles = [
    { row: 1, col: 5 }, // center
    { row: 1, col: 4 },
    { row: 1, col: 3 },
    { row: 1, col: 2 },
    { row: 1, col: 1 },
  ];

  let tile;
  myAI.evaluateChoice(true, filteredTiles[0]); // getting a hit
  expect(myAI.direction).toEqual(0);

  tile = myAI.makeChoice(filteredTiles);
  expect(tile).toMatchObject(filteredTiles[1]); // checks to the left
  myAI.evaluateChoice(true, tile); // trigger type TWO
  expect(myAI.status).toEqual(StatusTypes.TWO);

  tile = myAI.makeChoice(filteredTiles);
  expect(tile).toMatchObject(filteredTiles[2]); // checks to the left
  myAI.evaluateChoice(true, tile); // continue attacking

  tile = myAI.makeChoice(filteredTiles);
  expect(tile).toMatchObject(filteredTiles[3]); // checks to the left
  myAI.evaluateChoice(true, tile); // continue attacking

  tile = myAI.makeChoice(filteredTiles);
  expect(tile).toMatchObject(filteredTiles[4]); // checks to the left
});
