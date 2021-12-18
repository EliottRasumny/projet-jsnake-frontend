import Phaser, {Geom} from 'phaser';
//import scenes & events
import eventsCenter from './EventCenter';
//import classes
import Snake from './Snake';
//import assets
import gridAsset from '../../assets/Grid32_1024x768.png'
import appleAsset from '../../assets/RedApple.png';
import magentaSnakeAsset from '../../assets/RedSnake32.png';
import { getSessionObject } from "../../utils/session";


//Constants for DRY principle
const GRID_KEY = 'grid', APPLE_KEY = 'apple', SNAKE_KEY = 'snake', SQUARE_SIZE = 32;


class SingleGame extends Phaser.Scene
{
  constructor()
  {
    super('game-scene');
    //Food
    this.apple = undefined;
    //Player
    this.snake = undefined;
    //directions
    this.direction = 'right';
    this.nextDirection = null;
    //Enable to render the snake properly
    this.keyFrameValue = 0;
    //Score of players
    this.score = 0;
    //Players controls
    this.controls = undefined;
    //Velocity of the snakes
    this.speed = 2;
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
    //Creating food
    this.apple = this.createFood();
    this.apple.setScale(0.99,0.99);
    //Creating the snakes
    this.snake = this.createSnake((6 * SQUARE_SIZE), (11 * SQUARE_SIZE), 'right', SNAKE_KEY);
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
    //Changing the speed depending on the score
    if (this.score > 15)
    {
      this.speed = Math.floor(this.score / 5);
    }
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
    if (this.keyFrameValue % Math.floor(SQUARE_SIZE / this.speed) === 0) {
      //Reset the keyFrameValue
      this.keyFrameValue = 0;
      if (this.nextDirection != null)
      {
        //Update the direction of the snake
        this.direction = this.nextDirection;
        this.nextDirection = null;
      }
      //Collision with an apple
      if (Geom.Intersects.RectangleToRectangle(this.snake.getBody().getAt(0).getBounds(), this.apple.getBounds()))
      {
        this.eatFood();
      }
      //Moving the snake
      else
      {
        this.snake.move(this.direction);
      }
    }
    //collision with a wall
    if(this.snake.getBody().getAt(0).x <= -32 || this.snake.getBody().getAt(0).x >= 1024 ||
      this.snake.getBody().getAt(0).y <= -32 || this.snake.getBody().getAt(0).y >= 768)
    {
      this.shutdown();
    }
    //collision with itself
    if(this.snake.eatItself()) this.shutdown();
  };


  /**
   * Shutting down the scene
   */
  shutdown()
  {
    let user = getSessionObject("user1");

    console.log(user);

    this.scene.start('GameOver');
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
    return new Snake(this, asset, SQUARE_SIZE, X, Y, direction);
  };


  //Creating food for snakes
  createFood()
  {
    //Random placement of the apple
    var randomX = Math.floor(Math.random() * 32) * SQUARE_SIZE;
    var randomY = Math.floor(Math.random() * 24) * SQUARE_SIZE;
    //Genereting apple
    var newApple = this.physics.add.image(randomX + (SQUARE_SIZE / 2), randomY + (SQUARE_SIZE / 2), APPLE_KEY);
    newApple.enableBody = true;
    return newApple;
  };


  eatFood()
  {
    //Updating score
    this.score++;
    //The snake grow up
    this.snake.growUp(this.direction);
    eventsCenter.emit('update-scoreSingle', this.score);
    do
    {
      var isOccupied = false;
      //Random placement of the apple
      var randomX = Math.floor(Math.random() * 32) * SQUARE_SIZE;
      var randomY = Math.floor(Math.random() * 24) * SQUARE_SIZE;
      //Check if the RANDOM coordinates are in the snake or not
      var checkSnake = this.snake.getBody();
      for(let i = 0; i < checkSnake.length; i++)
      {
        if(randomX === checkSnake.getAt(i).x && randomY === checkSnake.getAt(i).y)
        {
          isOccupied = true;
          break;
        }
      }
    } while (isOccupied)
    this.apple.setPosition(randomX + (SQUARE_SIZE / 2),randomY + (SQUARE_SIZE / 2));
  }
   
}
export default SingleGame;