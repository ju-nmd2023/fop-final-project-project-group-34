export default class hitRules {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  isColliding(otherhitRules) {
    return (
      this.x < otherhitRules.x + otherhitRules.width &&
      this.x + this.width > otherhitRules.x &&
      this.y < otherhitRules.y + otherhitRules.height &&
      this.y + this.height > otherhitRules.y
    );
  }
}
