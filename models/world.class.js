class World {
    character = new Character();
    healthbar = new StatusBar();
    coinbar = new CoinBar(0);
    bottlebar = new BottleBar(3);
    endbossHealthbar = new EndbossHealthBar(100);
    showEndbossHealth = false;
    level = level1;
    canvas;
    ctx;
    keyboard;
    camara_x = 0;
    bottleCount = 3;
    coinCount = 0;
    throwables = [];
    smashedBottles = [];
    throw = true;
    enemySpawnRate = 0;
    CloudSpawnRate = 0;
    mainLoop;

    /**
     * Constructor for initializing the World object with canvas and keyboard.
     *
     * @param {CanvasRenderingContext2D} canvas - The canvas context for rendering.
     * @param {Keyboard} keyboard - The keyboard input for controls.
     * @return {void} Initializes the World with canvas, keyboard, and runs necessary functions.
     */
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

    /**
     * Sets up a main loop interval that continuously checks collisions, throws objects, starts end boss, 
     * moves chickens and clouds, and binds button press events.
     *
     * @return {void} No return value
     */
    run() {
        this.mainLoop = setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.startEndboss();
            this.endlessChicken();
            this.endlessClouds();
            bindBtsPresstevents();
        }, 100);
    }

    /**
     * Checks the character's position and starts the end boss if character's x position is greater than 1500.
     *
     * @return {void} No return value
     */
    startEndboss() {
        if (this.character.x > 1500) {
            this.showEndbossHealth = true;
            this.level.endboss[0.].startEndboss = true;
            gameSounds.game_theme.pause();
            gameSounds.bossfight_sound.play();
        }
    }

    /**
     * Checks conditions to see if a throwable object can be thrown.
     *
     * @param None
     * @return None
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.bottleCount > 0 && this.throw && !this.character.otherDirection) {
            this.throw = false;
            this.bottleCount -= 1;
            this.bottlebar.setPercentage(this.bottleCount);
            let bottle = new ThrowableObject(this.character.x + 90, this.character.y);
            this.throwables.push(bottle);
            gameSounds.throwBottle_sound.play();
        }
    }

    /**
     * Executes collision checks between the character and enemies, handling hits and health updates.
     *
     * @param None
     * @return {void} No return value
     */
    checkCollisions() {
        this.collectItems();
        this.checkCollisionsThrowable();
        this.checkCollisionWithEnemies();
        this.checkCollisionWithEndboss();
    }

    /**
     * Executes collision checks between the character and enemies, handling hits and health updates.
     *
     * @param None
     * @return {void} No return value
     */
    checkCollisionWithEnemies() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy) && (!this.level.enemies[index].isDead())) {
                this.character.hit(this.level.enemies[index].damage);
                this.healthbar.setPercentage(this.character.energy);
            } else if (this.character.jumpOn(enemy) && (!this.level.enemies[index].isDead())) {
                this.level.enemies[index].hit(20);
                gameSounds.jumpOnAnemy_sound.play();
            }
        });
    }

    /**
     * Executes collision checks with the end boss, handling character hits and health updates.
     *
     * @param None
     * @return {void} No return value
     */
    checkCollisionWithEndboss() {
        this.level.endboss.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit(this.level.endboss[index].damage);
                this.healthbar.setPercentage(this.character.energy);
            }
        });
    }

    /**
     * Checks collisions with throwable objects and handles the interactions with enemies and ground.
     *
     * @param None
     * @return None
     */
    checkCollisionsThrowable() {
        this.checkCollisionsThrowableWithEndboss();
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

    /**
     * Checks collisions with the end boss and handles the interactions by hitting the boss and updating the end boss health bar.
     *
     * @param None
     * @return None
     */
    checkCollisionsThrowableWithEndboss() {
        if (this.throwables.length > 0) {
            this.level.endboss.forEach((boss, index) => {
                if (this.throwables[this.throwables.length - 1].isColliding(boss)) {
                    this.level.endboss[index].hit(20);
                    this.endbossHealthbar.setPercentage(this.level.endboss[index].energy);
                    this.showSmashedBottleAnimation();
                }
            });
        }
    }

    /**
     * Spawns new chicken enemies based on the enemySpawnRate in the level.
     *
     * @param None
     * @return None
     */
    endlessChicken() {
        if (this.enemySpawnRate == 80) {
            this.level.enemies.push(new Chicken(1800));
            this.level.enemies.push(new ChickenSmall(2000));

            this.enemySpawnRate = 0;
        } else {
            this.enemySpawnRate++;
        }
    }

    /**
     * Spawns new cloud objects based on the CloudSpawnRate value.
     *
     * @param None
     * @return None
     */
    endlessClouds() {
        if (this.CloudSpawnRate == 250) {
            this.level.clouds.push(new Cloud(2300));
            this.CloudSpawnRate = 0;
        } else {
            this.CloudSpawnRate++;
        }
    }

    /**
     * Animates the smashed bottle by pushing it to the smashedBottles array, setting its world property, and then animating it.
     *
     * @param None
     * @return None
     */
    showSmashedBottleAnimation() {
        this.smashedBottles.push(this.throwables[this.throwables.length - 1].smash());
        this.smashedBottles[this.throwables.length - 1].world = this;
        this.throwables.splice(this.throwables.length - 1, 1);
        this.smashedBottles[this.smashedBottles.length - 1].animate()

    }

    /**
     * Deletes the last smashed bottle from the smashedBottles array and sets the 'throw' property to true.
     *
     * @param None
     * @return None
     */
    deleteSmachedBottle() {
        this.smashedBottles.splice(this.smashedBottles.length - 1, 1);
        this.throw = true;
    }

    /**
     * Executes the collection of items in the level including coins and bottles.
     *
     * @param None
     * @return None
     */
    collectItems() {
        this.collectCoin();
        this.collectBottle();
    }

    /**
     * Collects coins in the level if the character collides with them, updating the coin count and UI.
     *
     * @param None
     * @return None
     */
    collectCoin() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.coinCount++;
                this.coinbar.setPercentage(this.coinCount);
                this.level.coins.splice(this.level.coins.indexOf(coin), 1);
                coin.collect();
            }
        });
    }

    /**
     * Executes the collection of bottles in the level when the character collides with them.
     *
     * @param None
     * @return None
     */
    collectBottle() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.bottleCount++;
                this.bottlebar.setPercentage(this.bottleCount);
                this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
                bottle.collect();
            }
        });
    }

    /**
     * Draws the game elements on the canvas for each frame, including background objects, clouds, coins, bottles,
     * characters, enemies, end boss, throwables, and smashed bottles. Also handles the animation loop.
     *
     * @param None
     * @return None
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camara_x, 0);
        this.addObjectsToMap(this.level.backgoundObjects);
        this.addObjectsToMap(this.level.clouds);
        // ------- function for fixed objects --------
        this.drawFixedObjects();
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.throwables);
        this.addObjectsToMap(this.smashedBottles);
        this.ctx.translate(-this.camara_x, 0);
        this.drawLoop();
    }

    /**
     * Draws the fixed objects on the canvas by translating the context, adding healthbar, coinbar, bottlebar, and endbossHealthbar if showEndbossHealth is true, and then translating back.
     *
     * @param None
     * @return None
     */
    drawFixedObjects() {
        this.ctx.translate(-this.camara_x, 0);
        this.addToMap(this.healthbar);
        this.addToMap(this.coinbar);
        this.addToMap(this.bottlebar);
        if (this.showEndbossHealth) {
            this.addToMap(this.endbossHealthbar);
        }
        this.ctx.translate(this.camara_x, 0);
    }

    /**
     * Draws the canvas elements continuously using requestAnimationFrame.
     *
     * @param None
     * @return None
     */
    drawLoop() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Adds objects to the map by iterating through the objects array and calling addToMap for each object.
     *
     * @param {Array} objects - The array of objects to add to the map.
     * @return {void} No return value
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    /**
     * Adds the object to the map and handles flipping the image if needed.
     *
     * @param {object} mo - The object to be added to the map.
     * @return {void} No return value.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
        this.drawTestFrames(mo);
    }

    /**
     * Saves the canvas context, translates it by the width of the object, scales it to flip the image horizontally
     * and updates the x-coordinate of the object accordingly.
     *
     * @param {object} mo - The object to flip the image for.
     * @return {void} No return value.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Flips the image back horizontally and restores the canvas context.
     *
     * @param {object} mo - The object to flip back.
     * @return {void} No return value.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Draws test frames for the given object.
     *
     * @param {object} mo - The object to draw test frames for.
     * @return {void} No return value.
     */
    drawTestFrames(mo) {
        // mo.drawFrame(this.ctx);
        // mo.drawHitbox(this.ctx);
    }
}