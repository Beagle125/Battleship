import { Tile, Ship, Gameboard } from "../src/model.js";

const emptyGrid = [
  [
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
  ],
  [
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
  ],
  [
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
  ],
  [
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
  ],
  [
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
  ],
  [
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
  ],
  [
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
  ],
  [
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
  ],
  [
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
  ],
  [
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
  ],
];

test("test the default values of a gameboard", () => {
  const myGameboard = new Gameboard();
  expect(myGameboard.grid).toEqual(emptyGrid);
});

test("test hitting a random tile", () => {
  const myGameboard = new Gameboard();
  myGameboard.receiveAttack(3, 3);
  const hitTile = myGameboard.grid[3][3];
  expect(hitTile.isHit).toBeTruthy();
});

test("test hitting a tile with a ship", () => {
  const myGameboard = new Gameboard();
  const myShip = new Ship(5);
  const myCoords = [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ];

  myGameboard.addShip(myShip, myCoords);
  myGameboard.receiveAttack(0, 0);
  const hitTile = myGameboard.grid[0][0];
  expect(hitTile.isHit).toBeTruthy();
});

test("test throwing an exception when accessing invalid rows and cols", () => {
  const myGameboard = new Gameboard();
  expect(() => myGameboard.receiveAttack(100, 100)).toThrow(
    "Out of bounds coordinates",
  );
});

test("test returning false if not all has sunk", () => {
  const myGameboard = new Gameboard();
  const myShip = new Ship(5);
  const myCoords = [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ];

  myGameboard.addShip(myShip, myCoords);
  expect(myGameboard.allShipsSunk()).toBeFalsy();
});

test("test returning true if all has sunk", () => {
  const myGameboard = new Gameboard();
  const myShip = new Ship(5);
  const myCoords = [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ];

  myGameboard.addShip(myShip, myCoords);
  for (let i = 0; i < 5; i++) {
    myGameboard.receiveAttack(0, i);
  }
  expect(myGameboard.allShipsSunk()).toBeTruthy();
});

test("adding a new ship to the gameboard", () => {
  const myGameboard = new Gameboard();
  const myShip = new Ship(5);
  const myCoords = [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ];

  myGameboard.addShip(myShip, myCoords);

  for (const coord of myCoords) {
    expect(myGameboard.grid[coord[0]][coord[1]].isShip).toBeTruthy();
    expect(myGameboard.grid[coord[0]][coord[1]].referenceShip).toEqual(myShip);
  }
});
