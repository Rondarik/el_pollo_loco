class BottleObject extends CollectibleObject {
    x = 300;
    y = 330;
    width = 100;
    height = 80;

    IMAGE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]

    // sound = new Audio('audio/collect-bottle.mp3');
    sound = gameSounds.collect_bottle;

    offset = {
        left: 40,
        top: 10,
        right: 20,
        bottom: 10        
    }

    constructor(x,y,imgNumber){
        super().loadImage(this.IMAGE[imgNumber]);
        this.x = x;
        this.y = y; 
    }
}