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
    this.width = 20;
    this.height = 15;
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
    this.domElement.style.width = this.width + "%";
    this.domElement.style.height = this.height + "%";
    this.domElement.style.bottom = this.positionY + "%";
    this.domElement.style.left = this.positionX + "%";

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
    this.gravitySpeed = 0;
    if (this.positionY < 100) {
      this.positionY += 5;
      this.domElement.style.bottom = this.positionY + "%";
    }
  }
  moveDown() {
    if (this.positionY > 0) {
      this.gravitySpeed += this.gravity;
      this.positionX -= this.speedX;
      this.positionY -= this.speedY + this.gravitySpeed;
      this.domElement.style.bottom = this.positionY + "%";
    }
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
    this.width = 5;
    this.height = height;
    this.positionX = 100;
    this.positionY = positionY;

    this.domElement = null;
    this.createDomElement();
  }
  createDomElement() {
    this.domElement = document.createElement("div");

    this.domElement.className = "obstacle";
    this.domElement.style.width = this.width + "%";
    this.domElement.style.height = this.height + "%";
    this.domElement.style.bottom = this.positionY + "%";
    this.domElement.style.left = this.positionX + "%";

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
    this.firstDivInObst = null;
    this.secondDivInObst = null;
    this.createLowerDomElement();
  }
  createLowerDomElement() {
    this.domElement = document.createElement("div");
    this.firstDivInObst = document.createElement("div");
    this.secondDivInObst = document.createElement("div");

    this.domElement.className = "obstacle";
    this.domElement.style.width = this.width + "%";
    this.domElement.style.height = this.height + "%";

    this.domElement.style.bottom = this.positionY + "%";
    this.domElement.style.left = this.positionX + "%";

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
      this.oneEnemy = new Enemy();
      this.secondDivInObst.appendChild(this.oneEnemy.domElement);
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
  const bottomObstacles = new lowerObstacle(0, Math.random() * (60 - 10) + 10);
  const topObstacles = new Obstacle(90, 10);
  bottomObstacleArr.push(bottomObstacles);
  topObstacleArr.push(topObstacles);
}, 3000);

setInterval(handleObstacles, 300, bottomObstacleArr);
setInterval(handleObstacles, 300, topObstacleArr);

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
    //location.href = "gameover.html";
  }
  if (oneObstacle.oneEnemy !== null && oneObstacle.oneEnemy !== undefined) {
    if (oneObstacle.positionX < 40) {
      handleEnemies(oneObstacle, oneObstacle.oneEnemy);
    }
  }
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
      console.log("removed.. array length is now" + bottomObstacleArr.length);
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
  constructor() {
    this.width = 20;
    this.height = 20;
    this.positionX = 0;
    this.positionY = 0;

    this.domElement = null;
    this.createDomElement();
    this.closeToEnemy = null;
  }
  createDomElement() {
    this.domElement = document.createElement("div");

    this.domElement.className = "enemy";
    this.domElement.style.width = this.width + "%";
    this.domElement.style.height = this.height + "%";
    this.domElement.style.bottom = this.positionY + "%";
    this.domElement.style.left = this.positionX + "%";
  }
  moveUp() {
    this.positionY += 10;
    this.domElement.style.bottom = this.positionY + "%";
  }
}
function handleEnemies(obstacleOfEnemy, enemy) {
  enemy.moveUp();
  detectEnemyCollision(obstacleOfEnemy, enemy);
}
function detectEnemyCollision(obstacleOfEnemy, enemy) {
  if (
    player.positionX < obstacleOfEnemy.positionX + enemy.width &&
    player.positionX + player.width > obstacleOfEnemy.positionX &&
    player.positionY < enemy.positionY + enemy.height &&
    player.height + player.positionY > enemy.positionY
  ) {
    console.log("COLLISION DETECTED");
  }
}
