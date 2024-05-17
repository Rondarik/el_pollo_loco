class BottleBar extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ]
    percentage = 100;

    /**
     * Constructor for initializing the BottleBar object with the given percentage.
     *
     * @param {number} percentage - The percentage value for the BottleBar.
     */
    constructor(percentage) {
        super();
        this.percentage = percentage;
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.setPercentage(percentage);
    }

    /**
     * Sets the percentage value and updates the image cache for the status bar.
     *
     * @param {number} percentage - The new percentage value.
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
        if (this.percentage >= 10) {
            return 5;
        } else if (this.percentage > 8) {
            return 4;
        } else if (this.percentage > 6) {
            return 3;
        } else if (this.percentage > 4) {
            return 2;
        } else if (this.percentage >= 1) {
            return 1;
        } else {
            return 0;
        }
    }
}