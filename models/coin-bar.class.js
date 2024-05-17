class CoinBar extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ]
    percentage = 100;

    /**
     * Constructor for initializing the CoinBar object with the given percentage.
     *
     * @param {number} percentage - The percentage value for the CoinBar.
     * @return {void} Initializes the CoinBar object with percentage, images loading, position, and size.
     */
    constructor(percentage) {
        super();
        this.percentage = percentage;
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setPercentage(percentage);
    }

    /**
     * Sets the percentage value and updates the image cache for the status bar.
     *
     * @param {number} percentage - The new percentage value.
     * @return {void} 
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImagesIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the index of the image based on the percentage value.
     *
     * @return {number} The index of the image.
     */
    resolveImagesIndex() {
        if (this.percentage >= 20) {
            return 5;
        } else if (this.percentage > 15) {
            return 4;
        } else if (this.percentage > 10) {
            return 3;
        } else if (this.percentage > 5) {
            return 2;
        } else if (this.percentage >= 1) {
            return 1;
        } else {
            return 0;
        }
    }
}