//Based on thecodingtrain's Frogger code - https://editor.p5js.org/codingtrain/sketches/crMMFw8vD , https://youtu.be/giXV6xErw0Y

//GRID
let grid = 50;

let bunny;
let ducks = [];
let foxes = [];
let timer;
let timeLimit = 20000;
let gameMode = "start";
let gameIsRunning = false;
let ongoingLevel = 1;

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
    fill(0, 255, 0, 200);
    rect(this.x, this.y, this.width, this.width);
  }

  move(xdir, ydir) {
    this.x += xdir * grid;
    this.y += ydir * grid;
    this.winningZone();
  }

  winningZone() {
    if (ongoingLevel === 1 && this.y < 30) {
      console.log("Finished first level");
      setupLevel2();
    } else if (ongoingLevel === 2 && this.y < 30) {
      console.log("Finished second level");
      setupLevel3();
    } else if (ongoingLevel === 3 && this.y < 30) {
      console.log("You Won");
      gameMode = "wonGame";
      wonGameScreen();
    }
  }
}

class Fox extends Dimensions {
  constructor(x, y, width, height, speed) {
    super(x, y, width, height);
    this.speed = speed;
  }

  draw() {
    fill(255);
    rect(this.x, this.y, this.width, this.height);
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
    fill(255, 255, 0);
    rect(
      this.x + this.width / 2,
      this.y + this.height / 2,
      this.width,
      this.height
    );
  }
}

function resetGame() {
  ongoingLevel = 1;
  bunny = new Bunny(width / 2 - grid / 2, height - grid, grid);
  bunny.attach(null);
  gameIsRunning = true;
}

function gameBackground() {
  noStroke();
  //sky
  background(209, 238, 255);
  //color 1
  push();
  fill(171, 225, 255);
  rect(0, 200, 800, 300);
  rect(0, 150, 250, 100);
  rect(0, 120, 50, 100);
  rect(50, 90, 70, 100);
  rect(120, 110, 70, 100);
  rect(280, 170, 400, 100);
  rect(320, 100, 280, 100);
  rect(700, 150, 100, 100);
  rect(360, 60, 150, 100);
  rect(540, 80, 60, 100);
  rect(610, 120, 30, 100);
  //small details
  rect(0, 110, 20, 100);
  rect(0, 100, 10, 100);
  rect(40, 110, 100, 10);
  rect(60, 80, 50, 10);
  rect(120, 100, 60, 10);
  rect(130, 90, 40, 10);
  rect(190, 140, 50, 10);
  rect(190, 130, 40, 10);
  rect(250, 170, 10, 40);
  rect(270, 180, 10, 40);
  rect(290, 160, 30, 40);
  rect(310, 110, 10, 50);
  rect(330, 90, 30, 40);
  rect(350, 70, 170, 40);
  rect(520, 80, 10, 40);
  rect(550, 70, 40, 40);
  rect(600, 100, 10, 70);
  rect(600, 90, 10, 40);
  rect(610, 110, 20, 40);
  rect(640, 150, 20, 40);
  rect(640, 160, 30, 40);
  rect(690, 160, 20, 40);
  rect(710, 140, 90, 40);
  rect(720, 130, 90, 40);
  pop();
  //color 2
  push();
  fill(123, 208, 255);
  rect(0, 400, 100, 200);
  rect(50, 350, 300, 200);
  rect(0, 400, 800, 200);
  rect(100, 300, 100, 200);
  rect(240, 330, 80, 200);
  rect(400, 200, 200, 300);
  rect(500, 250, 200, 300);
  rect(700, 300, 200, 300);
  rect(730, 270, 200, 300);
  rect(370, 230, 200, 150);
  rect(50, 170, 80, 80);
  rect(600, 220, 40, 30);

  //small details
  rect(10, 390, 40, 100);
  rect(40, 360, 40, 100);
  rect(30, 380, 40, 100);
  rect(80, 320, 40, 100);
  rect(90, 310, 120, 100);
  rect(210, 320, 10, 100);
  rect(230, 340, 100, 100);
  rect(250, 320, 60, 100);
  rect(350, 360, 10, 100);
  rect(360, 390, 10, 100);
  rect(380, 380, 20, 10);
  rect(360, 240, 10, 110);
  rect(350, 250, 10, 90);
  rect(340, 260, 10, 70);
  rect(390, 210, 10, 90);
  rect(410, 190, 180, 10);
  rect(640, 230, 10, 90);
  rect(650, 240, 10, 90);
  rect(700, 260, 10, 30);
  rect(720, 280, 10, 30);
  rect(740, 260, 50, 30);
  rect(60, 160, 60, 60);
  rect(40, 180, 60, 60);
  rect(60, 250, 60, 10);
  rect(130, 180, 10, 60);
  pop();
}

