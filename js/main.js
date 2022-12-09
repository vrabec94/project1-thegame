/** Class Game
 *  - creates one player, one array of top obstacles, one array of bottom obstacles
 *  - fills the both arrays in 1s intervals consistently with their obstacles
 *  the lower obstacles are created with random heights
 *  - every item of both arrays will be moved to the left, checked for collision
 *  with the player and possibly removed from board in 0.1s intervals
 *  - player is consistently moved down in 0.1s intervals
 *  - player is consistently loosing energy (starting at 100)
 */
class Game {
  constructor() {
    this.bottomObstacleArr = [];
    this.topObstacleArr = [];
    this.player = null;
  }
  start() {
    this.player = new Player();
    this.player.attachEventListeners();

    setInterval(() => {
      const bottomObstacles = new LowerObstacle(
        0,
        Math.random() * (35 - 10) + 10
      );
      const topObstacles = new Obstacle(70, 10);
      this.bottomObstacleArr.push(bottomObstacles);
      this.topObstacleArr.push(topObstacles);
    }, 1000);

    setInterval(() => {
      this.bottomObstacleArr.forEach((oneObstacle) => {
        oneObstacle.moveLeft();
        oneObstacle.detectCollision();
        oneObstacle.removeObstacles();
      });
    }, 100);

    setInterval(() => {
      this.topObstacleArr.forEach((oneObstacle) => {
        oneObstacle.moveLeft();
        oneObstacle.detectCollision();
        oneObstacle.removeObstacles();
      });
    }, 100);

    setInterval(() => {
      this.player.movingDown();
    }, 100);

    setInterval(() => {
      this.player.loosingEnergy();
    }, 5000);
  }
}

/**  Class Player
 *  - Creates a dom Element, the player on the left side of the box
 *  - Player gets pulled down by gravity 0.15
 *  - Gravity increases, the closer the player gets to the bottom of board
 *  - attachEventListener to detect user pressing on arrow up and space bar
 *  - function movingUp, changes players x position
 *  - function movingDown, implements gravity on player, changes players y position
 *  - function loosing energy, player looses energy by -10 every 5s
 *  - function gaining energy, player gains energy by +10 when eating sushi
 *  - function shoot, creates a new Object Shooter
 */

class Player {
  constructor() {
    this.width = 16;
    this.height = 6;
    this.positionX = 5;
    this.positionY = 60;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0.15;
    this.gravitySpeed = 0;

    this.domElement = null;
    this.energy = 100;
    this.createDomElement();
  }

  createDomElement() {
    this.domElement = document.createElement("div");

    this.domElement.id = "player";
    this.domElement.style.width = this.width + "vw";
    this.domElement.style.height = this.height + "vh";
    this.domElement.style.bottom = this.positionY + "vh";
    this.domElement.style.left = this.positionX + "vw";

    const boardElm = document.getElementById("game-environment");
    boardElm.appendChild(this.domElement);
  }
  attachEventListeners() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowUp") {
        document.getElementById("wings").play();
        this.movingUp();
      }
    });
    document.addEventListener("keydown", (event2) => {
      if (event2.key === " ") {
        document.getElementById("shooter-boh").play();
        this.shoot();
      }
    });
  }
  loosingEnergy() {
    if (this.energy <= 10) {
      location.href = "gameover.html";
    }
    this.energy -= 10;
    document.getElementById("fuel-bar").value = this.energy;
  }
  gainingEnergy() {
    if (this.energy < 100) {
      this.energy += 10;
    }
    document.getElementById("fuel-bar").value = this.energy;
  }

  movingUp() {
    this.gravitySpeed = 0;
    if (this.positionY < 100) {
      this.positionY += 5;
      this.domElement.style.bottom = this.positionY + "vh";
    }
  }
  movingDown() {
    if (this.positionY > 0) {
      this.gravitySpeed += this.gravity;
      this.positionX -= this.speedX;
      this.positionY -= this.speedY + this.gravitySpeed;
      this.domElement.style.bottom = this.positionY + "vh";
    }
  }
  shoot() {
    const shooting = new Shooter();
    shooting.movingDown();
  }
}

/** class Obstacle
 *  - creates the Object Obstacle with parameters positionY
 *   to differentiate between bottom and top obstacles
 *  - parameter height to give the obstacles on the bottom
 *   a random height
 *  - creates a dom Element, the obstacles on top and bottom of the board
 *  - function moveLeft moves the obstacles from right to left
 *  and prevents obstacles from moving outside of the game area
 *  - function detectCollision, detects collision between obstacle and player
 *  - function removeObstacles, removes Obstacles when they are outside of the board
 */

