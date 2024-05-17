let level1;

/**
 * Initializes the level by creating instances of various game objects like chickens, endboss, clouds, background objects, coins, and bottles.
 */
function initlevel() {
    level1 = new Level(
        [
            new Chicken(100),
            new Chicken(100),
            new Chicken(150),
            new Chicken(500),
            new Chicken(800),
            new Chicken(1200),
            new Chicken(1200), 
            new ChickenSmall(120),
            new ChickenSmall(200),
            new ChickenSmall(600),
            new ChickenSmall(1000)
        ],
        [
            new Endboss()
        ],
        [
            new Cloud(0),
            new Cloud(800),
            new Cloud(1600),
            new Cloud(2300)
        ],
        [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3)
        ],
        [
            new CoinObject(-470, 300),
            new CoinObject(-470, 200),
            new CoinObject(-470, 100),
            new CoinObject(-170, 300),
            new CoinObject(-170, 200),
            new CoinObject(-170, 100),
            new CoinObject(200, 300),
            new CoinObject(250, 200),
            new CoinObject(350, 100),
            new CoinObject(450, 100),
            new CoinObject(550, 200),
            new CoinObject(600, 300),
            new CoinObject(800, 200),
            new CoinObject(800, 130),
            new CoinObject(900, 200),
            new CoinObject(900, 130),
            new CoinObject(1200, 100),
            new CoinObject(1200, 200),
            new CoinObject(1200, 300),
            new CoinObject(1550, 300)
        ],
        [
            new BottleObject(-380, 350, 0),
            new BottleObject(-350, 350, 1),
            new BottleObject(410, 350, 0),
            new BottleObject(440, 350, 1),
            new BottleObject(750, 350, 0),
            new BottleObject(1000, 350, 1),
            new BottleObject(1400, 350, 1)
        ]
    );
}
