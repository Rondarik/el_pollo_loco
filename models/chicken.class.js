class Chicken extends MovableObject {
    y = 360;
    height = 70;
    width = 60;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]
    speedFactor = 0.15;
    damage = 10;
    energy = 1;
    intervalID;

    /**
     * Constructor function for initializing the Chicken object with the given offset.
     *
     * @param {number} offset - The offset value for positioning the chicken.
     * @return {void} Initializes the Chicken object with images, speed, position, and animation.
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