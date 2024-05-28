//Based on thecodingtrain's Frogger code - https://editor.p5js.org/codingtrain/sketches/crMMFw8vD , https://youtu.be/giXV6xErw0Y

//GRID
let grid = 50;
// class variables
let bunny;
let ducks = [];
let foxes = [];

//timer variables
let timer;
//timelimit is 20000 milliseconds
let timeLimit = 20000;

//game variables
let gameMode = "start";
let gameIsRunning = true;
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
    //edges of the rectangles (cheacters like the bunny, fox and duck)
    let left = this.x;
    let right = this.x + this.width;
    let top = this.y;
    let bottom = this.y + this.height;

    //sets the position of another rectangle (whatever character it is not)
    let oleft = otherRectangle.x;
    let oright = otherRectangle.x + otherRectangle.width;
    let otop = otherRectangle.y;
    let obottom = otherRectangle.y + otherRectangle.height;

    //checks if the different rectangles overlaps
    return !(
      left >= oright ||
      right <= oleft ||
      top >= obottom ||
      bottom <= otop
    );
  }
}

class Bunny extends Dimensions {
  constructor(x, y, width, height, size) {
    super(x, y, width, width, height);
    this.attached = null;
    this.size = size;
  }

  //If attached - it's attached to duck
  attach(duck) {
    this.attached = duck;
  }

  // if attached are not equal to null(if attached), bunny will follow allow with ducks speed
  update() {
    if (this.attached != null) {
      this.x += this.attached.speed;
    }
  }

  draw() {
    push();
    stroke(1);
    //body
    fill(255, 255, 255);
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
    pop();
  }

  //bunny's movement
  move(xdir, ydir) {
    this.x += xdir * grid;
    this.y += ydir * grid;
    this.winningZone();
  }

  //checks if bunny has reached winning point and changes to the next level or the endscreen if you finish level 3
  winningZone() {
    if (ongoingLevel === 1 && this.y < 30) {
      console.log("Finished first level");
      setupLevel2();
    } else if (ongoingLevel === 2 && this.y < 30) {
      console.log("Finished second level");
      setupLevel3();
    } else if (ongoingLevel === 3 && this.y < 30) {
      //sets a new bunny at the startposition
      bunny = new Bunny(width / 2 - grid / 2, height - grid, grid);
      //deattaches bunny
      bunny.attach(null);
      //resets timer
      timer = millis();
      //changes to endscreen
      console.log("You Won");
      gameMode = "gameWon";
    }
  }
}

class Fox extends Dimensions {
  constructor(x, y, width, height, speed, size) {
    super(x, y, width, height);
    this.speed = speed;
    this.size = size;
  }

  draw() {
    push();
    stroke(1);
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
    fill(255);
    ellipse(
      this.x + this.width * 0.01,
      this.y + this.height * 0.65,
      this.width * 0.3,
      this.height * 0.3
    );
    //eyes
    fill(0);
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
    pop();
  }

