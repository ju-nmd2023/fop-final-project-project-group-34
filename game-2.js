// based on snake game from workshop

const gridLength = 11;
const gridSize = 30;

class Snake {
  constructor(x, y, gridSize, gridLength) {
    const point = new Point(x, y);
    const point2 = new Point(x + 2, y);
    this.elements = [point, point2];
    this.gridSize = gridSize;
    this.gridLength = gridLength;
    this.direction = new Direction(0, 0);
  }
  update() {
    const lastPosition = this.elements[0];
    const nextPosition = new Point(
      lastPosition.x + this.direction.x,
      lastPosition.y + this.direction.y
    );
    if (
      nextPosition.x < 0 ||
      nextPosition.x >= this.gridLength ||
      nextPosition.y < 0 ||
      nextPosition.y >= this.gridLength
    ) {
      console.log("OH NOO!");
    } else {
      this.elements.unshift(nextPosition);
      this.elements.pop();
    }
  }

  draw() {
    push();
    noStroke();
    fill(0, 255, 0);
    for (let point of this.elements) {
      rect(
        point.x * this.gridSize,
        point.y * this.gridSize,
        this.gridSize,
        this.gridSize
      );
    }
    pop();
  }
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Direction extends Point {
  turnLeft() {
    this.x = -1;
    this.y = 0;
  }
  turnRight() {
    this.x = 1;
    this.y = 0;
  }
  turnUp() {
    this.x = 0;
    this.y = -1;
  }
  turnDown() {
    this.x = 0;
    this.y = 1;
  }
}
const snake = new Snake((x = 5), (y = 10), gridSize, gridLength);

function setup() {
  createCanvas(400, 400);
  frameRate(10);
}

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

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.direction.turnUp();
    snake.update();
  }
  if (keyCode === DOWN_ARROW) {
    snake.direction.turnDown();
    snake.update();
  }
  if (keyCode === LEFT_ARROW) {
    snake.direction.turnLeft();
    snake.update();
  }
  if (keyCode === RIGHT_ARROW) {
    snake.direction.turnRight();
    snake.update();
  }
}

function draw() {
  background(0, 0, 0);
  drawGrid();

  snake.draw();
}
