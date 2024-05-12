class CollectibleObject extends DrawableObject {
    sound;

    constructor(x,y){
        super();
      
    }

    collect(){
       this.sound.play();
        
    };


}