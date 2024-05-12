let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
}

function startGame(){
    if(screen.availHeight > screen.availWidth){
        alert("Please use Landscape!");
    }
    initlevel();
    world = new World(canvas, keyboard);
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('endScreenLost').classList.add('d-none');
    document.getElementById('endScreenWin').classList.add('d-none');
}

function showMenu(){
    document.getElementById('gameMenu').classList.remove('d-none');
    document.getElementById('startScreen').classList.add('d-none');
}

function leaveMenu(){
    document.getElementById('gameMenu').classList.add('d-none');
    document.getElementById('startScreen').classList.remove('d-none');
    document.getElementById('endScreenWin').classList.add('d-none');
}

function showWinningScreen() {
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('endScreenWin').classList.remove('d-none');
}

function showLostScreen() {
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('endScreenLost').classList.remove('d-none');
}

function restartGame(){
    location.reload();
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