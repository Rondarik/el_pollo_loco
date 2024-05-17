class BottleObject extends CollectibleObject {
    x = 300;
    y = 330;
    width = 100;
    height = 80;
    IMAGE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]
    sound = gameSounds.collect_bottle;
    offset = {
        left: 40,
        top: 10,
        right: 20,
        bottom: 10
    }

    /**
     * Constructor for initializing the BottleObject with x, y, and imgNumber.
     *
     * @param {number} x - The x-coordinate for the object.
     * @param {number} y - The y-coordinate for the object.
     * @param {number} imgNumber - The index of the image in the IMAGE array.
     */
    constructor(x, y, imgNumber) {
        super().loadImage(this.IMAGE[imgNumber]);
        this.x = x;
        this.y = y;
    }
}