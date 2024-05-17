class EndbossHealthBar extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
    ]
    percentage = 100;

    /**
     * Constructor for initializing the EndbossHealthBar object with the given percentage.
     *
     * @param {number} percentage - The percentage value for the EndbossHealthBar.
     * @return {void}
     */
    constructor(percentage) {
        super();
        this.percentage = percentage;
        this.loadImages(this.IMAGES);
        this.x = 350;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(percentage);
    }

    /**
     * Sets the percentage value and updates the image cache for the status bar.
     *
     * @param {number} percentage - The new percentage value
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImagesIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * A function that determines the index of the image based on the percentage value.
     *
     * @return {number} The index of the image.
     */
    resolveImagesIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}