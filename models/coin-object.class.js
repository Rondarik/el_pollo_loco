class CoinObject extends CollectibleObject {
x = 300;
y = 280;
width = 160;
height = 160;

IMAGE = ['img/8_coin/coin_1.png'];
sound = new Audio('audio/collect-coin.mp3');

offset = {
    left: 65,
    top: 65,
    right: 65,
    bottom: 65        
}

constructor(x,y){
    super().loadImage(this.IMAGE);
    this.x = x;
    this.y = y; 

}

}

