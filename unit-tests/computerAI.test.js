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
