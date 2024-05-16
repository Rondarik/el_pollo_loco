let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let isMobile = false;

window.matchMedia("(orientation: portrait)").addEventListener("change", e => {
    const portrait = e.matches;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        if (portrait) {
            landscapeMassage();
        } else {
            document.getElementById('landscapeMassage').classList.add('d-none');
            restartGame();
            clearAllIntervals();
        }
        isMobile = true;
    } else {
        isMobile = false;
    }
});

function init() {
    canvas = document.getElementById('canvas');
}


function landscapeMassage() {
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('endScreenLost').classList.add('d-none');
    document.getElementById('endScreenWin').classList.add('d-none');
    document.getElementById('ingameMenu').classList.add('d-none');
    document.getElementById('landscapeMassage').classList.remove('d-none');
}


function startGame() {
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

function showWinningScreen() {
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('endScreenWin').classList.remove('d-none');
    document.getElementById('ingameMenu').classList.add('d-none');
    gameStarted = false;
    clearAllIntervals();
}

function showLostScreen() {
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('endScreenLost').classList.remove('d-none');
    document.getElementById('ingameMenu').classList.add('d-none');
    gameStarted = false;
    clearAllIntervals();
}

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

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function stopIntervals() {
    world.level.enemies.forEach((enemy) => {
        clearInterval(enemy.intervalID);
    });
}

function restartIntervals() {
    world.level.enemies.forEach((enemy) => {
        enemy.animate();
    });
}

function toggleGameSoundMute() {
    document.getElementById('muteBtnMenu').classList.toggle('d-none');
    document.getElementById('unmuteBtnMenu').classList.toggle('d-none');
    document.getElementById('muteBtn').classList.toggle('d-none');
    document.getElementById('unmuteBtn').classList.toggle('d-none');
    for (var i in gameSounds) {
        gameSounds[i].muted = !gameSounds[i].muted;
    }
}

function stopSound() {
    for (var i in gameSounds) {
        gameSounds[i].pause();
    }
}

function showIngameControls(order){
    if (isMobile) {
        if (order == 'show') {
            document.getElementById('ingameControls').classList.remove('d-none');
            console.log('show');
        } else {
            document.getElementById('ingameControls').classList.add('d-none');
            console.log('hide');
        }
    } else {
        document.getElementById('ingameControls').classList.add('d-none');
        console.log('hide immer');
    }
}

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