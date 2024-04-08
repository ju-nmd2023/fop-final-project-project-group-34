import {gridSize} from ("./game.js");
import hitRules from "./hit-rules";

function duck() {
    //body
    fill(255, 255, 102);
    ellipse(125, 370, 55, 40);
  
    //head
    fill(255, 255, 102);
    ellipse(150, 370, 30, 30);
  
    //beak
    fill(255, 143, 0);
    triangle(163, 365, 163, 377, 180, 369);
  
    //eyes
    fill(0);
    ellipse(153, 362, 4, 4);
    fill(0);
    ellipse(153, 376, 4, 4);
  
    //wings
    fill(255, 255, 102);
    ellipse(120, 355, 40, 10);
    fill(255, 255, 102);
    ellipse(120, 385, 40, 10);
  }