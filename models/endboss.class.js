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
    offset = {
        left: 0,
        top: 50,
        right: 0,
        bottom: 50
    }
    startEndboss = false;

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

    animate() {
        this.moveLeft();
        let i = 0;
        let j = 0;
        setInterval(() => {
            if (this.isDead()) {
                if (i < 10) {
                    this.playAnimation(this.IMAGES_DEAD);
                    i++;
                } else {
                    gameSounds.bossfight_sound.pause();
                    gameSounds.victory_sound.play();
                   
                    showWinningScreen();
                }
            } else if (this.startEndboss) {
                if (j < 10) {
                    this.playAnimation(this.IMAGES_ATTACK);
                    j++;
                } else if (this.isHurt()){
                    this.playAnimation(this.IMAGES_HURT);
                }   else {
                    this.playAnimation(this.IMAGES_WALKING);
                    this.speed = 50;
                    this.moveLeft();
                }
            } else {
                this.playAnimation(this.IMAGES_ALERT);
            }
        }, 200);
    }
}