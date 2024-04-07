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



overlaps (otherhitRules) {
    let left = this.x;
    let right = this.x + this.width;
    let top = this.y;
    let bottom = this.y + this.height;


    let otherLeft = otherhitRules.x;
    let otherRight = otherhitRules.x + otherhitRules.width;
    let otherTop = otherhitRules.y;
    let otherBottom = otherhitRules.y + otherhitRules.height;

    return ! (
        left >= otherRight ||
        right <= otherLeft ||
        top >= otherBottom ||
        bottom <= otherTop
    );
}