  update() {
    //if speed is positive, fox moves right, if negative, fox moves left
    this.x += this.speed;

    //if speed is positive (moves right) and the fox has moved beyond the screen, it will reset from the left side
    if (this.speed > 0 && this.x > width + grid) {
      this.x = -this.width - grid;
      //if speed is negative (moves right) and the fox has moved beyond the screen, it will reset from the right side
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
    //if speed is positive, duck moves right, if negative, duck moves left
    this.x += this.speed;

    //if speed is positive (moves right) and the duck has moved beyond the screen, it will reset from the left side
    if (this.speed > 0 && this.x > width + grid) {
      this.x = -this.width - grid;
      //if speed is negative (moves right) and the duck has moved beyond the screen, it will reset from the right side
    } else if (this.speed < 0 && this.x < -this.width - grid) {
      this.x = width + grid;
    }
  }

  draw() {
    push();
    stroke(1);
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
    ellipse(
      this.x * 1.01,
      this.y + this.height / 1,
      this.width / 6,
      this.height / 6
    );
    pop();
  }
}

function resetGame() {
  //sets level to the first level
  ongoingLevel = 1;
  //resets the bunny by placing a new one at the starting point
  bunny = new Bunny(width / 2 - grid / 2, height - grid, grid);
  //deattaches bunny
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
  push();
  stroke(1);
  //background
  fill(117, 204, 65);
  rect(0, 0, width, grid * 4.5);
  rect(0, height - grid, width, grid);
  rect(0, height - grid * 5, width, grid);
  fill(80, 200, 255);
  rect(0, height - grid * 7, width, grid * 2);

  // Cake
  fill(244, 241, 226);
  rect(230, 60, 50, 30);
  fill(255, 16, 16);
  rect(230, 65, 50, 5);
  rect(230, 75, 50, 5);
  fill(255, 255, 255);
  ellipse(235, 55, 15);
  ellipse(245, 55, 15);
  ellipse(255, 55, 15);
  ellipse(265, 55, 15);
  ellipse(275, 55, 15);

  ellipse(235, 85, 15);
  ellipse(245, 85, 15);
  ellipse(255, 85, 15);
  ellipse(265, 85, 15);
  ellipse(275, 85, 15);
  fill(255, 16, 16);
  ellipse(255, 50, 10);
  pop();
}

function scenary2() {
  push();
  stroke(1);
  //background
  fill(117, 204, 65);
  rect(0, 0, width, grid * 4.5);
  rect(0, height - grid, width, grid);
  rect(0, height - grid * 5, width, grid);
  fill(80, 200, 255);
  rect(0, height - grid * 7, width, grid * 2);

  //Food
  //Baguette
  fill(243, 225, 143);
  ellipse(240, 60, 90, 20);
  fill(208, 192, 126);
  ellipse(215, 55, 7, 10);
  ellipse(230, 55, 7, 10);
  ellipse(245, 55, 7, 10);
  ellipse(260, 55, 7, 10);
  pop();
}

function scenary3() {
  push();
  stroke(1);
  //background
  fill(117, 204, 65);
  rect(0, 0, width, grid * 4.5);
  rect(0, height - grid, width, grid);
  rect(0, height - grid * 5, width, grid);
  fill(80, 200, 255);
  rect(0, height - grid * 7, width, grid * 2);

  //food
  //Picnic basket
  fill(213, 184, 95);
  rect(210, 60, 70, 50);
  rect(240, 40, 10, 20);
  fill(255, 16, 16);
  rect(210, 60, 70, 10);
  fill(255, 255, 255);
  rect(210, 60, 10, 10);
  rect(230, 60, 10, 10);
  rect(250, 60, 10, 10);
  rect(270, 60, 10, 10);
  fill(134, 110, 10);
  rect(210, 70, 70, 5);
  rect(210, 80, 70, 5);
  rect(210, 90, 70, 5);
  rect(210, 100, 70, 5);
  rect(210, 70, 5, 40);
  rect(220, 70, 5, 40);
  rect(230, 70, 5, 40);
  rect(240, 70, 5, 40);
  rect(250, 70, 5, 40);
  rect(260, 70, 5, 40);
  rect(270, 70, 5, 40);
  pop();
}

function wonGameScreen() {
  //winning screen happens when the game is won
  if (gameMode === "gameWon") {
    //game is no longer running
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
    text("You Won! You saved the forest critters picnic!", 50, 170, 400, 200);
    text("Click R to restart!", 50, 250, 400, 200);
    pop();
    //resets timer
    timer = millis();

    //squirrel
    push();
    translate(200, -350);
    noStroke();
    //main color
    fill(173, 101, 10);
    rect(230, 500, 25, 20);
    rect(240, 495, 5, 5);
    rect(250, 495, 5, 5);
    rect(235, 520, 15, 5);
    rect(230, 525, 25, 25);
    rect(255, 530, 5, 20);
    rect(225, 545, 10, 5);
    rect(260, 520, 10, 25);
    rect(265, 515, 5, 5);
    rect(270, 510, 10, 25);
    rect(280, 515, 5, 15);
    rect(270, 535, 5, 5);
    rect(285, 520, 5, 5);

    //shading
    fill(211, 129, 26);
    rect(230, 525, 15, 20);

    //blush
    fill(246, 128, 164);
    rect(250, 510, 5, 5);

    //outline
    fill(0, 0, 0);
    rect(230, 500, 5, 10);
    rect(225, 510, 5, 10);
    rect(230, 520, 5, 5);
    rect(225, 525, 5, 20);
    rect(220, 545, 5, 5);
    rect(225, 550, 35, 5);
    rect(235, 545, 5, 5);
    rect(255, 545, 10, 5);
    rect(265, 540, 10, 5);
    rect(275, 535, 5, 5);
    rect(280, 530, 5, 5);
    rect(285, 525, 5, 5);
    rect(290, 520, 5, 5);
    rect(285, 515, 5, 5);
    rect(280, 510, 5, 5);
    rect(270, 505, 10, 5);
    rect(265, 510, 5, 5);
    rect(260, 515, 5, 5);
    rect(255, 520, 5, 10);
    rect(250, 520, 5, 5);
    rect(255, 495, 5, 25);
    rect(245, 495, 5, 5);
    rect(235, 495, 5, 5);
    rect(240, 490, 5, 5);
    rect(250, 490, 5, 5);
    rect(240, 535, 5, 5);
    rect(230, 535, 5, 5);
    rect(245, 505, 5, 5);
    rect(235, 510, 10, 5);
    pop();

    //hedgehog
    push();
    noStroke();
    translate(10, -350);
    //main color
    fill(228, 197, 127);
    rect(230, 510, 30, 20);
    rect(225, 515, 40, 20);
    rect(220, 520, 50, 20);
    rect(215, 530, 5, 5);
    rect(230, 540, 35, 5);
    rect(235, 545, 5, 5);
    rect(255, 545, 5, 5);

    //second color
    fill(117, 58, 15);
    rect(230, 510, 30, 5);
    rect(225, 515, 40, 5);
    rect(220, 520, 5, 5);
    rect(240, 520, 35, 5);
    rect(245, 525, 30, 5);
    rect(240, 530, 30, 5);
    rect(250, 535, 20, 5);
    rect(260, 540, 5, 5);

    //shading
    fill(140, 72, 24);
    rect(235, 510, 5, 5);
    rect(255, 520, 5, 5);
    rect(250, 510, 5, 5);
    rect(260, 525, 5, 5);
    rect(250, 535, 5, 5);
    rect(265, 535, 5, 5);
    rect(260, 515, 5, 5);
    rect(240, 530, 5, 5);

    //blush
    fill(246, 128, 164);
    rect(230, 535, 10, 5);

    //outline
    fill(0, 0, 0);
    rect(230, 505, 30, 5);
    rect(260, 510, 5, 5);
    rect(265, 515, 5, 5);
    rect(270, 520, 5, 20);
    rect(265, 540, 5, 5);
    rect(260, 545, 5, 5);
    rect(240, 545, 15, 5);
    rect(230, 545, 5, 5);
    rect(220, 540, 10, 5);
    rect(215, 535, 5, 5);
    rect(210, 530, 5, 5);
    rect(215, 520, 5, 10);
    rect(220, 515, 5, 5);
    rect(225, 510, 5, 5);
    rect(225, 525, 5, 10);
    pop();

    //Bunny
    push();
    translate(-170, -350);
    noStroke();
    //maincolor
    fill(248, 237, 212);
    rect(230, 495, 15, 15);
    rect(225, 510, 20, 25);
    rect(220, 515, 30, 20);
    rect(250, 520, 15, 15);
    rect(235, 535, 15, 5);
    rect(230, 540, 10, 5);
    rect(260, 525, 10, 15);
    rect(250, 540, 15, 5);
    rect(270, 520, 5, 5);

    //blush
    fill(246, 128, 164);
    rect(235, 530, 10, 5);

    //outline
    fill(0, 0, 0);
    rect(225, 495, 5, 15);
    rect(230, 490, 5, 5);
    rect(240, 490, 5, 5);
    rect(235, 495, 5, 15);
    rect(245, 495, 5, 20);
    rect(220, 510, 5, 5);
    rect(215, 515, 5, 20);
    rect(220, 535, 15, 5);
    rect(225, 540, 5, 10);
    rect(225, 545, 15, 5);
    rect(240, 540, 10, 5);
    rect(250, 535, 10, 5);
    rect(245, 545, 20, 5);
    rect(265, 540, 5, 5);
    rect(270, 525, 5, 15);
    rect(275, 520, 5, 5);
    rect(270, 515, 5, 5);
    rect(265, 520, 5, 5);
    rect(250, 515, 15, 5);
    rect(230, 520, 5, 10);
    pop();
    //fox
    push();
    noStroke();
    translate(70, -50);

    //main color
    fill(255, 124, 33);
    rect(230, 505, 60, 30);
    rect(220, 495, 30, 30);
    rect(285, 515, 10, 10);
    rect(295, 510, 10, 20);
    rect(300, 515, 20, 20);
    rect(320, 520, 5, 20);
    rect(325, 525, 5, 20);
    rect(250, 500, 35, 5);
    rect(235, 535, 50, 5);
    rect(215, 500, 5, 20);
    rect(245, 490, 5, 5);
    rect(230, 490, 5, 5);
    rect(210, 505, 5, 10);
    rect(240, 540, 10, 10);
    rect(270, 540, 10, 10);

    //second color
    fill(248, 237, 212);
    rect(210, 505, 10, 10);
    rect(215, 510, 10, 10);
    rect(220, 515, 20, 10);
    rect(230, 525, 20, 10);
    rect(235, 520, 10, 20);
    rect(320, 525, 10, 15);
    rect(325, 540, 5, 5);
    rect(315, 530, 5, 5);
    rect(225, 490, 5, 5);
    rect(240, 490, 5, 5);

    //outlines
    fill(0, 0, 0);
    rect(210, 505, 5, 5);
    rect(230, 500, 5, 10);
    rect(250, 495, 35, 5);
    rect(285, 500, 5, 5);
    rect(290, 505, 5, 10);
    rect(295, 505, 10, 5);
    rect(305, 510, 15, 5);
    rect(320, 515, 5, 5);
    rect(325, 520, 5, 5);
    rect(330, 525, 5, 20);
    rect(326, 545, 5, 5);
    rect(320, 540, 5, 5);
    rect(300, 535, 20, 5);
    rect(295, 530, 5, 5);
    rect(290, 525, 5, 10);
    rect(285, 535, 5, 5);
    rect(280, 540, 5, 10);
    rect(270, 545, 10, 5);
    rect(250, 540, 20, 5);
    rect(240, 545, 10, 5);
    rect(235, 540, 5, 5);
    rect(230, 535, 5, 5);
    rect(225, 525, 5, 10);
    rect(220, 525, 5, 5);
    rect(215, 520, 5, 5);
    rect(210, 515, 5, 5);
    rect(205, 505, 5, 10);
    rect(210, 500, 5, 5);
    rect(215, 495, 5, 5);
    rect(220, 490, 5, 5);
    rect(225, 485, 10, 5);
    rect(235, 490, 5, 5);
    rect(240, 485, 10, 5);
    rect(250, 490, 5, 5);
    rect(205, 500, 5, 5);
    pop();
  }
  //duck
  push();
  noStroke();
  translate(-90, -50);

  //main color
  fill(248, 237, 212);
  rect(220, 525, 50, 20);
  rect(225, 545, 40, 5);
  rect(220, 500, 20, 30);
  rect(240, 520, 20, 5);
  rect(270, 530, 5, 5);

  //beak
  fill(255, 124, 33);
  rect(210, 510, 20, 5);
  rect(215, 515, 15, 5);

  //shading
  fill(234, 225, 211);
  rect(240, 540, 15, 5);
  rect(255, 535, 5, 5);

  //outline
  fill(0, 0, 0);
  rect(230, 505, 5, 5);
  rect(220, 505, 5, 5);
  rect(220, 495, 20, 5);
  rect(240, 500, 5, 20);
  rect(240, 515, 20, 5);
  rect(260, 520, 10, 5);
  rect(270, 525, 5, 5);
  rect(275, 530, 5, 5);
  rect(270, 535, 5, 10);
  rect(265, 545, 5, 5);
  rect(225, 550, 40, 5);
  rect(220, 545, 5, 5);
  rect(215, 520, 5, 25);
  rect(210, 515, 5, 5);
  rect(205, 510, 5, 5);
  rect(210, 505, 10, 5);
  rect(215, 500, 5, 5);
  pop();
}

function startScreen() {
  //starts with startscreen
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
  //gameover screen happens when the game is lost
  if (gameMode === "gameOver") {
    //game is no longer running
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
    //resets timer
    timer = millis();
  }
}

function setupLevel1() {
  //resets the bunny by placing a new one at the starting point
  bunny = new Bunny(width / 2 - grid / 2, height - grid, grid);
  //deattaches bunny
  bunny.attach(null);
  gameIsRunning = true;
  ongoingLevel = 1;
  //resets timer
  timer = millis();
}

function setupLevel2() {
  //resets the bunny by placing a new one at the starting point
  bunny = new Bunny(width / 2 - grid / 2, height - grid, grid);
  //deattaches bunny
  bunny.attach(null);
  gameIsRunning = true;
  ongoingLevel = 2;
  //resets timer
  timer = millis();
}

function setupLevel3() {
  //resets the bunny by placing a new one at the starting point
  bunny = new Bunny(width / 2 - grid / 2, height - grid, grid);
  //deattaches bunny
  bunny.attach(null);
  gameIsRunning = true;
  ongoingLevel = 3;
  //resets timer
  timer = millis();
}

function rulesScreen() {
  //rules screen appears when gamemode is rules and the game isn't running
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
      "Join three forest friends—a bunny, a hedgehog, and a squirrel—on their picnic day. But watch out! A thieving fox has stolen their goodies, and Bunny must navigate various obstacles to reclaim them. Dodge obstacles while moving forward. Jump on moving platforms, like ducks in a river, to progress. Reach the end before time runs out, avoiding obstacles and rivers along the way. Game over if you touch an obstacle, fall in the river, or run out of time. Good Luck!",
      40,
      200,
      420,
      200
    );
    pop();
    //resets timer
    timer = millis();
  }
}

