class Cloud extends MovableObject{
    y = 50;
    width = 500;
    height = 250;

    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 300;

        this.animate();
       
      
    }
    animate(){
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

 
}