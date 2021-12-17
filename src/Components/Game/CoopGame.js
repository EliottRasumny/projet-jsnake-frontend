import Phaser, {Geom} from 'phaser';
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
    this.direction2 = 'left';
    this.nextDirection1 = null;
    this.nextDirection2 = null;
    //TODO: direction2 & newDirection2
    //Food
    this.apple = undefined;
    //Enable to render the snake properly
    this.keyFrameValue = 0;
    //Score of players
    this.score = 0;
    //Players controls
    this.controls1 = undefined;
    this.controls2 = undefined;
    //TODO: controls2
    //Velocity of the snakes
    this.speed = 4;
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
    //Creating food
    this.apple = this.createFood();
    this.apple.setScale(0.99,0.99);
    //Creating the snakes
    this.snake1 = this.createSnake((6 * SQUARE_SIZE), (11 * SQUARE_SIZE), 'right', SNAKE1_KEY);
    this.snake2 = this.createSnake((25 * SQUARE_SIZE), (11 * SQUARE_SIZE), 'left', SNAKE2_KEY);
    //UIScene for scores
    this.scene.run('ui-score', 10, 10, 'Player1');
    //Enabling keyboard inputs
    this.controls1 = this.input.keyboard.createCursorKeys();
    this.controls2 = this.input.keyboard.addKeys("q,z,s,d");
    console.log(this.controls1);
    console.log(this.controls2);
  };


  /**
   * Update the scene every SQUARE_SIZE frames. Refresh rate = 60 FPS. Check for new direction or collision.
   */
  update()
  {
    //Update the key frame value
    this.keyFrameValue++;
    //Changing the speed depending on the score
    if (this.score > 20)
    {
      this.speed = Math.floor(this.score / 10);
    }
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
        //Update the direction of the snake
        this.direction1 = this.nextDirection1;
        this.nextDirection1 = null;
      }
      if (this.nextDirection2 != null)
      {
        //Update the direction of the snake
        this.direction2 = this.nextDirection2;
        this.nextDirection2 = null;
      }
      //Collision with an apple
      if (Geom.Intersects.RectangleToRectangle(this.snake1.getBody().getAt(0).getBounds(), this.apple.getBounds()))
      {
        this.eatFood(this.snake1);
      }
      //Moving the snake
      else
      {
        this.snake1.move(this.direction1);
      }

      if (Geom.Intersects.RectangleToRectangle(this.snake2.getBody().getAt(0).getBounds(), this.apple.getBounds()))
      {
        this.eatFood(this.snake2);
      }
      else
      {
        this.snake2.move(this.direction2);
      }

    }
    //Collision with an apple

    //collision with a wall -> end game
    if (this.isGameOver) this.shutdown();
    if(this.snake1.getBody().getAt(0).x <= -32 || this.snake1.getBody().getAt(0).x >= 1024 || this.snake1.getBody().getAt(0).y <= -32 || this.snake1.getBody().getAt(0).y >= 768)
      this.shutdown();
      if(this.snake2.getBody().getAt(0).x <= -32 || this.snake2.getBody().getAt(0).x >= 1024 || this.snake2.getBody().getAt(0).y <= -32 || this.snake2.getBody().getAt(0).y >= 768)
      this.shutdown();
    //collision with itself ->
    if(this.snake1.eatItself() || this.snake2.eatItself())
        this.shutdown();
    if(this.eatOtherSnake(this.snake1,this.snake2) || this.eatOtherSnake(this.snake2,this.snake1))
        this.shutdown();
    
  };

  eatOtherSnake(snakeHead, snake){
    let headX = snakeHead.getBody().getAt(0).x;
    let headY = snakeHead.getBody().getAt(0).y;

    for(let i = 0; i < snake.body.length; i++){
      if(headX == snake.getBody().getAt(i).x && headY == snake.getBody().getAt(i).y)
        return true;
    }
    return false;
  };


  /**
   * Shutting down the scene
   */
  shutdown()
  {
    this.scene.start('GameOver');
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
    eventsCenter.emit('update-score', this.score);
    //Random placement of the apple
    var randomX = Math.floor(Math.random() * 32) * SQUARE_SIZE;
    var randomY = Math.floor(Math.random() * 24) * SQUARE_SIZE;
    this.apple.setPosition(randomX + (SQUARE_SIZE / 2),randomY + (SQUARE_SIZE / 2));
   }
   
}
export default CoopGame;