//Based on thecodingtrain's Frogger code - https://editor.p5js.org/codingtrain/sketches/crMMFw8vD , https://youtu.be/giXV6xErw0Y

//GRID
let grid = 50;

let bunny;
let ducks = [];
let foxes = [];
let timer;
let timeLimit = 45000;
let gameMode = "start";
let gameIsRunning = false;
let results;
let ongoingLevel = 1;
//ONLY HERE FOR REFERENCE WHEN CODE MAKING!!
// function drawGrid() {
//   push();
//   stroke(255, 255, 255);
//   fill(0, 0, 0);
//   for (let x = 0; x < grid; x++) {
//     for (let y = 0; y < grid; y++) {
//       rect(x * grid, y * grid, grid, grid);
//     }
//   }
//   pop();

// }

//CLASSES
class Dimensions {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  intersects(otherRectangle) {
    let left = this.x;
    let right = this.x + this.width;
    let top = this.y;
    let bottom = this.y + this.height;

    let oleft = otherRectangle.x;
    let oright = otherRectangle.x + otherRectangle.width;
    let otop = otherRectangle.y;
    let obottom = otherRectangle.y + otherRectangle.height;

    return !(
      left >= oright ||
      right <= oleft ||
      top >= obottom ||
      bottom <= otop
    );
  }
}

class Bunny extends Dimensions {
  constructor(x, y, width, height) {
    super(x, y, width, width, height);
    this.attached = null;
  }

  attach(duck) {
    this.attached = duck;
  }

  update() {
    if (this.attached != null) {
      this.x += this.attached.speed;
    }

    this.x = constrain(this.x, 0, width - this.width);
  }

  draw() {
    //body
    fill(255, 255, 255, 200);
    rect(this.x, this.y, this.width * 0.7, this.width * 0.9);
    //ears
    fill(255, 255, 255, 200);
    rect(this.x * 1.02, this.y, this.width * 0.2, this.width * 0.3);
    rect(this.x * 1.055, this.y, this.width * 0.2, this.width * 0.3);
    fill(255, 184, 191, 200);
    rect(this.x * 1.03, this.y, this.width * 0.08, this.width * 0.2);
    rect(this.x * 1.065, this.y, this.width * 0.08, this.width * 0.2);
    //eyes
    fill(0, 0, 0);
    rect(
      this.x * 1.025,
      this.y + this.height * 0.35,
      this.width * 0.1,
      this.width * 0.1
    );
    rect(
      this.x * 1.065,
      this.y + this.height * 0.35,
      this.width * 0.1,
      this.width * 0.1
    );
    //nose
    fill(227, 28, 121, 200);
    rect(
      this.x * 1.045,
      this.y + this.height * 0.45,
      this.width * 0.1,
      this.width * 0.1
    );
  }

  move(xdir, ydir) {
    this.x += xdir * grid;
    this.y += ydir * grid;
  }
}

class Fox extends Dimensions {
  constructor(x, y, width, height, speed) {
    super(x, y, width, height);
    this.speed = speed;
  }

