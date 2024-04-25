//Based on thecodingtrain's Frogger code - https://editor.p5js.org/codingtrain/sketches/crMMFw8vD , https://youtu.be/giXV6xErw0Y

//GRID
let grid = 50;

let bunny;
let ducks = [];
let foxes = [];

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
  constructor(x, y, width) {
    super(x, y, width, width);
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
  bunny = new Bunny(width / 2 - grid / 2, height - grid, grid);
  bunny.attach(null);
}

//SETUP
function setup() {
  createCanvas(500, 500);
  resetGame();

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
    ducks[index] = new Duck(x, height - grid * 6, grid * 3, grid, 2.3);
    index++;
  }

  // ROW 6
  for (let i = 0; i < 3; i++) {
    let x = i * 200 + 30;
    ducks[index] = new Duck(x, height - grid * 7, grid * 2, grid, -1.3);
    index++;
  }
}

function draw() {
  background(0);
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
  }
}
