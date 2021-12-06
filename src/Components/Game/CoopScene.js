import Phaser from "phaser";
import skyAsset from "../../assets/sky.png";
import snake1Asset from "../../assets/snakeGreen.png";
const SNAKE_1_KEY = "snake1";
//import groundAsset from ''; TODO

class CoopScene extends Phaser.Scene {

    //Prepare necessary variables
    constructor() {
        super("game-scene");
        this.snake1 = undefined;
        this.cursors = undefined;
        this.isGameOver = false;
    };

    //Load required assets
    preload() {
        this.load.image("ground", skyAsset);

        this.load.spritesheet(SNAKE_1_KEY, snake1Asset , {
            frameWidth: 64,
            frameHeight: 64,
        });
        //TODO
    }

    //Creating the game stage
    create() {
        this.add.image(400, 300, "ground");
        this.snake1 = this.createSnake(snake1Asset);

        this.physics.add.collider(
            this.snake1,
            null,
            this
        );
        this.physics.add.overlap(
            this.snake1,
            null,
            this
          );

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    //Update the scene for each frame
    update() {
        if (this.isGameOver) return;

        //left
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play("left", true);
        //right
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play("right", true);
        //down
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(-160);
            this.player.anims.play("down", true);
        //up
        } else if (this.cursors.up.isDown) {
            this.player.setVelocityY(160);
            this.player.anims.play("up");
        } else {
            this.player.setVelocityX(160);
            this.player.anims.play("right", true);
        }
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
    createSnake(spritesheet) {
        const snake = this.physics.add.sprite(100, 450, spritesheet);
        player.setCollideWorldBounds(true);
        
        this.anims.create({
            key: "left",
            frames: [{ key: SNAKE_1_KEY, frame: 8 }],
            frameRate: 10,
            repeat: -1,
          });
      
          this.anims.create({
            key: "up",
            frames: [{ key: SNAKE_1_KEY, frame: 4 }],
            frameRate: 20,
            repeat: -1,
          });

          this.anims.create({
            key: "down",
            frames: [{ key: SNAKE_1_KEY, frame: 4 }],
            frameRate: 20,
            repeat: -1,
          });
      
          this.anims.create({
            key: "right",
            frames: [{ key: SNAKE_1_KEY, frame: [0][4] }],
            frameRate: 10,
            repeat: -1,
          });
          return snake
    }

    //Creating food for snakes
    createFood() {
        //const food;
        //TODO
        //return food;
    }
}
export default CoopScene;