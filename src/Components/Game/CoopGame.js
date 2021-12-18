import Phaser, {Geom} from 'phaser';
//import scenes & events
import eventsCenter from './EventCenter';
//import classes
import Snake from './Snake';
//import assets
import gridAsset from '../../assets/img/Grid32_1024x768.png'
import appleAssetR from '../../assets/img/RedApple.png';
import appleAssetB from '../../assets/img/BlueApple.png';
import magentaSnakeAsset from '../../assets/img/MagentaSnake32.png';
import orangeSnakeAsset from '../../assets/img/OrangeSnake32.png'

//Constants for DRY principle
const GRID_KEY = 'grid', APPLE1_KEY = 'apple1', APPLE2_KEY = 'apple2', SNAKE1_KEY = 'snake1', SNAKE2_KEY = 'snake2', SQUARE_SIZE = 32;

class CoopGame extends Phaser.Scene
{
  constructor()
  {
    super('game-scene');
    this.snake1 = undefined;
    this.snake2 = undefined;
    this.direction1 = null;
    this.direction2 = null;
    this.nextDirection1 = null;
    this.nextDirection2 = null;
    this.apple1 = undefined;
    this.apple2 = undefined;
    this.keyFrameValue = null;
    this.score = null;
    this.controls1 = undefined;
    this.controls2 = undefined;
    this.speed = null;
  };


  /**
   * Load assets for the scene
   */
  preload()
  {
    this.load.image(GRID_KEY, gridAsset);
    this.load.image(APPLE1_KEY, appleAssetB);
    this.load.image(APPLE2_KEY, appleAssetR);
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
    //Enable to render the snake properly
    this.keyFrameValue = 0;
    //directions
    this.direction1 = 'right';
    this.direction2 = 'left';
    this.nextDirection1 = null;
    this.nextDirection2 = null;
    //Score of players
    this.score = 0;
    //Velocity of the snakes
    this.speed = 3;
    //Creating the grid
    this.add.image(SQUARE_SIZE * 16, SQUARE_SIZE * 12, GRID_KEY);
    //Creating food
    this.apple1 = this.createFood(APPLE1_KEY);
    this.apple1.setScale(0.99,0.99);
    this.apple2 = this.createFood(APPLE2_KEY);
    this.apple2.setScale(0.99,0.99);
    //Creating the snakes
    this.snake1 = this.createSnake((5 * SQUARE_SIZE), (8 * SQUARE_SIZE), 'right', SNAKE1_KEY);
    this.snake2 = this.createSnake((17 * SQUARE_SIZE), (8 * SQUARE_SIZE), 'left', SNAKE2_KEY);
    //Enabling keyboard inputs
    this.controls1 = this.input.keyboard.createCursorKeys();
    this.controls2 = this.input.keyboard.addKeys("q,z,s,d");
    //UIScene for scores
    this.scene.run('ui-score', 10, 10, 'Player1');
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
    //Registering new movement : Snake1
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
    //Registering new movement : Snake2
    if (this.direction2 != 'down' && this.controls2.z.isDown)
    {
      this.nextDirection2 = 'up';
    }
    else if (this.direction2 != 'up' && this.controls2.s.isDown)
    {
      this.nextDirection2 = 'down';
    }
    else if (this.direction2 != 'left' && this.controls2.d.isDown)
    {
      this.nextDirection2 = 'right';
    }
    else if (this.direction2 != 'right' && this.controls2.q.isDown)
    {
      this.nextDirection2 = 'left';
    }
    //Check if the snake reach a new square. If yes, allows it to change direction
    //If a new direction has been chosen from the keyboard, make it the direction of the snake now.
    if (this.keyFrameValue % (SQUARE_SIZE / this.speed) === 0) {
      //Reset the keyFrameValue
      this.keyFrameValue = 0;
      if (this.nextDirection1 != null)
      {
        //Update the direction of the snake : Snake1
        this.direction1 = this.nextDirection1;
        this.nextDirection1 = null;
      }
      if (this.nextDirection2 != null)
      {
        //Update the direction of the snake : Snake2
        this.direction2 = this.nextDirection2;
        this.nextDirection2 = null;
      }
      //Collision with an apple : Snake1
      if (Geom.Intersects.RectangleToRectangle(this.snake1.getBody().getAt(0).getBounds(), this.apple1.getBounds()))
      {
        this.eatFood(this.snake1);
      }
      else //Moving the snake
      {
        this.snake1.move(this.direction1);
      }
      //Collision with an apple : Snake2
      if (Geom.Intersects.RectangleToRectangle(this.snake2.getBody().getAt(0).getBounds(), this.apple2.getBounds()))
      {
        this.eatFood(this.snake2);
      }
      else //Moving the snake
      {
        this.snake2.move(this.direction2);
      }

    }
    //Collision with a wall : Snake1
    if (this.isGameOver) this.shutdown();
    if(this.snake1.getBody().getAt(0).x <= -32 || this.snake1.getBody().getAt(0).x >= 736 ||
      this.snake1.getBody().getAt(0).y <= -32 || this.snake1.getBody().getAt(0).y >= 544)
    {
      this.shutdown();
    }
    //Collision with a wall : Snake2
    if(this.snake2.getBody().getAt(0).x <= -32 || this.snake2.getBody().getAt(0).x >= 736 ||
      this.snake2.getBody().getAt(0).y <= -32 || this.snake2.getBody().getAt(0).y >= 544)
    {
      this.shutdown();
    }
    //Collision with themselfs
    if(this.snake1.eatItself() || this.snake2.eatItself()) this.shutdown();
    //Collision with each other
    if(this.eatOtherSnake(this.snake1,this.snake2) || this.eatOtherSnake(this.snake2,this.snake1)) this.shutdown();
    
  };


