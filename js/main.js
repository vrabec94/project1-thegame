class Player {
  constructor() {
    this.width = 20;
    this.height = 10;
    this.positionX = 0;
    this.positionY = 50 - this.width / 2;

    this.domElement = null;
    this.createDomElement();
  }

  // initialise Player
  // create Dom Element Player
  createDomElement() {
    // step1: create the element:
    this.domElement = document.createElement("div");

    // step2: add content or modify (ex. innerHTML...)
    this.domElement.id = "player";
    this.domElement.style.width = this.width + "vw";
    this.domElement.style.height = this.height + "vh";
    this.domElement.style.bottom = this.positionY + "vh";
    this.domElement.style.left = this.positionX + "vw";

    //step3: append to the dom: `parentElm.appendChild()`
    const boardElm = document.getElementById("game-environment");
    boardElm.appendChild(this.domElement);
  }
  attachEventListeners() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowUp") {
        player.moveUp();
        console.log("Key UP");
      }
    });
  }
  moveUp() {
    if (this.positionY < 100) {
      this.positionY += 10;
      this.domElement.style.bottom = this.positionY + "vh";
      //console.log("position y after moving up" + this.positionY);
    }
  }
  moveDown() {
    if (this.positionY > 0) {
      this.positionY--;
      this.domElement.style.bottom = this.positionY + "vh";
      //console.log("position y after moving down" + this.positionY);
    }
  }
  // initialise Player
}
const player = new Player();
player.attachEventListeners();

setInterval(() => {
  player.moveDown();
}, 100);

function detectCollision(obstacleInstance){
    if (
        player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
        player.positionX + player.width > obstacleInstance.positionX &&
        player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
        player.height + player.positionY > obstacleInstance.positionY
    ) {
        console.log(obstacleInstance.width)
        console.log("collision detected!!");
        //location.href = 'gameover.html';
    }
};
function removeObstacleIfOutside(obstacleInstance){
    if (obstacleInstance.positionX <= 0) {
        obstacleInstance.domElement.remove(); //remove dom element
        console.log("Removing elements..");
        if(obstacleInstance.positionY === 0) {
            bottomObstacleArr.shift();
        } else if (obstacleInstance.positionY === 90) {
            topObstacleArr.shift();
        }
    }
}

class Obstacle {
  constructor(positionY) {
    this.width = 10;
    this.height = 10;
    this.positionX = 100;
    this.positionY = positionY;

    this.domElement = null;
    this.createDomElement();
  }
  createDomElement() {
    // step1: create the element:
    this.domElement = document.createElement("div");

    // step2: add content or modify (ex. innerHTML...)
    this.domElement.className = "obstacle";
    this.domElement.style.width = this.width + "vw";
    this.domElement.style.height = this.height + "vh";
    this.domElement.style.bottom = this.positionY + "vh";
    this.domElement.style.left = this.positionX + "vw";

    //step3: append to the dom: `parentElm.appendChild()`
    const boardElm = document.getElementById("game-environment");
    boardElm.appendChild(this.domElement);
  }
  moveLeft() {
    if (this.positionX > 0) {
        this.positionX--;
        this.domElement.style.left = this.positionX + 'vw';
        //console.log("position of obstacle" + this.positionX);
    }
  }
}
this.bottomObstacleArr = [];
this.topObstacleArr = [];
setInterval(() => {
    const bottomObstacles = new Obstacle(0);
    const topObstacles = new Obstacle(90);
    //console.log("position y" + bottomObstacles.positionY);
    bottomObstacleArr.push(bottomObstacles);
    topObstacleArr.push(topObstacles);
}, 500);

//Update obstacles
setInterval(createObstacles, 50, bottomObstacleArr);
setInterval(createObstacles, 50, topObstacleArr);

function createObstacles(obstacles) {

    obstacles.forEach((obstacleInstance) => {

        //move current obstacle
        obstacleInstance.moveLeft();

        //detect if there's a collision between player and current obstacle
        detectCollision(obstacleInstance);

        //check if we need to remove current obstacle
        removeObstacleIfOutside(obstacleInstance);
        console.log('Length of array: ' + obstacles.length);
    });
};
