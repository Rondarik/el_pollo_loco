class CoinObject extends CollectibleObject {
    x = 300;
    y = 280;
    width = 160;
    height = 160;
    IMAGE = ['img/8_coin/coin_1.png'];
    sound = gameSounds.collect_coin;
    offset = {
        left: 65,
        top: 65,
        right: 65,
        bottom: 65
    }

    /**
     * Constructor for initializing the CoinObject with x and y coordinates.
     *
     * @param {number} x - The x-coordinate for the object.
     * @param {number} y - The y-coordinate for the object.
     */
    constructor(x, y) {
        super().loadImage(this.IMAGE);
        this.x = x;
        this.y = y;
    }
}

