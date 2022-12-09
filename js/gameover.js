/** implements logic for the gameover.html
 *  - on mouseclick on button user will be redirected
 *   to the game
 * */
document.getElementById('game-is-over').play();

const restartGameButton = document.getElementById('play-again');
    restartGameButton.addEventListener("click", function() {
        location.href = 'letsplay.html';
    });