class Level {
    enemies;
    endboss
    clouds;
    backgoundObjects;
    coins;
    bottles;
    level_end_x = 2250;

    /**
     * Constructor for creating a new Level object.
     *
     */
    constructor(enemies, endboss, clouds, backgoundObjects, coins, bottles) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgoundObjects = backgoundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}