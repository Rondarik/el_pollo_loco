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



    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (error) {
            console.warn('error: ', error);
            console.log(this.img);
        }
     
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof CoinObject || this instanceof BottleObject) {
            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
    drawHitbox(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof CoinObject || this instanceof BottleObject || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.strokeStyle = "red";
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - (this.offset.right + this.offset.left), this.height - (this.offset.bottom + this.offset.top));
            ctx.stroke();
        }
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

}