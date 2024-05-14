class World {
    character = new Character();
    healthbar = new StatusBar();
    coinbar = new CoinBar(0);
    bottlebar = new BottleBar(30);
    endbossHealthbar = new EndbossHealthBar(100);
    showEndbossHealth = false;
    endbossStarted = false;
    level = level1;
    canvas;
    ctx;
    keyboard;
    camara_x = 0;
    bottleCount = 30;
    coinCount = 0;
    throwables = [];
    smashedBottles = [];
    throw = true;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.startEndboss();
        }, 100);
    }

    startEndboss(){
        if (this.character.x > 1500) {
            this.showEndbossHealth = true;
            this.endbossStarted = true;
        }
       
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.bottleCount > 0 && this.throw) {
            this.throw = false;
            this.bottleCount -= 1;
            let bottle = new ThrowableObject(this.character.x + 90, this.character.y);
            this.throwables.push(bottle);
        }
    }

    checkCollisions() {
        this.collectItems();
        this.checkCollisionsThrowable();
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy) && (!this.level.enemies[index].isDead())) {
                this.character.hit(this.level.enemies[index].damage);
                this.healthbar.setPercentage(this.character.energy);
            } else if (this.character.jumpOn(enemy)) {
                this.level.enemies[index].hit(20);
            }
        });
        this.level.endboss.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit(this.level.endboss[index].damage);
                this.healthbar.setPercentage(this.character.energy);
            }
        });
    }

    checkCollisionsThrowable() {
        if (this.throwables.length > 0) {
            this.level.endboss.forEach((boss, index) => {
                if (this.throwables[this.throwables.length - 1].isColliding(boss)) {
                    this.level.endboss[index].hit(20);
                    this.endbossHealthbar.setPercentage(this.level.endboss[index].energy);
                    this.showSmashedBottleAnimation();
                    console.log(this.level.endboss[0].energy);
                }
            });
        }
        if (this.throwables.length > 0) {
            this.level.enemies.forEach((chicken, index) => {
                if (this.throwables[this.throwables.length - 1].isColliding(chicken)) {
                    this.level.enemies[index].hit(20);
                }
            });
            if (this.throwables[this.throwables.length - 1].isCollidingWithGround()) {
                this.showSmashedBottleAnimation();
            }
        }
    }

    showSmashedBottleAnimation() {
        this.smashedBottles.push(this.throwables[this.throwables.length - 1].smash());
        this.smashedBottles[this.throwables.length - 1].world = this;
        this.throwables.splice(this.throwables.length - 1, 1);
        this.smashedBottles[this.smashedBottles.length - 1].animate()

    }

    deleteSmachedBottle() {
        this.smashedBottles.splice(this.smashedBottles.length - 1, 1);
        this.throw = true;
    }

    collectItems() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.coinCount++;
                this.coinbar.setPercentage(this.coinCount);
                this.level.coins.splice(this.level.coins.indexOf(coin), 1);
                coin.collect();
            }
        });
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.bottleCount++;
                this.bottlebar.setPercentage(this.bottleCount);
                this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
                bottle.collect();
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camara_x, 0);
        this.addObjectsToMap(this.level.backgoundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camara_x, 0);
        // ------- space for fixed objects --------
        this.addToMap(this.healthbar);
        this.addToMap(this.coinbar);
        this.addToMap(this.bottlebar);
        if (this.showEndbossHealth) {
            this.addToMap(this.endbossHealthbar);
        }
        this.ctx.translate(this.camara_x, 0);

        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.throwables);
        this.addObjectsToMap(this.smashedBottles);

        this.ctx.translate(-this.camara_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);
        mo.drawHitbox(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}

