import Phaser from 'phaser';
//import scenes & events
import eventsCenter from './EventCenter';
//import classes
import Snake from './Snake';
//import assets
import gridAsset from '../../assets/Grid32_1024x768.png'
import appleAsset from '../../assets/RedApple.png';
import magentaSnakeAsset from '../../assets/MagentaSnake32.png';

//Constants for DRY principle
const GRID_KEY = 'grid', APPLE_KEY = 'apple', SNAKE_KEY = 'snake', SQUARE_SIZE = 32;


class SingleGame extends Phaser.Scene
{
  constructor()
  {
    super('game-scene');
    //Players
    this.snake = undefined;
    //directions
    this.direction = 'right';
    this.nextDirection = null;
    //Food
    this.apple = undefined;
    //Enable to render the snake properly
    this.keyFrameValue = 0;
    //Score of players
    this.score = 0;
    //Players controls
    this.controls = undefined;
    //State of the game
    this.gameOver = false;
  };


  /**
   * Load assets for the scene
   */
  preload()
  {
    this.load.image(GRID_KEY, gridAsset);
    this.load.image(APPLE_KEY, appleAsset);
    this.load.spritesheet(SNAKE_KEY,
      magentaSnakeAsset,
      {frameWidth: SQUARE_SIZE, frameHeight: SQUARE_SIZE});
  };


  /**
   * Create the scene
   */
  create()
  {
    //Creating the grid
    this.add.image(SQUARE_SIZE * 16, SQUARE_SIZE * 12, GRID_KEY);
    //Creating the snakes
    this.snake = this.createSnake((6 * SQUARE_SIZE) , (11 * SQUARE_SIZE) , 'right', SNAKE_KEY);
    //Creating food
    this.apple = this.createFood();
    //Creating colliders
    //FIXME: see what to put in...
    //this.physics.add.overlap(this.snake1._group, this.apple, this.eatFood(this.snake1), null, this);
    //TODO: Eating food
    //....
    //FIXME:UIScene for scores
    this.scene.run('ui-score', 10, 10, 'Player');
    //Enabling keyboard inputs
    this.controls = this.input.keyboard.createCursorKeys();
  };


  /**
   * Update the scene every SQUARE_SIZE frames. Refresh rate = 60 FPS. Check for new direction or collision.
   */
  update()
  {
    //Update the key frame value
    this.keyFrameValue++;
    //Registering new movement
    if (this.direction != 'down' && this.controls.up.isDown)
    {
      this.nextDirection = 'up';
    }
    else if (this.direction != 'up' && this.controls.down.isDown)
    {
      this.nextDirection = 'down';
    }
    else if (this.direction != 'left' && this.controls.right.isDown)
    {
      this.nextDirection = 'right';
    }
    else if (this.direction != 'right' && this.controls.left.isDown)
    {
      this.nextDirection = 'left';
    }
    //Check if the snake reach a new square. If yes, allows it to change direction
    //If a new direction has been chosen from the keyboard, make it the direction of the snake now.
    if (this.keyFrameValue % (SQUARE_SIZE / 4) === 0) {
      //Reset the keyFrameValue
      this.keyFrameValue = 0;
      if (this.nextDirection != null)
      {
        //Update the direction of the snake
        this.direction = this.nextDirection;
        this.nextDirection = null;
      }
      //update the snake's body parts coordinates
      this.snake.updateCoordinates(this.direction);
      //Moving the snake
      this.snake.move(this.direction);
    }

    //Collision with itself -> end game
    //collision with a wall -> end game
    if (this.isGameOver) this.shutdown();
  };


  /**
   * Postrendering the scene
   */
  render()
  {
  };


  /**
   * Shutting down the scene
   */
  shutdown()
  {
    //TODO:
  };

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
    let newSnake = new Snake(this, asset, SQUARE_SIZE, X, Y, direction);
    return newSnake;
  };


  //Creating food for snakes
  createFood()
  {
    //Random placement of the apple
    var randomX = Math.floor(Math.random() * 32) * SQUARE_SIZE;
    var randomY = Math.floor(Math.random() * 24) * SQUARE_SIZE;
    //Genereting apple
    var newApple = this.physics.add.image(randomX + (SQUARE_SIZE / 2), randomY + (SQUARE_SIZE / 2), APPLE_KEY).setScale(0.5);
    newApple.enableBody = true;
    return newApple;
  };


  //TODO:eating food
  eatFood(player) {
     //Deleting old apple
     this.apple.disableBody(true, true);
     this.score++;
     eventsCenter.emit('update-score', this.score, 0);
     //Creating new apple
     this.apple = this.createFood();
   }
   
}
export default SingleGame;