class Obstacle {
  constructor(positionY, height) {
    this.width = 8;
    this.height = height;
    this.positionX = 100;
    this.positionY = positionY;

    this.domElement = null;
    this.createDomElement();
  }
  createDomElement() {
    this.domElement = document.createElement("div");

    this.domElement.className = "obstacle";
    this.domElement.style.width = this.width + "vw";
    this.domElement.style.height = this.height + "vh";
    this.domElement.style.bottom = this.positionY + "vh";
    this.domElement.style.left = this.positionX + "vw";

    if (this.domElement.positionY !== 0) {
      this.domElement.style.background =
        'url("img/final-final-clouds.png") no-repeat';
      this.domElement.style.backgroundSize = "100% 100%";
    }

    const boardElm = document.getElementById("game-environment");
    boardElm.appendChild(this.domElement);
  }
  moveLeft() {
    if (this.positionX + this.width > 0) {
      this.positionX--;
      this.domElement.style.left = this.positionX + "vw";
    }
  }

  detectCollision() {
    if (
      flyAway.player.positionX < this.positionX + this.width &&
      flyAway.player.positionX + flyAway.player.width > this.positionX &&
      flyAway.player.positionY < this.positionY + this.height &&
      flyAway.player.height + flyAway.player.positionY > this.positionY
    ) {
      location.href = "gameover.html";
    }
  }

  removeObstacles() {
    if (this.positionX + this.width <= 0) {
      this.domElement.remove();
      if (this.positionY === 0) {
        flyAway.bottomObstacleArr.shift();
      } else if (this.positionY === 90) {
        flyAway.topObstacleArr.shift();
      }
    }
  }
}

/** class LowerObstacle
 *  - extends Obstacle, has possibly one extra enemy or one extra foodItem
 *  - creates three domElements, one div to put the other divs in, to use different
 *   images on top of each other
 *  - creates new instances of Enemy and FoodItem
 *  - randomly places enemies on obstacles, if there are none placed it might randomly
 *   place foodItems on obstacles
 *  - function moveLeft, moves the LowerObstacle to the left and invokes updatePosition()
 *   to keep track of x and y positions of their Enemies/foodItems
 *  - randomTemple() generates a random image for the bottom Obstacle
 */
class LowerObstacle extends Obstacle {
  constructor(positionY, height, width, positionX) {
    super(width, positionX);
    this.positionY = positionY;
    this.height = height;

    this.domElement = null;
    this.oneEnemy = null;
    this.foodItem = null;
    //this.enemyPositionCounter = 0;
    this.firstDivInObst = null;
    this.secondDivInObst = null;
    this.createLowerDomElement();
  }
  createLowerDomElement() {
    this.domElement = document.createElement("div");
    this.firstDivInObst = document.createElement("div");
    this.secondDivInObst = document.createElement("div");

    this.domElement.className = "obstacle";
    this.domElement.style.width = this.width + "vw";
    this.domElement.style.height = this.height + "vh";

    this.domElement.style.bottom = this.positionY + "vh";
    this.domElement.style.left = this.positionX + "vw";

    this.secondDivInObst.className = "house-obstacle";
    this.secondDivInObst.style.height = "10vh";

    this.secondDivInObst.style.background = this.randomTemple();
    this.secondDivInObst.style.backgroundSize = "100% 100%";
    this.firstDivInObst.className = "landscape-obstacle";
    this.firstDivInObst.style.top = "10vh";
    this.firstDivInObst.style.bottom = "0";
    this.firstDivInObst.style.height = "100%";

    const boardElm = document.getElementById("game-environment");
    boardElm.appendChild(this.domElement);

    this.domElement.appendChild(this.secondDivInObst);
    this.domElement.appendChild(this.firstDivInObst);

    const ememyIsOnHouse = Math.random() < 0.5;

    if (ememyIsOnHouse) {
      this.oneEnemy = new Enemy(this.positionX, this.height);
      boardElm.appendChild(this.oneEnemy.domElement);
    } else {
      const makeFoodAppear = Math.random() < 0.4;
      if (makeFoodAppear) {
        this.foodItem = new FoodItem(this.positionX, this.positionY);
        boardElm.appendChild(this.foodItem.domElement);
      }
    }
  }
  moveLeft() {
    if (this.positionX + this.width > 0) {
      this.positionX--;
      this.domElement.style.left = this.positionX + "vw";
    }
    if (this.oneEnemy !== null && this.oneEnemy !== undefined) {
      this.oneEnemy.updatePosition(this.positionX, this.positionY, this.height);
    }
    if (this.foodItem != null && this.foodItem !== undefined) {
      this.foodItem.updatePosition(this.positionX, this.positionY, this.height);
    }
  }
  randomTemple() {
    const templeImg = [
      "img/temple1.png",
      "img/temple2.png",
      "img/temple3.png",
      "img/temple4.png",
      "img/temple5.png",
    ];
    const randomImg = Math.floor(Math.random() * templeImg.length);
    return "url(" + '"' + templeImg[randomImg] + '"' + ") no-repeat";
  }
}

