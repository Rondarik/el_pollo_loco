class MovableObject extends DrawableObject {
    speed = 1;
    speedFactor = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    damage = 0;
    lastHit = 0;
    collitionDirection = false;

    /**
     * Applies gravity to the object by updating its vertical position based on speed and acceleration.
     *
     * @param None
     * @return None
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                if (this.y == 80 && this.speedY < 0) {
                    this.collitionDirection = true;
                } else if (!this.isAboveGround()) {
                    this.collitionDirection = false;
                }
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground based on its vertical position.
     *
     * @param None
     * @return {boolean} True if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return this.y <= 400;
        } else {
            return this.y < 190;
        }
    }

    /**
     * Moves the object to the right based on its speed.
     *
     * @param None
     * @return None
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by subtracting the speed from its horizontal position.
     *
     * @param None
     * @return None
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Checks if the object is colliding with another object based on their positions and dimensions.
     *
     * @param {Object} obj - The object to check collision with.
     * @return {boolean} True if the object is colliding with the provided object, false otherwise.
     */
    isColliding(obj) {
        return (this.x + this.width - this.offset.right) > (obj.x + obj.offset.left) &&
            (this.y + this.height) > (obj.y + obj.offset.top) &&
            (this.x + this.offset.left) < (obj.x + obj.width - obj.offset.right) &&
            (this.y + this.offset.top) < (obj.y + obj.height - obj.offset.bottom) &&
            !this.collitionDirection;
    }

    /**
     * Checks if this object can jump on another object based on collision conditions.
     *
     * @param {Object} obj - The object to jump on.
     * @return {boolean} True if this object can jump on the other object, false otherwise.
     */
    jumpOn(obj) {
        return (this.x + this.width - this.offset.right) > (obj.x + obj.offset.left) &&
            (this.y + this.height) > (obj.y + obj.offset.top) &&
            (this.x + this.offset.left) < (obj.x + obj.width - obj.offset.right) &&
            (this.y + this.offset.top) < (obj.y + obj.height - obj.offset.bottom) &&
            this.collitionDirection;
    }

    /**
     * Applies damage to the object if it's not currently hurt, updates energy, and records the time of the last hit.
     *
     * @param {number} damage - The amount of damage to apply to the object.
     * @return {void} No explicit return value.
     */
    hit(damage) {
        if (!this.isHurt()) {
            this.energy -= damage;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
        }
    }

    /**
     * Calculates the time passed since the last hit and returns whether it's less than 0.6 seconds.
     *
     * @param None
     * @return {boolean} True if the time passed is less than 0.6 seconds, false otherwise
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.6;
    }

    /**
     * Checks if the object is dead based on its energy level.
     *
     * @param None
     * @return {boolean} True if the object's energy is 0, false otherwise.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Sets the vertical speed to 20 for jumping.
     *
     * @param None
     * @return None
     */
    jump() {
        this.speedY = 20;
    }

}