function scenary1() {
  fill(0, 154, 23);
  rect(0, 0, width, grid * 4.4);
  rect(0, height - grid, width, grid);
  rect(0, height - grid * 5, width, grid);
}

function scenary2() {
  fill(0, 154, 23);
  rect(0, 0, width, grid * 2.9);
  rect(0, height - grid, width, grid);
  rect(0, height - grid * 5, width, grid);
}

function scenary3() {
  fill(0, 154, 23);
  rect(0, 0, width, grid * 2.9);
  rect(0, height - grid, width, grid);
  rect(0, height - grid * 5, width, grid);
}

function wonGameScreen() {
  if (gameMode === "gameWon") {
    gameIsRunning = false;
    gameBackground();
    push();
    fill(255, 255, 255);
    rect(25, 200, 450, 200, 20);
    pop();

    push();
    fill(0, 0, 0);
    textSize(25);
    textAlign(CENTER, CENTER);
    text("GAME OVER!", 250, 270);
    text("PRESS R TO RESTART GAME", 250, 320);
    pop();
    timer = millis();
  }
}

function startScreen() {
  if (gameMode == "start") {
    gameIsRunning = false;
    gameBackground();
    push();
    fill(255, 255, 255);
    rect(160, 150, 185, 200, 20);
    rect(355, 200, 140, 100, 20);
    rect(10, 200, 140, 100, 20);
    pop();
    //Game title
    push();
    fill(0, 0, 0);
    textSize(37);
    text("Picnic", 200, 200, 500, 200);
    text("Panic", 200, 250, 500, 200);
    pop();
    //Start
    push();
    fill(0, 0, 0);
    textSize(20);
    text("Click S to start", 362, 240, 500, 200);
    pop();
    //Rules Info
    push();
    fill(0, 0, 0);
    textSize(28);
    text("Rules", 45, 240, 500, 200);
    pop();
    timer = millis();
  }
}

function gameOverScreen() {
  if (gameMode === "gameOver") {
    gameIsRunning = false;
    gameBackground();
    push();
    fill(255, 255, 255);
    rect(25, 200, 450, 200, 20);
    pop();

    push();
    fill(0, 0, 0);
    textSize(25);
    textAlign(CENTER, CENTER);
    text("GAME OVER!", 250, 270);
    text("PRESS R TO RESTART GAME", 250, 320);
    pop();
    timer = millis();
  }
}

function setupLevel1() {
  bunny = new Bunny(width / 2 - grid / 2, height - grid, grid);
  bunny.attach(null);
  gameIsRunning = true;
  ongoingLevel = 1;
  timer = millis();
}

function setupLevel2() {
  bunny = new Bunny(width / 2 - grid / 2, height - grid, grid);
  bunny.attach(null);
  gameIsRunning = true;
  ongoingLevel = 2;
  timer = millis();
}

function setupLevel3() {
  bunny = new Bunny(width / 2 - grid / 2, height - grid, grid);
  bunny.attach(null);
  gameIsRunning = true;
  ongoingLevel = 3;
  timer = millis();
}

function rulesScreen() {
  if (gameMode == "rules" && gameIsRunning === false) {
    gameBackground();
    push();
    fill(255, 255, 255);
    rect(25, 200, 445, 200, 20);
    pop();

    push();
    fill(0, 0, 0);
    textSize(14);
    textAlign(CENTER, CENTER);
    text(
      "Join three forest friends—a bunny, a hedgehog, and a squirrel—on their picnic day. But watch out! A thieving fox has stolen their goodies, and they must navigate various obstacles to reclaim them. Dodge obstacles while moving forward. Jump on moving platforms, like ducks in a river, to progress. Reach the end before time runs out, avoiding obstacles and rivers along the way. Game over if you touch an obstacle, fall in the river, or run out of time. Good Luck!",
      40,
      200,
      420,
      200
    );
    pop();
    timer = millis();
  }
}

