class Player {
  constructor() {
    this.width = 20;
      this.height = 10;
      this.positionX = 0;
      this.positionY = 50 - (this.width / 2);

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
    this.positionY+= 10;
    this.domElement.style.bottom = this.positionY + "vh";
    console.log('position y after moving up' + this.positionY);

  }
  moveDown() {
    this.positionY--;
    this.domElement.style.bottom = this.positionY + "vh";
    console.log("position y after moving down" + this.positionY);
  }
    // initialise Player
}
const player = new Player();
player.attachEventListeners();

setInterval(() => {
    player.moveDown();
  }, 100);
