let hedgehog;
let bunny;
let squirrel;

let rows = [];

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
