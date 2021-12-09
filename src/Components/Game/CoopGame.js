import Phaser from 'phaser';
//import scenes & events
import eventsCenter from './EventCenter';
//import classes
import Snake from './Snake';
//import assets
import gridAsset from '../../assets/Grid32_1024x768.png'
import appleAsset from '../../assets/RedApple.png';
import magentaSnakeAsset from '../../assets/MagentaSnake32.png';
import orangeSnakeAsset from '../../assets/OrangeSnake32.png'

//Constants for DRY principle
const GRID_KEY = 'grid', APPLE_KEY = 'apple', SNAKE1_KEY = 'snake1', SNAKE2_KEY = 'snake2', SQUARE_SIZE = 32;

class CoopGame extends Phaser.Scene
{
  constructor()
  {
    super('game-scene');
    //Players
    this.snake1 = undefined;
    this.snake2 = undefined;
    //directions
    this.direction1 = 'right';
    this.nextDirection1 = null;
    //TODO: direction2 & newDirection2
    //Food
    this.apple = undefined;
    //Enable to render the snake properly
    this.keyFrameValue = 0;
    //Score of players
    this.score1 = 0;
    this.score2 = 0;
    //Players controls
    this.controls1 = undefined;
    //TODO: controls2
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
    this.load.spritesheet(SNAKE1_KEY,
      magentaSnakeAsset,
      {frameWidth: SQUARE_SIZE, frameHeight: SQUARE_SIZE});
    this.load.spritesheet(SNAKE2_KEY,
      orangeSnakeAsset,
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
    this.snake1 = this.createSnake((6 * SQUARE_SIZE) + (SQUARE_SIZE / 2), (11 * SQUARE_SIZE) + (SQUARE_SIZE / 2), 'right', SNAKE1_KEY);
    this.snake2 = this.createSnake((25 * SQUARE_SIZE) + (SQUARE_SIZE / 2), (11 * SQUARE_SIZE) + (SQUARE_SIZE / 2), 'left', SNAKE2_KEY);
    //Creating colliders
    //FIXME: see what to put in...
    this.physics.add.collider(this.snake1._group, this.apple);
    this.physics.add.overlap(this.snake1._group, this.apple, this.eatFood, true, true);
    this.physics.add.collider(this.snake2, this.apple);
    this.physics.add.collider(this.snake1, this.snake2);
    //Creating food
    this.apple = this.createFood();
    //TODO: Eating food
    //....
    //FIXME:UIScene for scores
    this.scene.run('ui-score', 10, 10, 'Player1');
    //Enabling keyboard inputs
    this.controls1 = this.input.keyboard.createCursorKeys();
  };


  /**
   * Update the scene every SQUARE_SIZE frames. Refresh rate = 60 FPS. Check for new direction or collision.
   */
  update()
  {
    //Update the key frame value
    this.keyFrameValue++;
    //Registering new movement
    if (this.direction1 != 'down' && this.controls1.up.isDown)
    {
      this.nextDirection1 = 'up';
    }
    else if (this.direction1 != 'up' && this.controls1.down.isDown)
    {
      this.nextDirection1 = 'down';
    }
    else if (this.direction1 != 'left' && this.controls1.right.isDown)
    {
      this.nextDirection1 = 'right';
    }
    else if (this.direction1 != 'right' && this.controls1.left.isDown)
    {
      this.nextDirection1 = 'left';
    }
    //Check if the snake reach a new square. If yes, allows it to change direction
    //If a new direction has been chosen from the keyboard, make it the direction of the snake now.
    if (this.keyFrameValue % SQUARE_SIZE === 0) {
      //Reset the keyFrameValue
      this.keyFrameValue = 0;
      if (this.nextDirection1 != null)
      {
        //Update the direction of the snake
        this.direction1 = this.nextDirection1;
        this.nextDirection1 = null;
      }
      //update the snake's body parts coordinates
      this.snake1.updateCoordinates(this.direction1);
      //Moving the snake
      this.snake1.move(this.direction1);
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
    let newSnake = new Snake(this, asset, SQUARE_SIZE);
    newSnake.createSnake(X, Y, direction);
    return newSnake;
  };


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
  };


  //TODO:eating food
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
  };
}
export default CoopGame;