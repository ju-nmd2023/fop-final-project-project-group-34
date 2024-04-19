let hedgehog;
let bunny;
let squirrel;

import foxes from "./foxes.js";
import ducks from "./ducks.js";

let rows = [];
let foxes = [];
let foxesNumber = 5;
let ducks = [];
let ducksNumber = 10;

let gameIsRunning = true;
let gridSize = 50;
let results = 0;
let level = 1;
let gameMode = startScreen;

function setup() {
  createCanvas(400, 400);

  for (let i = 0; i < foxesNumber; i++) {
    (foxes[i] = new foxes(random(width))), random(height - 100);
  }
}

//Click to start
push();
fill(0, 0, 0);
textSize(30);
text("Click S to start", 300, 290, 500, 200);
pop();

//Rules & description
push();
fill(0, 0, 0);
textSize(30);
text("Rules", 660, 165, 100, 50);
pop();

function resetGame() {}

function startScreen() {}
function scenary() {}

function levelOne() {}

function levelTwo() {}

function levelThree() {}

function wonGame() {}

function lostGame() {}

function draw() {
  background(220);

  if (gameMode === "startscreen") {
    noStroke();
    startScreen();
  }

  for (let i = 0; i < foxesNumber; i++) {
    foxes[i].body();
    foxes[i].move();
    foxes[i].collisiondetect();
  }

  for (let i = 0; i < ducksNumber; i++) {
    ducks[i].body();
    ducks[i].move();
    ducks[i].overlapdetect();
  }
}
