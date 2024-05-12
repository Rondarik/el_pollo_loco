class Endboss extends MovableObject {
    y = 140;
    width = 260;
    height = 300;
    // IMAGES_WALKING = [
    //     'img/4_enemie_boss_chicken/1_walk/G1.png',
    //     'img/4_enemie_boss_chicken/1_walk/G2.png',
    //     'img/4_enemie_boss_chicken/1_walk/G3.png',
    //     'img/4_enemie_boss_chicken/1_walk/G4.png',
    // ];
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
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ]
    energy = 100;
    damage = 20;
    offset = {
        left: 0,
        top: 50,
        right: 0,
        bottom: 50
    }

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_DEAD);
        // this.speed = 0.15 + Math.random() * 0.25;
        this.x = 2000;
        this.animate();
    }

    animate() {
        // this.moveLeft();
        let i = 10;
        setInterval(() => {
            if (this.isDead()) {
                if (i < 10) {
                    this.playAnimation(this.IMAGES_DEAD);
                    i++;
                } else {
                    console.log(this.energy);
                    showWinningScreen();
                }
            } else {
                this.playAnimation(this.IMAGES_ALERT);
                i = 0
            }
        }, 200);
    }
}