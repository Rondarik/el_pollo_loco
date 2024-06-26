class Character extends MovableObject {
    y = 80;
    height = 240;
    speed = 10;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ]
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ]
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ]
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ]
    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ]
    world;
    walking_sound = gameSounds.character_walk;
    longIdleTimer = 0;
    deadAnimationCounter = 0;
    offset = {
        left: 10,
        top: 100,
        right: 30,
        bottom: 0
    }

    /**
     * Constructor function for initializing the character.
     *
     * @return {void} Initializes the character with various images and animations.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();
    }

    /**
     * Animate the character by moving and handling interactions.
     *
     * @return {void} No return value.
     */
    animate() {
        this.moveAnimations();
        this.interactionAnimations();
    }

    /**
     * Performs animations for character movements, including walking, jumping, and idle states.
     *
     * @return {void} No return value.
     */
    moveAnimations() {
        setInterval(() => {
            this.moveRightAnimation();
            this.moveLeftAnimation();
            this.jumpAnimation();
            this.world.camara_x = -this.x + 100;
        }, 1000 / 60);
    }

    /**
     * Animates the character movement to the right based on keyboard input and position.
     *
     * @param None
     * @return None
     */
    moveRightAnimation() {
        this.walking_sound.pause();
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            this.walking_sound.play();
            this.longIdleTimer = 0;
        }
    }

    /**
     * Moves the character to the left if the left arrow key is pressed and the character's position is greater than -400.
     *
     * @param None
     * @return None
     */
    moveLeftAnimation() {
        if (this.world.keyboard.LEFT && this.x > -400) {
            this.moveLeft();
            this.otherDirection = true;
            this.walking_sound.play();
            this.longIdleTimer = 0;
        }
    }

    /**
     * Executes the jump animation if the space key is pressed and the character is not above the ground; otherwise, increments the long idle timer.
     *
     * @param None
     * @return None
     */
    jumpAnimation() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.longIdleTimer = 0;
        } else {
            this.longIdleTimer++;
        }
    }

    /**
     * Executes various animations based on character state.
     *
     * @return {void} No return value.
     */
    interactionAnimations() {
        this.deadAnimationCounter = 0;
        setInterval(() => {
            if (this.isDead()) {
                this.deadAnimation();
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                gameSounds.characterGetHurt.play();
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            } else if (this.longIdleTimer > 700) {
                this.playAnimation(this.IMAGES_LONG_IDLE);
            } else {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 100);
    }

    /**
     * Executes the dead animation based on the deadAnimationCounter value.
     *
     * @return {void} No return value.
     */
    deadAnimation() {
        if ( this.deadAnimationCounter  < 14) {
            this.playAnimation(this.IMAGES_DEAD);
            this.deadAnimationCounter++;
        } else {
            this.gameEnd();
        }
    }

    /**
     * Stops boss fight sound, game theme sound, plays game lost sound, and shows the lost screen.
     *
     * @return {void} No return value
     */
    gameEnd() {
        gameSounds.bossfight_sound.pause();
        gameSounds.game_theme.pause();
        gameSounds.gameLost_sound.play();
        showLostScreen();
    }
}