  draw() {
    //body
    fill(252, 76, 2);
    rect(
      this.x + this.width * 0.3,
      this.y + this.height * 0.4,
      this.width * 0.9,
      this.height * 0.5
    );
    // head
    fill(252, 76, 2);
    rect(
      this.x + this.width * 0.9,
      this.y + this.height * 0.4,
      this.width * 0.3,
      this.height * 0.5
    );
    //ears
    fill(252, 76, 2);
    triangle(
      this.x + this.width * 0.96,
      this.y + this.height * 0.4,
      this.x + this.width * 1.0,
      this.y + this.height * 0.5,
      this.x + this.width * 0.96,
      this.y + this.height * 0.6
    );
    triangle(
      this.x + this.width * 0.96,
      this.y + this.height * 0.67,
      this.x + this.width * 1.0,
      this.y + this.height * 0.77,
      this.x + this.width * 0.96,
      this.y + this.height * 0.87
    );
    //tail
    fill(252, 76, 2);
    ellipse(
      this.x + this.width * 0.2,
      this.y + this.height * 0.65,
      this.width * 0.7,
      this.height * 0.4
    );
    //eyes
    fill(255);
    rect(
      this.x + this.width * 1.1,
      this.y + this.height * 0.48,
      this.width * 0.04,
      this.height * 0.1
    );
    rect(
      this.x + this.width * 1.1,
      this.y + this.height * 0.7,
      this.width * 0.04,
      this.height * 0.1
    );
    //nose
    fill(252, 76, 2);
    ellipse(
      this.x + this.width * 1.22,
      this.y + this.height * 0.65,
      this.width * 0.15,
      this.height * 0.15
    );
    fill(98, 47, 34);
    ellipse(
      this.x + this.width * 1.27,
      this.y + this.height * 0.65,
      this.width * 0.07,
      this.height * 0.11
    );
    //triangle(this.x + this.width * 1.2, this.y + this.height * 0.55, this.x + this.width * 1.4, this.y + this.height * 0.65, this.x + this.width * 1.2, this.y + this.height * 0.75);
  }

  update() {
    this.x += this.speed;

    if (this.speed > 0 && this.x > width + grid) {
      this.x = -this.width - grid;
    } else if (this.speed < 0 && this.x < -this.width - grid) {
      this.x = width + grid;
    }
  }
}

class Duck {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
  }

  update() {
    this.x += this.speed;
    if (this.speed > 0 && this.x > width + grid) {
      this.x = -this.width - grid;
    } else if (this.speed < 0 && this.x < -this.width - grid) {
      this.x = width + grid;
    }
  }

  draw() {
    //body
    fill(255, 255, 102);
    ellipse(
      this.x,
      this.y + this.height / 1,
      this.width / 2.1,
      this.height / 1.7
    );

    //head
    fill(255, 255, 102);
    ellipse(this.x, this.y + this.height / 1, this.width / 4, this.height / 3);

    //beak
    fill(255, 143, 0);
    rect();

    //eyes
    fill(0);

    fill(0);

    //wings
    fill(255, 255, 102);

    fill(255, 255, 102);
  }
}

function resetGame() {
  bunny = new Bunny(width / 2 - grid / 2, height - grid, grid);
  bunny.attach(null);
  gameIsRunning = true;
}

//SETUP
function setup() {
  createCanvas(500, 700);
  resetGame();
  timer = millis();

  let index = 0;

  // ROW 1
  for (let i = 0; i < 40; i++) {
    let x = i * 300;
    foxes[index] = new Fox(x, height - grid * 2, grid * 2, grid, 2);
    index++;
  }

  // ROW 2
  for (let i = 0; i < 3; i++) {
    let x = i * 200 + 150;
    foxes[index] = new Fox(x, height - grid * 3, grid, grid, -3.5);
    index++;
  }

  // ROW 3
  for (let i = 0; i < 4; i++) {
    let x = i * 150 + 25;
    foxes[index] = new Fox(x, height - grid * 4, grid, grid, 1.2);
    index++;
  }

  // ROW 5
  index = 0;
  for (let i = 0; i < 2; i++) {
    let x = i * 250 + 100;
    ducks[index] = new Duck(x, height - grid * 8, grid * 3, grid, 2.3);
    index++;
  }

  // ROW 6
  for (let i = 0; i < 3; i++) {
    let x = i * 200 + 30;
    ducks[index] = new Duck(x, height - grid * 7, grid * 2, grid, -1.3);
    index++;
  }
}
function level1Setup() {
  let index = 0;
}
function level2Setup() {
  let index = 0;
}

function level3Setup() {
  let index = 0;
}

