import Phaser from 'phaser';
//import scenes & events
import eventsCenter from './EventCenter';
//import classes
import SnakeSpawner from './snakeSpawner';
//import assets
import groundAsset from '../../assets/sky.png';
import gridAsset from '../../assets/Grid32_1024x768.png'
import appleAsset from '../../assets/RedApple.png';
import greenSnakeAsset from '../../assets/GreenSnake32.png';

//Constants for DRY principle
const GROUND_KEY = 'ground', GRID_KEY = 'grid', APPLE_KEY = 'apple', SNAKE1_KEY = 'snake1', SQUARE_SIZE = 32;
//Global variables
let direction, nextDirection;

class CoopGame extends Phaser.Scene
{

  //Prepare necessary variables
  constructor() {
    super('game-scene');
    //Players
    this.snake1 = undefined;
    //directions
    this.direction = 'right';
    this.newDirection = null;
    //Food
    this.apple = undefined;
    //Enable to render the snake properly
    this.keyFrameValue = 0;
    //Score of players
    this.score1 = 0;
    this.score2 = 0;
    //Players controls
    this.controls1 = undefined;

    this.gameOver = false;
  };


  /**
   * Load assets for the scene
   */
  preload()
  {
    this.load.image(GROUND_KEY, groundAsset);
    this.load.image(GRID_KEY, gridAsset);
    this.load.image(APPLE_KEY, appleAsset);
    this.load.spritesheet(SNAKE1_KEY,
      greenSnakeAsset,
      {frameWidth: SQUARE_SIZE, frameHeight: SQUARE_SIZE});
  }


  /**
   * Create the scene
   */
  create()
  {

    //Creating the grid
    this.add.image(SQUARE_SIZE * 16, SQUARE_SIZE * 12, GRID_KEY);
    //Creating the snakes
    this.snake1 = this.createSnake((6 * SQUARE_SIZE) + (SQUARE_SIZE / 2), (11 * SQUARE_SIZE) + (SQUARE_SIZE / 2), 'right', SNAKE1_KEY);
    //Creating all collider
    this.physics.add.collider(this.snake1, this.apple);
    //Creating food
    this.apple = this.createFood();
    //TODO: Eating food

    //UIScene for scores
    this.scene.run('ui-score', 10, 10, 'Player1');
    
    //Enabling keyboard inputs
    this.controls1 = this.input.keyboard.createCursorKeys();
  }


  /**
   * Update the scene every SQUARE_SIZE frames. Refresh rate = 60 FPS. Check for new direction or collision.
   */
  update()
  {
    //Update the key frame value
    this.keyFrameValue++;
    //Registering new movement
    if (direction != 'down' && this.controls1.up.isDown)
    {
      nextDirection = 'up';
    }
    else if (direction != 'up' && this.controls1.down.isDown)
    {
      nextDirection = 'down';
    }
    else if (direction != 'left' && this.controls1.right.isDown)
    {
      nextDirection = 'right';
    }
    else if (direction != 'right' && this.controls1.left.isDown)
    {
      nextDirection = 'left';
    }

    //Check if the snake reach a new square. If yes, allows it to change direction
    // If a new direction has been chosen from the keyboard, make it the direction of the snake now.
    if (this.keyFrameValue % SQUARE_SIZE === 0 && nextDirection) {
      //Reset the keyFrameValue
      this.keyFrameValue = 0;
      //Update the direction of the snake
      direction = nextDirection;
      nextDirection = null;
      //update the snake's head direction
      this.snake1[0][1] = direction;
      //update snake's body parts
      this.updateSnakeBody(this.snake1);
    }    

    //Collision with itself -> end game
    //collision with a wall -> end game
    if (this.isGameOver) this.shutdown();
  }


  /**
   * Postrendering the scene
   */
  render()
  {
  }


  /**
   * Changing the state of the scene
   */
  shutdown()
  {
  }

  /**
   * Create and return a snake
   * @param {number} X coordinate of the position on the grid
   * @param {number} Y coordinate of the position on the grid
   * @param {string} direction it's orientation 
   * @param {sprite} asset sprite to use
   * @returns snake object
   */
  createSnake(X, Y, direction, asset)
  {
    //creating snake
    const snake = new SnakeSpawner(this, asset, 'right');
    //generating it's head
    snake.setHead(X, Y, direction);
    //generating it's body
    snake.addBodyPart(X - SQUARE_SIZE, Y, direction);   //TODO: -32 depends on the direction
    //generating it's tail                              //
    snake.setTail(X - (SQUARE_SIZE * 2), Y, direction); // idem

    //TODO: Implementing the movements
    /*
    this.anims.create(
      {
        key: 'upHead',
        frames: [ { key: asset, frame: 3 } ],
        frameRate: SQUARE_SIZE,
        repeat: -1
      }
    );
    this.anims.create(
      {
        key: 'downHead',
        frames: [ { key: asset, frame: 1 } ],
        frameRate: SQUARE_SIZE,
        repeat: -1
      }
    );
		this.anims.create(
      {
        key: 'rightHead',
        frames: [ { key: asset, frame: 0 } ],
        frameRate: SQUARE_SIZE,
        repeat: -1
		  }
    );
		this.anims.create(
      {
        key: 'leftHead',
        frames: [ { key: asset, frame: 2 } ],
        frameRate: SQUARE_SIZE,
        repeat: -1
		  }
    );
    this.anims.create(
      {
        key: 'horizontal',
        frames: this.anims.generateFrameNumbers(asset, 4),
        frameRate: SQUARE_SIZE,
        repeat: -1
		  }
    );
		this.anims.create(
      {
        key: 'vertical',
        frames: this.anims.generateFrameNumbers(asset, 5),
        frameRate: SQUARE_SIZE,
        repeat: -1
		  }
    );
    */
    return snake
  }


  //Creating food for snakes
  createFood()
  {
    //Random placement of the apple
    var randomX = Math.floor(Math.random() * 32) * SQUARE_SIZE;
    var randomY = Math.floor(Math.random() * 24) * SQUARE_SIZE;
    //Genereting apple
    const apple = this.physics.add.image(randomX + (SQUARE_SIZE / 2), randomY + (SQUARE_SIZE / 2), APPLE_KEY).setScale(0.5);
    apple.enableBody = true;
    return apple;
  }


  //eating food
  eatFood(player)
  {
    //Deleting old apple
    this.apple.disableBody(true, true);
    //Updating score
    if (player === 1)
    {
      score1++;
      eventsCenter.emit('update-score', score1, 1);
    }
    else
    {
      score2++;
      eventsCenter.emit('update-score', score2, 2);
    }
    //Creating new apple
    this.apple = this.createFood();
  }
}
export default CoopGame;