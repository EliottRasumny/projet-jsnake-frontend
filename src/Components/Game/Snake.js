import Phaser, { GameObjects } from 'phaser';
//import scenes & events
import eventsCenter from './EventCenter';

export default class Snake
{
  /**
   * Create a snake
   * @param {Phaser.Scene} scene 
   * @param {Phaser.asset} asset 
   * @param {number} squareSize 
   * @param {number} X 
   * @param {number} Y 
   * @param {string} direction 
   */
	constructor(scene, asset, squareSize, X, Y, direction)
	{
		this.scene = scene;
    this.asset = asset;
    this.SQUARE_SIZE = squareSize;
    //Save coordinates of the snake body like [[head][body part]...[body part][tail]]
    this.coordinates = [];
    //Create container and sprites of the snake
    this.snake = new GameObjects.Container(this.scene, this.SQUARE_SIZE / 2, this.SQUARE_SIZE / 2);
    //ajoute a la DisplayList de la scene
    this.snake.addToDisplayList();
    this.create(X, Y, direction);
	}

  getSnake()
  {
    return this.snake;
  }


  /**
   * Create coordinates and sprites of the snake
   * @param {number} X 
   * @param {number} Y 
   * @param {number} direction 
   */
  create(X, Y, direction)
  {
    //Defining the starting orientation
    let orientation;
    if (direction === 'right')
    {
      orientation = -this.SQUARE_SIZE;
    } else {
      orientation = this.SQUARE_SIZE;
    }
    //Create head
    this.coordinates.push([X, Y]);
    this.snake.add(new GameObjects.Sprite(this.scene, X, Y, this.asset).setName('head'));
    //Create body
    this.coordinates.push([X + orientation, Y]);
    this.snake.add(new GameObjects.Sprite(this.scene, X + orientation, Y, this.asset, 4).setName('body'));
    //Create tail
    this.coordinates.push([X + (orientation * 2), Y]);
    this.snake.add(new GameObjects.Sprite(this.scene, X + (orientation * 2), Y, this.asset).setName('tail'));

    //Set the correct Frame
    if (direction === 'right')
    {
      this.snake.getAt(2).setFrame(10);
    } else {
      this.snake.getAt(0).setFrame(2);
      this.snake.getAt(2).setFrame(11);
    }
  }


  move(direction)
  {
    this.moveHead(direction);
    this.changeBody();
    this.changeTail();
  }
  moveHead(direction)
  {
    this.snake.moveTo(this.snake.getAt(this.snake.length - 1), 0);
    let newhead = this.snake.getAt(0);
    let oldHead = this.snake.getAt(1);
    switch(direction)
    {
      case 'down':
        newhead.x = oldHead.x;
        newhead.y = oldHead.y + this.SQUARE_SIZE;
        newhead.setFrame(1);
        break;
      case 'up':
        newhead.x = oldHead.x;
        newhead.y = oldHead.y - this.SQUARE_SIZE;
        newhead.setFrame(3);
        break;
      case 'left':
        newhead.x = oldHead.x - this.SQUARE_SIZE;
        newhead.y = oldHead.y;
        newhead.setFrame(2);
        break;
      case 'right':
        newhead.x = oldHead.x + this.SQUARE_SIZE;
        newhead.y = oldHead.y;
        newhead.setFrame(0);
        break;
    }
  }
  changeBody()
  {
    for (let i = 1; i < this.snake.length - 1; i++)
    {
      let previous = this.snake.getAt(i - 1);
      let body = this.snake.getAt(i);
      let next = this.snake.getAt(i + 1);
      //Defining direction
      if (next.y === previous.y)      //horizontal
      {
        body.setFrame(4);
      }
      else if (next.x === previous.x) //vertical
      {
        body.setFrame(5);
      }
      else// angle
      {
        if (body.y > previous.y)      //going up
        {
          if (body.x > next.x)        //...from right
          {
            body.setFrame(7);
          }
          else                        //...from left
          {
            body.setFrame(9);
          }
        }
        else if (body.y < previous.y) //going down
        {
          if (body.x > next.x)        //...from right
          {
            body.setFrame(6);
          }
          else                        //...from left
          {
            body.setFrame(8);
          }
        }
        else if (body.x < previous.x) //going right
        {
          if (body.y > next.y)        //...from up
          {
            body.setFrame(7);
          }
          else                        //...from down
          {
            body.setFrame(6);
          }
        }
        else                          //going left
        {
          if (body.y > next.y)        //...from up
          {
            body.setFrame(8);
          }
          else                        //...from down
          {
            body.setFrame(9);
          }
        }
      }
    }
  }
  changeTail()
  {
    let previous = this.snake.getAt(this.snake.length - 2);
    let body = this.snake.getAt(this.snake.length - 1);
    //Horizontal
    if (body.y === previous.y)
    {
      //Going right
      if (body.x < previous.x)
      {
        body.setFrame(10);
      }
      //Going left
      else
      {
        body.setFrame(11);
      }
    }
    //Vertical
    else
    {
      //Going up
      if (body.y > previous.y)
      {
        body.setFrame(12);
      }
      //Going down
      else
      {
        body.setFrame(13);
      }
    }
  }

  eatItself()
  {
     // TODO: launch event
  }
}