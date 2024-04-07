let hedgehog;
let bunny;
let squirrel;

import foxes from "./foxes.js";
import ducks from "./ducks.js";

let rows = [];
let foxes = [];
let ducks = [];

let gameIsRunning = true;
let gridSize = 50;
let results = 0;
let level = 1;
let gameMode = startScreen;

function setup() {
  createCanvas();
}

function resetGame() {}

function startScreen() {}
function scenary() {}

function levelOne() {}

function levelTwo() {}

function levelThree() {}

function wonGame() {}

function lostGame() {}

function draw() {
  if (gameMode === "startscreen") {
    noStroke();
    startScreen();
  }
}
