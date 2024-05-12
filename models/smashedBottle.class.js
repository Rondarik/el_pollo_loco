class SmashedBottle extends DrawableObject {




    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
        ''
    ]

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png')
        this.x = x;
        this.y = y;
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        // this.animate();
    }
    // i = 0;
    world;

    animate() {

        let i = 0;
        const animationInterval = setInterval(() => {
            if (i < 6) {
                this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
                i++;
            } else {
                this.world.deleteSmachedBottle();
                clearInterval(animationInterval);
            }
        }, 60);
    }
}