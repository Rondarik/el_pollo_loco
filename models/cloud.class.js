class Cloud extends MovableObject {
    y = 50;
    width = 500;
    height = 250;

    /**
     * Constructor function for initializing the Cloud object with the given offset.
     *
     * @param {number} offset - The offset value for positioning the cloud.
     * @return {void} Initializes the Cloud object with image loading, x-position calculation, and animation.
     */
    constructor(offset) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = offset + Math.random() * 300;
        this.animate();
    }

    /**
     * Executes the animation by moving the object left at a certain interval.
     *
     * @return {void} No return value.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 20);
    }
}