  /**
   * Shutting down the scene
   */
  shutdown()
  {
    this.scene.stop('ui-score')
    this.scene.start('game-over');
  };


  /**
   * Create and return a snake
   * @param {number} X coordinate of the position on the grid
   * @param {number} Y coordinate of the position on the grid
   * @param {string} direction it's orientation 
   * @param {sprite} asset sprite to use
   * @returns Snake object
   */
  createSnake(X, Y, direction, asset)
  {
    return new Snake(this, asset, SQUARE_SIZE, X, Y, direction);
  };


  /**
   * Create an apple in random given coordinates
   * @returns A new apple
   */
  createFood(apple_key)
  {
    //Random placement of the apple
    var randomX = Math.floor(Math.random() * 23) * SQUARE_SIZE;
    var randomY = Math.floor(Math.random() * 17) * SQUARE_SIZE;
    //Genereting apple
    var newApple = this.physics.add.image(randomX + (SQUARE_SIZE / 2), randomY + (SQUARE_SIZE / 2), apple_key);
    newApple.enableBody = true;
    return newApple;
  };


  /**
   * Update score of the snake which has eaten the apple and replacing this last one.
   * Grew the body of the eating' snake up.
   * @param {Snake} player : the snake eating the apple
   */
  eatFood(player)
  {
    //Updating score
    if (player == this.snake1)
    {
      this.score++;
      //The snake grow up
      player.growUp(this.direction1);
    }
    else
    {
      this.score++;
      //The snake grow up
      player.growUp(this.direction2);
    }
    eventsCenter.emit('update-scoreSingle', this.score);
    do
    {
      var isOccupied = false;
      //Random placement of the apple
      var randomX = Math.floor(Math.random() * 23) * SQUARE_SIZE;
      var randomY = Math.floor(Math.random() * 17) * SQUARE_SIZE;
      //Check if the RANDOM coordinates are in the snake or not
      var checkSnake = this.snake1.getBody();
      for(let i = 0; i < checkSnake.length; i++)
      {
        if(randomX === checkSnake.getAt(i).x && randomY === checkSnake.getAt(i).y)
        {
          isOccupied = true;
          break;
        }
      }
      if (!isOccupied)
      {
        checkSnake = this.snake2.getBody();
        for(let i = 0; i < checkSnake.length; i++)
        {
          if(randomX === checkSnake.getAt(i).x && randomY === checkSnake.getAt(i).y)
          {
            isOccupied = true;
            break;
          }
        }
      }
    } while (isOccupied)
    if(player == this.snake1)
      this.apple1.setPosition(randomX + (SQUARE_SIZE / 2),randomY + (SQUARE_SIZE / 2));
    else
      this.apple2.setPosition(randomX + (SQUARE_SIZE / 2),randomY + (SQUARE_SIZE / 2));
  }


  /**
   * Check if the moving snake collide with the body of the other snake
   * @param {Snake} snakeHead : head of the moving' snake
   * @param {Snake} snake : body of the other snake
   * @returns true if collision, false otherwise
   */
  eatOtherSnake(snakeHead, snake)
  {
    let headX = snakeHead.getBody().getAt(0).x;
    let headY = snakeHead.getBody().getAt(0).y;
    for(let i = 0; i < snake.body.length; i++)
    {
      if(headX == snake.getBody().getAt(i).x && headY == snake.getBody().getAt(i).y) return true;
    }
    return false;
  }
}
export default CoopGame;