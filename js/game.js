let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let isMobile = false;

/**
 * Initializes the canvas element by calling the loadCanvas function.
 *
 * @return {Promise<void>} 
 */
async function init() {
    await loadCanvas();
}

/**
 * Hides certain elements and shows the 'landscapeMassage' element.
 *
 */
function landscapeMassage() {
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('endScreenLost').classList.add('d-none');
    document.getElementById('endScreenWin').classList.add('d-none');
    document.getElementById('ingameMenu').classList.add('d-none');
    document.getElementById('landscapeMassage').classList.remove('d-none');
}

/**
 * Starts the game by initializing level, setting gameStarted to true, creating a world, and displaying canvas and game menu.
 *
 */
async function startGame() {
    if (!canvas) {
        await loadCanvas();
    }
    initlevel();
    gameStarted = true;
    world = new World(canvas, keyboard);
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('endScreenLost').classList.add('d-none');
    document.getElementById('endScreenWin').classList.add('d-none');
    document.getElementById('ingameMenu').classList.remove('d-none');
    showIngameControls('show');
    gameSounds.game_theme.play();

}

/**
 * Loads the canvas element by getting the element with id 'canvas'.
 *
 * @return {Promise<void>} 
 */
async function loadCanvas() {
    canvas = document.getElementById('canvas');
}

/**
 * Shows the game menu and hides other screens based on the game state.
 *
 */
function showMenu() {
    document.getElementById('endScreenLost').classList.add('d-none');
    document.getElementById('gameMenu').classList.remove('d-none');
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('endScreenWin').classList.add('d-none');
    document.getElementById('ingameMenu').classList.add('d-none');
    if (gameStarted) {
        document.getElementById('leaveGameBtn').classList.remove('d-none');
        stopIntervals();
    } else {
        document.getElementById('leaveGameBtn').classList.add('d-none');
    }
}

/**
 * Hides menu and shows canvas or start screen based on the game state.
 *
 */
function leaveMenu() {
    document.getElementById('gameMenu').classList.add('d-none');
    document.getElementById('endScreenWin').classList.add('d-none');
    document.getElementById('ingameMenu').classList.add('d-none');
    if (gameStarted) {
        document.getElementById('canvas').classList.remove('d-none');
        document.getElementById('ingameMenu').classList.remove('d-none');
        showIngameControls('show');
        restartIntervals();
    } else {
        document.getElementById('startScreen').classList.remove('d-none');
    }
}

/**
 * Shows the winning screen by hiding the canvas. Sets gameStarted to false and clears all intervals.
 *
 * @return {void} No return value
 */
function showWinningScreen() {
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('endScreenWin').classList.remove('d-none');
    document.getElementById('ingameMenu').classList.add('d-none');
    gameStarted = false;
    clearAllIntervals();
}

/**
 * Shows the lost screen by hiding the canvas. Setting gameStarted to false and clearing all intervals.
 *
 * @return {void} No return value
 */
function showLostScreen() {
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('endScreenLost').classList.remove('d-none');
    document.getElementById('ingameMenu').classList.add('d-none');
    gameStarted = false;
    clearAllIntervals();
}

/**
 * Restarts the game by hiding certain elements, setting game state to false, clearing intervals, and stopping sound.
 *
 * @return {void} No return value
 */
function restartGame() {
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('startScreen').classList.remove('d-none');
    document.getElementById('endScreenLost').classList.add('d-none');
    document.getElementById('endScreenWin').classList.add('d-none');
    document.getElementById('gameMenu').classList.add('d-none');
    document.getElementById('ingameMenu').classList.add('d-none');
    gameStarted = false;
    clearAllIntervals();
    stopSound();
}

/**
 * Clears all intervals.
 *
 * @return {void} No return value
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Stops all intervals for enemies and the main game loop.
 */
function stopIntervals() {
    world.level.enemies.forEach((enemy) => {
        clearInterval(enemy.intervalID);
    });
    clearInterval(world.mainLoop);
}

/**
 * Restarts intervals for enemies by animating each enemy and running the game.
 *
 */
function restartIntervals() {
    world.level.enemies.forEach((enemy) => {
        enemy.animate();
    });
    world.run();
}

/**
 * Toggles the mute button for game sound and toggles the muted state of game sounds.
 *
 */
function toggleGameSoundMute() {
    document.getElementById('muteBtnMenu').classList.toggle('d-none');
    document.getElementById('unmuteBtnMenu').classList.toggle('d-none');
    document.getElementById('muteBtn').classList.toggle('d-none');
    document.getElementById('unmuteBtn').classList.toggle('d-none');
    for (var i in gameSounds) {
        gameSounds[i].muted = !gameSounds[i].muted;
    }
}

/**
 * Stops all sounds in the gameSounds object by pausing each sound.
 *
 */
function stopSound() {
    for (var i in gameSounds) {
        gameSounds[i].pause();
    }
}

/**
 * Shows or hide in-game controls based on the order provided.
 *
 * @param {string} order - The order to show or hide the in-game controls.
 */
function showIngameControls(order) {
    if (isMobile) {
        if (order == 'show') {
            document.getElementById('ingameControls').classList.remove('d-none');
        } else {
            document.getElementById('ingameControls').classList.add('d-none');
        }
    } else {
        document.getElementById('ingameControls').classList.add('d-none');
    }
}

/**
 * Binds touchstart and touchend events to specific buttons to handle keyboard inputs.
 *
 * @return {void} No return value
 */
function bindBtsPresstevents() {
    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    document.getElementById('btnJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('btnJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
    document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });

}

/**
 * Handle keyboard inputs by keydown.
 *
 * @return {void} No return value
 */
window.addEventListener('keydown', (event) => {
    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (event.keyCode == 38) {
        keyboard.UP = true;
    }
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (event.keyCode == 68) {
        keyboard.D = true;
    }
});

/**
 * Handle keyboard inputs by keyup.
 *
 * @return {void} No return value
 */
window.addEventListener('keyup', (event) => {
    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (event.keyCode == 38) {
        keyboard.UP = false;
    }
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (event.keyCode == 68) {
        keyboard.D = false;
    }
});