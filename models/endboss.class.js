class Endboss extends MovableObject {
    y = 140;
    width = 260;
    height = 300;
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ]
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ]
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ]
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ]
    energy = 100;
    damage = 50;
    startEndboss = false;
    deadAnimationCounter = 0;
    bossAnimationCounter = 0;
    offset = {
        left: 0,
        top: 50,
        right: 0,
        bottom: 50
    }

    /**
     * Constructor function for initializing the Endboss object with default values.
     *
     * @return {void} Initializes the Endboss with images, speed, position, and animation.
     */
    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.speed = 0;
        this.x = 2000;
        this.animate();
    }

    /**
     * Executes animations based on certain conditions.
     *
     * @return {void} Executes animations at intervals based on conditions.
     */
    animate() {
        this.moveLeft();
        this.deadAnimationCounter = 0;
        this.bossAnimationCounter = 0;
        setInterval(() => {
            if (this.isDead()) {
                this.deadAnimation();
            } else if (this.startEndboss) {
                this.bossAnimation();
            } else {
                this.playAnimation(this.IMAGES_ALERT);
            }
        }, 200);
    }

    /**
     * Executes the dead animation based on the deadAnimationCounter value.
     *
     * @return {void} No return value.
     */
    deadAnimation() {
        if (this.deadAnimationCounter < 10) {
            this.playAnimation(this.IMAGES_DEAD);
            this.deadAnimationCounter++;
        } else {
            this.gameEnd();
        }
    }

    /**
     * Handles the boss animation based on animation counters and boss status.
     *
     * @return {void} No return value.
     */
    bossAnimation() {
        if (this.bossAnimationCounter < 10) {
            this.playAnimation(this.IMAGES_ATTACK);
            this.bossAnimationCounter++;
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.moveLeft();
        } else {
            this.bossWalks();
        }
    }

    /**
     * Stops boss fight sound, plays victory sound, and shows the winning screen.
     *
     * @return {void} No return value
     */
    gameEnd() {
        gameSounds.bossfight_sound.pause();
        gameSounds.victory_sound.play();
        showWinningScreen();
    }

    /**
     * Moves the boss character by playing the walking animation, setting the speed, and moving left.
     *
     * @return {void} Does not return anything.
     */
    bossWalks() {
        this.playAnimation(this.IMAGES_WALKING);
        this.speed = 50;
        this.moveLeft();
    }
}