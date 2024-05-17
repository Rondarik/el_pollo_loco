class ThrowableObject extends MovableObject {
    speedX = 20;
    speedY = 30;
    lastThrow = 0;
    y = 0;
    IMAGES_BOTTLE_ROTATE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]

    /**
     * Constructor for initializing the ThrowableObject with x and y coordinates.
     *
     * @param {number} x - The x-coordinate for the object.
     * @param {number} y - The y-coordinate for the object.
     * @return {void} Initializes the ThrowableObject with image loading and coordinates.
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.height = 90;
        this.width = 70;
        this.loadImages(this.IMAGES_BOTTLE_ROTATE);
        this.applyGravity();
        this.throw();
    }

    /**
     * Updates the speed and position of the object during a throw animation.
     *
     * @param None
     * @return None
     */
    throw() {
        this.speedY = 10;
        setInterval(() => {
            this.x += 24;
            this.playAnimation(this.IMAGES_BOTTLE_ROTATE);
        }, 50);
    }

    /**
     * Checks if the object is colliding with the ground based on its vertical position.
     *
     * @param None
     * @return {boolean} True if the object is colliding with the ground, false otherwise.
     */
    isCollidingWithGround() {
        return this.y > 320;
    }

    /**
     * Creates a new SmashedBottle object at the current position.
     *
     * @return {SmashedBottle} The newly created SmashedBottle object.
     */
    smash() {
        return new SmashedBottle(this.x, this.y);
    }
}