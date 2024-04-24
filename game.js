//SETUP
function setup() {
  createCanvas(400, 500);
  frameRate(10);
}

//Based on thecodingtrain's Frogger code - https://editor.p5js.org/codingtrain/sketches/crMMFw8vD , https://youtu.be/giXV6xErw0Y

//GRID
const gridLength = 11;
const gridSize = 40;
//General game variables
let gameIsRunning = true;
let gameMode = "startscreen";
let level = 1;
let score = 0;
let timer = 10;

let rowsOne = [];
let rowsTwo = [];
let rowsThree = [];
let bunny;
let hedgehog;
let squirrel;
let ducks = [];
let foxes = [];

//ONLY HERE FOR REFERENCE WHEN CODE MAKING!!
function drawGrid() {
  push();
  stroke(255, 255, 255);
  fill(0, 0, 0);
  for (let x = 0; x < gridLength; x++) {
    for (let y = 0; y < gridLength; y++) {
      rect(x * gridSize, y * gridSize, gridSize, gridSize);
    }
  }
  pop();
}

//CLASSES
class Bunny {
  draw() {}
}

class Hedgehog {
  draw() {}
}

class Squirrel {
  draw() {}
}

class Fox {
  draw() {}
}

class Duck {
  draw() {}
}

//CONTROLS
function keyPressed() {}

//SCREENS
function startScreen() {}

function intructionScreen() {}

function levelOneBackground() {}

function levelTwoBackground() {}

function levelThreeBackground() {}

function WonGame() {}

function lostGame() {}

function draw() {
  background(0, 0, 0);
  drawGrid();
}

// if (gameMode === "startscreen" && keyIsPressed === true && keyCode === 83) {
//   gameMode = "gamescreen";
//   gameIsRunning = "false";
//   level = 1;
// }

// if (gameMode === "gamescreen" && level === 1) {
// }
