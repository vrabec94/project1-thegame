/** implements logic for the gameover.html
 *  - on mouseclick on button user will be redirected
 *   to the game
 * */
document.getElementById('game-is-over').onplay();

const gameOverButton = document.getElementById('play-again');
console.log(gameOverButton);
    gameOverButton.addEventListener("click", function() {
        location.href = 'letsplay.html';
    });