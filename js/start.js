/** implements logic for the start.html
 *  - on mouseclick on button user will be redirected
 *   to the game
 * */

const startGameButton = document.getElementById('start');
    startGameButton.addEventListener("click", function() {
        location.href = 'letsplay.html';
    });

    