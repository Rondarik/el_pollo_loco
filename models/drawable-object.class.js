class DrawableObject {
    x = 120;
    y = 190;
    img;
    height = 240;
    width = 110;
    imageCache = [];
    currentImage = 0;
    offset = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    }

    /**
     * Loads an image by setting the source path.
     *
     * @param {string} path - The path to the image.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads images into the image cache based on the provided array of paths.
     *
     * @param {Array} arr - An array of paths to the images to be loaded.
     * @return {void} 
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws an image on the canvas context with error handling.
     *
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     * @return {void} 
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (error) {
            console.warn('error: ', error);
            console.log(this.img);
        }
    }

    /**
     * Plays animation based on the provided images array.
     *
     * @param {Array} images - An array of image paths for the animation.
     * @return {void} No return value.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Draws a frame around the object if it is an instance of Character, Chicken, CoinObject, or BottleObject.
     * Just for testing purposes.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     * @return {void} 
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof CoinObject || this instanceof ChickenSmall || this instanceof BottleObject) {
            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
     * Draws a hitbox around the object if it is an instance of Character, Chicken, Endboss, CoinObject, BottleObject, or ThrowableObject.
     * Just for testing purposes.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     * @return {void} 
     */
    drawHitbox(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall || this instanceof Endboss || this instanceof CoinObject || this instanceof BottleObject || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.strokeStyle = "red";
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - (this.offset.right + this.offset.left), this.height - (this.offset.bottom + this.offset.top));
            ctx.stroke();
        }
    }
}