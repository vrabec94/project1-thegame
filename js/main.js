/**  Class Player
 *  - Creates a dom Element, the player on the left side of the box
 *  - Player gets pulled down by gravity 0.1
 *  - Gravity increases with time, the closer the player gets to the bottom
 *  - attachEventListener to detect mouseclick on arrow up
 *  - function moveUp, triggered by mouseclick on arrow up, changes its position
 *  - function moveDown, implements gravity to player, changes its position
 */

class Player {
  constructor() {
    this.width = 10;
    this.height = 5;
    this.positionX = 5;
    this.positionY = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0.15;
    this.gravitySpeed = 0;

    this.domElement = null;
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
        player.moveUp();
      }
    });
    document.addEventListener("keydown", (event2) => {
      if (event2.key === " ") {
        player.shoot();
      }
    });
  }

  moveUp() {
    this.gravitySpeed = 0;
    if (this.positionY < 100) {
      this.positionY += 5;
      this.domElement.style.bottom = this.positionY + "vh";
    }
  }
  moveDown() {
    if (this.positionY > 0) {
      this.gravitySpeed += this.gravity;
      this.positionX -= this.speedX;
      this.positionY -= this.speedY + this.gravitySpeed;
      this.domElement.style.bottom = this.positionY + "vh";
    }
  }
  shoot() {
    const shooting = new Shooter();
    shooting.moveDown();
  }
}

/** class Obstacle
 *  - creates the Object Obstacle with parameters positionY
 *   to differentiate between bottom and top obstacles
 *  - parameter height to give the obstacles on the bottom
 *   a random height
 *  - function moveLeft moves the obstacles from right to left
 *  and prevents obstacles from moving outside of the game area
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
        'url("../img/cloud-pixel.png") no-repeat';
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
}
class lowerObstacle extends Obstacle {
  constructor(positionY, height, width, positionX) {
    super(width, positionX);
    this.positionY = positionY;
    this.height = height;

    this.domElement = null;
    this.oneEnemy = null;
    this.enemyPositionCounter = 0;
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

    this.firstDivInObst.className = "landscape-obstacle";
    this.firstDivInObst.style.top = "10vh";
    this.firstDivInObst.style.bottom = "0";
    this.firstDivInObst.style.height = "100%";

    const boardElm = document.getElementById("game-environment");
    boardElm.appendChild(this.domElement);

    this.domElement.appendChild(this.secondDivInObst);
    this.domElement.appendChild(this.firstDivInObst);

    const ememyIsOnHouse = Math.random() < 0.3;

    if (ememyIsOnHouse) {
      this.oneEnemy = new Enemy(this.positionX, this.height);
      boardElm.appendChild(this.oneEnemy.domElement);
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
  }
}

/* Initialising player, starting game */
const player = new Player();
player.attachEventListeners();

/* Make the Player fall down consistently */
setInterval(() => {
  player.moveDown();
}, 100);

/** Create obstacles
 * - fill two arrays with obstacles with a delay of 0.5 seconds inbetween
 *   to create obstacles consistently on top and bottom
 * - bottom obstacles are created with a random height between 10 and 60
 */

const bottomObstacleArr = [];
const topObstacleArr = [];

setInterval(() => {
  const bottomObstacles = new lowerObstacle(0, Math.random() * (35 - 10) + 10);
  const topObstacles = new Obstacle(70, 10);
  bottomObstacleArr.push(bottomObstacles);
  topObstacleArr.push(topObstacles);
}, 1000);

setInterval(handleObstacles, 100, bottomObstacleArr);
setInterval(handleObstacles, 100, topObstacleArr);

/** Detect Collision
 *  between the player and the obstacles on the bottom and the top
 *  redirects to a new page if collision is detected
 */

function detectCollision(oneObstacle) {
  if (
    player.positionX < oneObstacle.positionX + oneObstacle.width &&
    player.positionX + player.width > oneObstacle.positionX &&
    player.positionY < oneObstacle.positionY + oneObstacle.height &&
    player.height + player.positionY > oneObstacle.positionY
  ) {
    location.href = "gameover.html";
  }
  /*
  if (oneObstacle.oneEnemy !== null && oneObstacle.oneEnemy !== undefined) {
    if (oneObstacle.positionX < 40) {
      //detectEnemyCollision();
      handleEnemies(oneObstacle, oneObstacle.oneEnemy);
    } 
  }
  */
}
/** Remove Obstacles
 *  removes Obstacles from array and from the html document
 *  if they move outside of the game area
 */
function removeObstacles(oneObstacle) {
  if (oneObstacle.positionX + oneObstacle.width <= 0) {
    oneObstacle.domElement.remove();
    if (oneObstacle.positionY === 0) {
      bottomObstacleArr.shift();
      //console.log("removed.. array length is now" + bottomObstacleArr.length);
    } else if (oneObstacle.positionY === 90) {
      topObstacleArr.shift();
    }
  }
}
/** handle Obstacles
 *  iterates through the arrays of bottom and top
 *  arrays
 */
function handleObstacles(obstacles) {
  obstacles.forEach((oneObstacle) => {
    oneObstacle.moveLeft();

    detectCollision(oneObstacle);

    removeObstacles(oneObstacle);
  });
}

class Enemy {
  constructor(positionX, positionY) {
    this.width = 3;
    this.height = 10;
    this.positionX = positionX;
    this.positionY = positionY;

    this.domElement = null;
    this.createDomElement();
    this.closeToEnemy = null;
    this.enemyPositionCounter = 0;
  }
  createDomElement() {
    this.domElement = document.createElement("div");

    this.domElement.className = "enemy";
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
      detectEnemyCollision(this);
    } else {
      this.positionX = posX;
      this.positionY = posY + height - 10;
      this.domElement.style.bottom = this.positionY + "vh";
      this.domElement.style.left = this.positionX + "vw";
      detectEnemyCollision(this);
    }
  }
}

function detectEnemyCollision(enemy) {
  if (
    player.positionX < enemy.positionX + enemy.width &&
    player.positionX + player.width > enemy.positionX &&
    player.positionY < enemy.positionY + enemy.height &&
    player.height + player.positionY > enemy.positionY
  ) {
    location.href = "gameover.html";
  }
}

class Shooter {
  constructor() {
    this.positionX = player.positionX + player.width;
    this.positionY = player.positionY + player.height;
    this.width = 2;
    this.height = 3;

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
  moveDown() {
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
    const allEnemies = bottomObstacleArr.filter((obstacle) => {
      return obstacle.oneEnemy !== null && obstacle.oneEnemy !== undefined;
    });
    allEnemies.forEach((obstacle) => {
      if (
        this.positionX < obstacle.oneEnemy.positionX + obstacle.oneEnemy.width &&
        this.positionX + this.width > obstacle.oneEnemy.positionX &&
        this.positionY < obstacle.oneEnemy.positionY + obstacle.oneEnemy.height &&
        this.height + this.positionY > obstacle.oneEnemy.positionY
      ) {
        console.log(obstacle.oneEnemy.domElement);
        obstacle.oneEnemy.domElement.remove();
        obstacle.oneEnemy = null;
      }
    });
  }
}
