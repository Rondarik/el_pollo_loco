let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;

function init() {
    canvas = document.getElementById('canvas');
}

function startGame() {
    if (screen.availHeight > screen.availWidth) {
        alert("Please use Landscape!");
    }
    initlevel();
    gameStarted = true;
    world = new World(canvas, keyboard);
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('endScreenLost').classList.add('d-none');
    document.getElementById('endScreenWin').classList.add('d-none');
    document.getElementById('ingameMenu').classList.remove('d-none');
}

function showMenu() {
    document.getElementById('endScreenLost').classList.add('d-none');
    document.getElementById('gameMenu').classList.remove('d-none');
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('endScreenWin').classList.add('d-none');
    if (gameStarted) {
        document.getElementById('leaveGameBtn').classList.remove('d-none');
        stopIntervals();
    }

}

function leaveMenu() {
    document.getElementById('gameMenu').classList.add('d-none');
    document.getElementById('endScreenWin').classList.add('d-none');
    if (gameStarted) {
        document.getElementById('canvas').classList.remove('d-none');
        restartInterval();
    } else {
        document.getElementById('startScreen').classList.remove('d-none');
    }
}

function showWinningScreen() {
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('endScreenWin').classList.remove('d-none');
    gameStarted = false;
    clearAllIntervals();
}

function showLostScreen() {
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('endScreenLost').classList.remove('d-none');
    gameStarted = false;
    clearAllIntervals();
}

function restartGame() {
    location.reload();
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function stopIntervals() {
    world.level.enemies.forEach((enemy) => {
        clearInterval(enemy.intervalID);
    });
}

function restartInterval() {
    world.level.enemies.forEach((enemy) => {
        enemy.animate();
    });
}


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

    // console.log(event);
});

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

    // console.log(event);
});