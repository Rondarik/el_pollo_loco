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

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return this.y <= 400;        
        } else {
            return this.y < 190;
        }
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    isColliding(obj) {
        return (this.x + this.width - this.offset.right) > (obj.x + obj.offset.left) &&
            (this.y + this.height) > (obj.y + obj.offset.top) &&
            (this.x + this.offset.left) < (obj.x + obj.width - obj.offset.right) &&
            (this.y + this.offset.top) < (obj.y + obj.height - obj.offset.bottom) &&
            !this.collitionDirection;
    }

    jumpOn(obj){
        return (this.x + this.width - this.offset.right) > (obj.x + obj.offset.left) &&
        (this.y + this.height) > (obj.y + obj.offset.top) &&
        (this.x + this.offset.left) < (obj.x + obj.width - obj.offset.right) &&
        (this.y + this.offset.top) < (obj.y + obj.height - obj.offset.bottom) &&
        this.collitionDirection;
    }

    hit(damage) {
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }

    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.8;
    }

    isDead() {
        return this.energy == 0;
    }

    jump() {
        this.speedY = 20;
    }

}