class Enemy {
  constructor(positionX, positionY) {
    this.width = 3;
    this.height = 12;
    this.positionX = positionX;
    this.positionY = positionY;
    this.className = "enemy";

    this.domElement = null;
    this.createDomElement(this.className);
    this.enemyPositionCounter = 0;
  }
  createDomElement(className) {
    this.domElement = document.createElement("div");

    this.domElement.className = className;
    this.domElement.style.width = this.width + "vw";
    this.domElement.style.height = this.height + "vh";
    this.domElement.style.bottom = this.positionY + "vh";
    this.domElement.style.left = this.positionX + "vw";
  }

  updatePosition(posX, posY, height) {
    if (this.positionX < 0) {
      this.domElement.remove();
    }
    if (this.positionX < 40) {
      this.positionX = posX;
      this.positionY = posY + height - 10 + this.enemyPositionCounter;
      this.domElement.style.bottom = this.positionY + "vh";
      this.domElement.style.left = this.positionX + "vw";
      this.enemyPositionCounter++;
      this.detectEnemyCollision();
    } else {
      this.positionX = posX;
      this.positionY = posY + height - 10;
      this.domElement.style.bottom = this.positionY + "vh";
      this.domElement.style.left = this.positionX + "vw";
      this.detectEnemyCollision();
    }
  }
  detectEnemyCollision() {
    if (
      flyAway.player.positionX < this.positionX + this.width &&
      flyAway.player.positionX + flyAway.player.width > this.positionX &&
      flyAway.player.positionY < this.positionY + this.height &&
      flyAway.player.height + flyAway.player.positionY > this.positionY
    ) {
      if (this instanceof FoodItem) {
        document.getElementById("success").play();
        this.domElement.remove();
        this.positionX = 0;
        this.positionY = 0;
        flyAway.player.gainingEnergy();
      } else {
        location.href = "gameover.html";
      }
    }
  }
}

class FoodItem extends Enemy {
  constructor(positionX, positionY, domElement) {
    super(domElement);
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = 2.5;
    this.height = 4.5;

    this.className = "fuel";
    this.createDomElement(this.className);

    this.fuelPositionCounter = 0;
  }
}

class Shooter {
  constructor() {
    this.positionX = flyAway.player.positionX + flyAway.player.width;
    this.positionY = flyAway.player.positionY + flyAway.player.height;
    this.width = 3;
    this.height = 10;

    this.shooter = null;
    this.createShooter();
  }
  createShooter() {
    this.shooter = document.createElement("div");

    this.shooter.className = "shooting-ball";
    this.shooter.style.width = this.width + "vw";
    this.shooter.style.height = this.height + "vh";
    this.shooter.style.bottom = this.positionY + "vh";
    this.shooter.style.left = this.positionX + "vw";

    const boardElement = document.getElementById("game-environment");
    boardElement.appendChild(this.shooter);
  }
  movingDown() {
    setInterval(() => {
      this.positionY--;
      this.shooter.style.bottom = this.positionY + "vh";
      this.positionX++;
      this.shooter.style.left = this.positionX + "vw";
      if (this.positionY < 0) {
        this.shooter.remove();
      }
      if (this.positionY > 0) {
        this.detectShooterCollision();
      }
    }, 100);
  }

  detectShooterCollision() {
    const allEnemies = flyAway.bottomObstacleArr.filter((obstacle) => {
      return obstacle.oneEnemy !== null && obstacle.oneEnemy !== undefined;
    });
    const allFoodItems = flyAway.bottomObstacleArr.filter((obstacle) => {
      return obstacle.foodItem !== null && obstacle.foodItem !== undefined;
    });
    allEnemies.forEach((obstacle) => {
      if (
        this.positionX <
          obstacle.oneEnemy.positionX + obstacle.oneEnemy.width &&
        this.positionX + this.width > obstacle.oneEnemy.positionX &&
        this.positionY <
          obstacle.oneEnemy.positionY + obstacle.oneEnemy.height &&
        this.height + this.positionY > obstacle.oneEnemy.positionY
      ) {
        document.getElementById("shot-enemy").play();
        obstacle.oneEnemy.domElement.remove();
        obstacle.oneEnemy = null;
      }
    });
    allFoodItems.forEach((obstacle) => {
      if (
        this.positionX <
          obstacle.foodItem.positionX + obstacle.foodItem.width &&
        this.positionX + this.width > obstacle.foodItem.positionX &&
        this.positionY <
          obstacle.foodItem.positionY + obstacle.foodItem.height &&
        this.height + this.positionY > obstacle.foodItem.positionY
      ) {
        obstacle.foodItem.domElement.remove();
        obstacle.foodItem = null;
      }
    });
  }
}

const flyAway = new Game();
flyAway.start();