function setup() {
  createCanvas(500, 550);
  frameRate(30);
  resetGame();
  //the row-index is zero
  let index = 0;

  if (ongoingLevel === 1 && gameMode !== "rules") {
    setupLevel1();
    gameIsRunning = true;
    timer = millis();
    // ROW 1
    //creates a row of foxes, with a maximum of 2 foxes in the row at the same time
    for (let i = 0; i < 2; i++) {
      //sets the distance between the foxes
      let x = i * 300 + 70;
      //sets the fox's x & y value, and the height and width, and lastly speed
      foxes[index] = new Fox(x, height - grid * 2, grid * 2, grid, 1);
      //puts the foxes in the index
      index++;
    }

    // ROW 2
    //creates a row of foxes, with a maximum of 3 foxes in the row at the same time
    for (let i = 0; i < 3; i++) {
      //sets the distance between the foxes
      let x = i * 200 + 70;
      //sets the fox's x & y value, and the height and width, and lastly speed
      foxes[index] = new Fox(x, height - grid * 3, grid * 2, grid, -3);
      //puts the foxes in the index
      index++;
    }

    // ROW 3
    //creates a row of foxes, with a maximum of 2 foxes in the row at the same time
    for (let i = 0; i < 2; i++) {
      //sets the distance between the foxes
      let x = i * 150 + 70;
      //sets the fox's x & y value, and the height and width, and lastly speed
      foxes[index] = new Fox(x, height - grid * 4, grid * 2, grid, 1);
      //puts the foxes in the index
      index++;
    }

    // ROW 4
    index = 0;
    //creates a row of ducks, with a maximum of 3 ducks in the row at the same time
    for (let i = 0; i < 3; i++) {
      //sets the distance between the ducks
      let x = i * 250 + 100;
      //sets the duck's x & y value, and the height and width, and lastly speed
      ducks[index] = new Duck(x, height - grid * 6.5, grid * 1, grid, 4);
      //puts the ducks in the index
      index++;
    }

    // ROW 5
    //creates a row of ducks, with a maximum of 3 ducks in the row at the same time
    for (let i = 0; i < 3; i++) {
      //sets the distance between the ducks
      let x = i * 200 + 30;
      //sets the duck's x & y value, and the height and width, and lastly speed
      ducks[index] = new Duck(x, height - grid * 7.5, grid * 1, grid, -3);
      //puts the ducks in the index
      index++;
    }
  }

  if (ongoingLevel === 2) {
    setupLevel2();
    gameIsRunning = true;
    timer = millis();

    foxes = [];
    ducks = [];
    // ROW 1
    //creates a row of foxes, with a maximum of 2 foxes in the row at the same time
    for (let i = 0; i < 2; i++) {
      //sets the distance between the foxes
      let x = i * 300 + 70;
      //sets the fox's x & y value, and the height and width, and lastly speed
      foxes[index] = new Fox(x, height - grid * 2, grid * 2, grid, 1);
      //puts the foxes in the index
      index++;
    }

    // ROW 2
    //creates a row of foxes, with a maximum of 3 foxes in the row at the same time
    for (let i = 0; i < 3; i++) {
      //sets the distance between the foxes
      let x = i * 200 + 70;
      //sets the fox's x & y value, and the height and width, and lastly speed
      foxes[index] = new Fox(x, height - grid * 3, grid * 2, grid, -3);
      //puts the foxes in the index
      index++;
    }

    // ROW 3
    //creates a row of foxes, with a maximum of 2 foxes in the row at the same time
    for (let i = 0; i < 2; i++) {
      //sets the distance between the foxes
      let x = i * 150 + 70;
      //sets the fox's x & y value, and the height and width, and lastly speed
      foxes[index] = new Fox(x, height - grid * 4, grid * 2, grid, 1);
      //puts the foxes in the index
      index++;
    }

    // ROW 4
    index = 0;
    //creates a row of ducks, with a maximum of 3 ducks in the row at the same time
    for (let i = 0; i < 3; i++) {
      //sets the distance between the ducks
      let x = i * 250 + 100;
      //sets the duck's x & y value, and the height and width, and lastly speed
      ducks[index] = new Duck(x, height - grid * 6.5, grid * 1, grid, 4);
      //puts the ducks in the index
      index++;
    }

    // ROW 5
    //creates a row of ducks, with a maximum of 3 ducks in the row at the same time
    for (let i = 0; i < 3; i++) {
      //sets the distance between the ducks
      let x = i * 200 + 30;
      //sets the duck's x & y value, and the height and width, and lastly speed
      ducks[index] = new Duck(x, height - grid * 7.5, grid * 1, grid, -3);
      //puts the ducks in the index
      index++;
    }
  }

  if (ongoingLevel === 3) {
    setupLevel3();
    gameIsRunning = true;
    timer = millis();

    foxes = [];
    ducks = [];
    // ROW 1
    //creates a row of foxes, with a maximum of 2 foxes in the row at the same time
    for (let i = 0; i < 2; i++) {
      //sets the distance between the foxes
      let x = i * 300 + 70;
      //sets the fox's x & y value, and the height and width, and lastly speed
      foxes[index] = new Fox(x, height - grid * 2, grid * 2, grid, 1);
      //puts the foxes in the index
      index++;
    }

    // ROW 2
    //creates a row of foxes, with a maximum of 3 foxes in the row at the same time
    for (let i = 0; i < 3; i++) {
      //sets the distance between the foxes
      let x = i * 200 + 70;
      //sets the fox's x & y value, and the height and width, and lastly speed
      foxes[index] = new Fox(x, height - grid * 3, grid * 2, grid, -3);
      //puts the foxes in the index
      index++;
    }

    // ROW 3
    //creates a row of foxes, with a maximum of 2 foxes in the row at the same time
    for (let i = 0; i < 2; i++) {
      //sets the distance between the foxes
      let x = i * 150 + 70;
      //sets the fox's x & y value, and the height and width, and lastly speed
      foxes[index] = new Fox(x, height - grid * 4, grid * 2, grid, 1);
      //puts the foxes in the index
      index++;
    }

    // ROW 4
    index = 0;
    //creates a row of ducks, with a maximum of 3 ducks in the row at the same time
    for (let i = 0; i < 3; i++) {
      //sets the distance between the ducks
      let x = i * 250 + 100;
      //sets the duck's x & y value, and the height and width, and lastly speed
      ducks[index] = new Duck(x, height - grid * 6.5, grid * 1, grid, 4);
      //puts the ducks in the index
      index++;
    }

    // ROW 5
    //creates a row of ducks, with a maximum of 3 ducks in the row at the same time
    for (let i = 0; i < 3; i++) {
      //sets the distance between the ducks
      let x = i * 200 + 30;
      //sets the duck's x & y value, and the height and width, and lastly speed
      ducks[index] = new Duck(x, height - grid * 7.5, grid * 1, grid, -3);
      //puts the ducks in the index
      index++;
    }
  }
}