function startScreen() {
  if (gameMode == "start") {
    push();
    fill(255, 255, 255);
    rect(160, 150, 185, 200, 20);
    rect(355, 200, 140, 100, 20);
    rect(10, 200, 140, 100, 20);
    pop();

    //Game title
    push();
    fill(255, 0, 0);
    textSize(37);
    text("PICKNICK", 165, 200, 500, 200);
    text("DAY", 220, 250, 500, 200);
    pop();

    //Start
    push();
    fill(255, 0, 0);
    textSize(20);
    text("Click S to start", 362, 240, 500, 200);
    pop();

    //Rules Info
    push();
    fill(255, 0, 0);
    textSize(28);
    text("Rules", 45, 240, 500, 200);
    pop();
  }
}

function gameOverScreen() {
  if (gameMode === "gameOver") {
    background(0);
    push();
    fill(255, 255, 255);
    rect(170, 150, 165, 200, 20);
    pop();

    fill(255, 0, 0);
    textSize(30);
    textAlign(CENTER, CENTER);
    text("GAME OVER!", 300, 300);
    text("PRESS MOUSE TO RESTART GAME", 200, 270);
    pop();
  }
}

function rulesScreen() {
  if (gameMode == "rules") {
    background(0);
    push();
    fill(255, 255, 255);
    rect(170, 150, 165, 200, 20);
    pop();

    push();
    fill(255, 0, 0);
    textSize(14);
    textAlign(CENTER, CENTER);
    text(
      "Join three forest friends—a bunny, a hedgehog, and a squirrel—on their picnic day. But watch out! A thieving fox has stolen their goodies, and they must navigate various obstacles to reclaim them. Dodge obstacles while moving forward. Jump on moving platforms, like ducks in a river, to progress. Reach the end before time runs out, avoiding obstacles and rivers along the way. Game over if you touch an obstacle, fall in the river, or run out of time. Good Luck!",
      40,
      240,
      440,
      200
    );
    pop();
  }
}

function draw() {
  background(0);
  //timer
  let startTime = millis();
  let timePass = startTime - timer;
  fill(255, 0, 0);
  textSize(20);
  text("Timer:" + Math.floor((timeLimit - timePass) / 1000), 400, 30);

  if (timePass > timeLimit) {
    gameMode = "gameover";
  }

  if (ongoingLevel == 1) {
    level1Setup();
    //draw level 1
  } else if (ongoingLevel == 2) {
    //draw level 2
    level2Setup();
  } else if (ongoingLevel == 3) {
    //draw level 3
    level3Setup();
  }

  //ScreenCurrentState
  if (gameMode === "start") {
    startScreen();
  } else if (gameMode === "rules") {
    rulesScreen();
  } else if (gameMode === "gameOver") {
    gameOverScreen();
  }

  // Safety lines
  fill(255, 100);
  rect(0, 0, width, grid * 2);
  rect(0, height - grid, width, grid);
  rect(0, height - grid * 5, width, grid);

  for (let i = 0; i < foxes.length; i++) {
    foxes[i].update();
    foxes[i].draw();

    if (bunny.intersects(foxes[i])) {
      resetGame();
    }
  }

  for (let i = 0; i < ducks.length; i++) {
    ducks[i].update();
    ducks[i].draw();
  }

  if (bunny.y < height - grid * 5 && bunny.y > grid * 2) {
    let ok = false;

    for (let i = 0; i < ducks.length; i++) {
      if (bunny.intersects(ducks[i])) {
        ok = true;
        bunny.attach(ducks[i]);
      }
    }
    if (!ok) {
      resetGame();
    }
  } else {
    bunny.attach(null);
  }

  bunny.update();
  bunny.draw();
  startScreen();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    bunny.move(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    bunny.move(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    bunny.move(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    bunny.move(-1, 0);
  } else if (key === "s" || key === "S") {
    gameMode = "game";
  } else if (key === "b" || key === "B") {
    gameMode = "start";
  }
}

function mousePressed() {
  if (mouseX > 10 && mouseX < 150 && mouseY > 200 && mouseY < 300) {
    gameMode = "rules";
  }
}
