class ChickenSmall extends MovableObject {
    y = 375;
    height = 50;
    width = 40;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]
    speedFactor = 0.5;
    damage = 5;
    energy = 1;
    intervalID;

    /**
     * Constructor function for initializing the ChickenSmall object with the given offset.
     *
     * @param {number} offset - The offset value for positioning the ChickenSmall object.
     * @return {void} Initializes the ChickenSmall object with images, speed, position, and animation.
     */
    constructor(offset) {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = this.speedFactor + Math.random() * 0.25;
        this.x = 300 + offset + Math.random() * 500;
        this.animate();
    }

    /**
     * Executes animations for the chicken object based on its state.
     *
     * @return {void} No return value.
     */
    animate() {
        this.intervalID = setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }
}