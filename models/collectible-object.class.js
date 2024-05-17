class CollectibleObject extends DrawableObject {
    sound;

    constructor(x, y) {
        super();
    }

    /**
     * Executes the collection action by playing the sound associated with the collectible object.
     *
     * @return {void} No return value
     */
    collect() {
        this.sound.play();
    };
}