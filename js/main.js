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
      console.log("position y after moving up" + this.positionY);
    }
  }
  moveDown() {
    if (this.positionY > 0) {
      this.positionY--;
      this.domElement.style.bottom = this.positionY + "vh";
      console.log("position y after moving down" + this.positionY);
    }
  }
  // initialise Player
}
const player = new Player();
player.attachEventListeners();

setInterval(() => {
  player.moveDown();
}, 100);

class Obstacle {
  constructor() {
    this.width = 10;
    this.height = 10;
    this.positionX = 80;
    this.positionY = 0;

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
        console.log("position of obstacle" + this.positionX);
    }
  }
}
this.obstacles = [];
setInterval(() => {
    const newObstacle = new Obstacle();
    obstacles.push(newObstacle);
}, 500);
//Update obstacles
setInterval(() => {
    obstacles.forEach((obstacleInstance) => {

        //move current obstacle
        obstacleInstance.moveLeft();

        //detect if there's a collision between player and current obstacle
        //this.detectCollision(obstacleInstance);

        //check if we need to remove current obstacle
        //this.removeObstacleIfOutside(obstacleInstance);
        
    });
}, 50)