function draw() {
  background(173, 117, 85);
  noStroke();

  //Screen options
  if (gameMode === "start") {
    startScreen();
    gameIsRunning = false;
  } else if (gameMode === "rules") {
    rulesScreen();
    gameIsRunning = false;
  } else if (gameMode === "gameOver") {
    gameOverScreen();
    gameIsRunning = false;
  } else if (gameMode === "gameWon") {
    wonGameScreen();
  } else if ((gameMode = "gameScreen")) {
    if (ongoingLevel === 1) {
      scenary1();
    } else if (ongoingLevel === 2) {
      scenary2();
    } else if (ongoingLevel === 3) {
      scenary3();
    }

    //updates and draws foxes based on the length of the array (amount of foxes)
    for (let i = 0; i < foxes.length; i++) {
      foxes[i].update();
      foxes[i].draw();

      //if bunny intersects/collides with fox, the game will restart
      if (bunny.intersects(foxes[i])) {
        resetGame();
      }
    }

    //updates and draws ducks based on the length of the array (amount of ducks)
    for (let i = 0; i < ducks.length; i++) {
      ducks[i].update();
      ducks[i].draw();
    }

    //specifies pond part, if bunny touches the bunny will not be ok
    if (
      bunny.y < height - grid * 5.5 &&
      bunny.y > height - grid * 8 &&
      bunny.y > grid * 2
    ) {
      let ok = false;

      //if bunny intersects/overlaps with duck, the bunny will attach to it
      for (let i = 0; i < ducks.length; i++) {
        if (bunny.intersects(ducks[i])) {
          ok = true;
          bunny.attach(ducks[i]);
        }
      }
      //if bunny not okay (if it touches the pond), the game will reset
      if (!ok) {
        resetGame();
      }
      //it will not be attached then
    } else {
      bunny.attach(null);
    }
    //update the bunny
    bunny.update();
    bunny.draw();

    //the following 7 lines of code was from: https://chatgpt.com/share/5956644f-8300-4379-8a0b-a50cc4756d00 Accessed: 2024-05-10

    //timer
    //returns the amount of milliseconds and will decrease to zero
    let timePass = millis() - timer;
    fill(0, 0, 0);
    textSize(20);
    text("Timer: " + Math.floor((timeLimit - timePass) / 1000), 400, 30);
    //if time hits zero, the game is over
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
  //game controls
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
  //rules screen
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