//SETUP
function setup() {
  createCanvas(500, 700);
  resetGame();

  let index = 0;

  if (ongoingLevel === 1 && gameMode !== "rules") {
    gameIsRunning = true;
    timer = millis();
    // ROW 1
    for (let i = 0; i < 4; i++) {
      let x = i * 300 + grid;
      foxes[index] = new Fox(x, height - grid * 2, grid * 2, grid, 1);
      index++;
    }

    // ROW 2
    for (let i = 0; i < 3; i++) {
      let x = i * 200 + grid;
      foxes[index] = new Fox(x, height - grid * 3, grid * 2, grid, -3.5);
      index++;
    }

    // ROW 3
    for (let i = 0; i < 4; i++) {
      let x = i * 150 + grid;
      foxes[index] = new Fox(x, height - grid * 4, grid * 2, grid, 1.2);
      index++;
    }

    // ROW 4
    index = 0;
    for (let i = 0; i < 3; i++) {
      let x = i * 250 + 100;
      ducks[index] = new Duck(x, height - grid * 6.5, grid * 1, grid, 2.3);
      index++;
    }

    // ROW 5
    for (let i = 0; i < 4; i++) {
      let x = i * 200 + 30;
      ducks[index] = new Duck(x, height - grid * 7.5, grid * 1, grid, -1.3);
      index++;
    }
  }

  if (ongoingLevel === 2) {
    bunny = new Bunny(width / 2 - grid / 2, height - grid, grid);
    bunny.attach(null);
    gameIsRunning = true;
    timer = millis();
    // ROW 1
    for (let i = 0; i < 4; i++) {
      let x = i * 300;
      foxes[index] = new Fox(x, height - grid * 2, grid * 2, grid, 2);
      index++;
    }

    // ROW 2
    for (let i = 0; i < 3; i++) {
      let x = i * 200 + 150;
      foxes[index] = new Fox(x, height - grid * 3, grid * 2, grid, -3.5);
      index++;
    }

    // ROW 3
    for (let i = 0; i < 4; i++) {
      let x = i * 150 + 50;
      foxes[index] = new Fox(x, height - grid * 4, grid * 2, grid, 1.2);
      index++;
    }

    // ROW 5
    index = 0;
    for (let i = 0; i < 3; i++) {
      let x = i * 250 + 100;
      ducks[index] = new Duck(x, height - grid * 6.5, grid * 0.5, grid, 2.3);
      index++;
    }

    // ROW 6
    for (let i = 0; i < 4; i++) {
      let x = i * 200 + 30;
      ducks[index] = new Duck(x, height - grid * 7.5, grid * 0.5, grid, -1.3);
      index++;
    }
  }

  if (ongoingLevel === 3) {
    bunny = new Bunny(width / 2 - grid / 2, height - grid, grid);
    bunny.attach(null);
    gameIsRunning = true;
    timer = millis();

    // ROW 1
    for (let i = 0; i < 4; i++) {
      let x = i * 300;
      foxes[index] = new Fox(x, height - grid * 2, grid * 2, grid, 2);
      index++;
    }

    // ROW 2
    for (let i = 0; i < 3; i++) {
      let x = i * 200 + 150;
      foxes[index] = new Fox(x, height - grid * 3, grid * 2, grid, -3.5);
      index++;
    }

    // ROW 3
    for (let i = 0; i < 4; i++) {
      let x = i * 150 + 25;
      foxes[index] = new Fox(x, height - grid * 4, grid * 2, grid, 1.2);
      index++;
    }

    // ROW 5
    index = 0;
    for (let i = 0; i < 3; i++) {
      let x = i * 250 + 100;
      ducks[index] = new Duck(x, height - grid * 6.5, grid * 0.5, grid, 2.3);
      index++;
    }

    // ROW 6
    for (let i = 0; i < 4; i++) {
      let x = i * 200 + 30;
      ducks[index] = new Duck(x, height - grid * 7.5, grid * 0.5, grid, -1.3);
      index++;
    }
  }
}

function draw() {
  background(0);

  //ScreenCurrentState
  if (gameMode === "start") {
    startScreen();
    gameIsRunning = false;
  } else if (gameMode === "rules") {
    rulesScreen();
    gameIsRunning = false;
  } else if (gameMode === "gameOver") {
    gameOverScreen();
    gameIsRunning = false;
  } else if ((gameMode = "gameScreen")) {
    if (ongoingLevel === 1) {
      scenary1();
    } else if (ongoingLevel === 2) {
      scenary2();
    } else if (ongoingLevel === 3) {
      scenary3();
    }

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

    if (
      bunny.y < height - grid * 5.5 &&
      bunny.y > height - grid * 8 &&
      bunny.y > grid * 2
    ) {
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

    //timer
    let timePass = millis() - timer;
    fill(0, 0, 0);
    textSize(20);
    text("Timer: " + Math.floor((timeLimit - timePass) / 1000), 400, 30);

    if (timePass > timeLimit) {
      gameMode = "gameOver";
    }

    push();
    fill(0, 0, 0);
    textSize(20);
    text("Level: " + ongoingLevel, 15, 30);
    pop();
  }
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
  } else if (key === "s") {
    gameMode = "game" && ongoingLevel == 1;
  } else if (key === "b" && gameMode === "rules") {
    gameMode = "start";
  } else if (key === "r") {
    resetGame();
    timer = millis();
    gameMode = "start";
  }
}

function mousePressed() {
  if (
    mouseX > 10 &&
    mouseX < 150 &&
    mouseY > 200 &&
    mouseY < 300 &&
    gameMode === "start"
  ) {
    gameMode = "rules";
  }
}
