class SmashedBottle extends DrawableObject {
    width = 100;
    height = 100;
    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
        ''
    ]
    
    /**
     * Constructor for initializing the SmashedBottle with x and y coordinates.
     *
     * @param {number} x - The x-coordinate for the object.
     * @param {number} y - The y-coordinate for the object.
     * @return {void} Initializes the SmashedBottle object with image loading and coordinates.
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png')
        this.x = x;
        this.y = y;
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    }
    world;

    /**
     * Animates the smashed bottle by playing a sequence of splash images and sound effects.
     *
     */
    animate() {
        let i = 0;
        const animationInterval = setInterval(() => {
            if (i < 6) {
                this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
                gameSounds.bollte_smash.play();
                i++;
            } else {
                this.world.deleteSmachedBottle();
                clearInterval(animationInterval);
            }
        }, 60);
    }
}