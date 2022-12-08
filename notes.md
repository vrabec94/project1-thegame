
<div id="board">


    <div class="lowerObstacle">
        
    </div>

    <div class="enemy"></div>

</div>


new Enemy(this.positionX , this.positionY)


class Enemy {
    constructor(posX, posY) {


___________

- aim for descriptive names.
- (super bonus) class Game
  - this.bottomObstacleArr = [];
  - this.topObstacleArr = [];
  - start() {
        //....
        this.detectCollision();
        //....
  }

  /*
  .modal {
    position: absolute; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  }
  
  .modal-content {
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */
  }
  */


https://vrabec94.github.io/project1-thegame/img/pngwing.com.png

img/temple1.png
img/other-clouds.png
does not work

audio/the-dragon-boy-bottomless-pit.mp3
audio/spirited-away-theme-song.mp3

position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  background-color: rgba(#000, 0.5);
  width: 100%;
  max-width: 600px;
  padding: 5px;
  border: 2px solid $color-alpha;
  &:before, &:after {
    content: "•";
    position: absolute;
    width: 14px;
    height: 14px;
    font-size: 14px;
    color: $color-alpha;
    border: 2px solid $color-alpha;
    line-height: 12px;
    top: 5px;
    text-align: center;
  }
  &:before {
    left: 5px;
  }
  &:after {
    right: 5px;
  }
  .box-inner {
    position: relative;
    border: 2px solid $color-alpha;
    padding: 40px;
    &:before, &:after {
      content: "•";
      position: absolute;
      width: 14px;
      height: 14px;
      font-size: 14px;
      color: $color-alpha;
      border: 2px solid $color-alpha;
      line-height: 12px;
      bottom: -2px;
      text-align: center;
    }
    &:before {
      left: -2px;
    }
    &:after {
      right: -2px;
    }
  }