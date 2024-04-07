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
    foxes [i] = new foxes (random(width)), random(height-100),
  }
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
  background(220);

  if (gameMode === "startscreen") {
    noStroke();
    startScreen();
  }

  for (let i = 0; i < foxesNumber; i++){
    foxes[i]. body();
    foxes[i]. move();
    foxes[i]. collisiondetect();
    }

    for (let i = 0; i < ducksNumber; i++){
      ducks[i]. body();
      ducks[i]. move();
      ducks[i]. overlapdetect();
      }
}
