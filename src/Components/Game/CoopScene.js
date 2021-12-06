import Phaser from "phaser";
const SNAKE_1_KEY = "snake1";
const SNAKE_2_KEY = "snake2";
//import groundAsset from ''; TODO

class CoopScene extends Phaser.Scene {

    //Prepare necessary variables
    constructor() {
        super(game-scene);
        this.snake1 = undefined;
        this.food1 = undefined;
        this.snake2 = undefined;
        this.food2 = undefined;
    };

    //Load required assets
    preload() {
        this.load.image("ground", groundAsset);
        this.load.spritesheet(SNAKE_1_KEY, '...');
        this.load.spritesheet(SNAKE_2_KEY,'...');
        //TODO
    }

    //Creating the game stage
    create() {
        this.snake1 = this.createSnakes();
        this.food1 = this.createFood();
        this.snake2 = this.createSnakes();
        this.food2 = this.createFood();
    }

    //Update the scene for each frame
    update() {
        //TODO
    }

    //Postrendering the scene
    render() {
        //TODO
    }

    //Changing the state of the scene
    shutdown() {
        //TODO
    }

    //Creating players snakes
    createSnakes() {
        //const snake;
        //TODO
        //return snake;
    }

    //Creating food for snakes
    createFood() {
        //const food;
        //TODO
        //return food;
    }
}
export default CoopScene;