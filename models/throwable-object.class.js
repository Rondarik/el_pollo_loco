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

    throw() {
        this.speedY = 10;
        setInterval(() => {
            this.x += 24;
            this.playAnimation(this.IMAGES_BOTTLE_ROTATE);
        }, 50);
    }

    isCollidingWithGround() {
        return this.y > 320;
    }

    smash() {
        return new SmashedBottle(this.x, this.y);
    }
}