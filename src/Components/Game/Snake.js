import Phaser, { GameObjects, Geom } from 'phaser';
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
    this.body = new GameObjects.Container(this.scene, this.SQUARE_SIZE / 2, this.SQUARE_SIZE / 2);
    //ajoute a la DisplayList de la scene
    this.body.addToDisplayList();
    this.create(X, Y, direction);
	}

  getBody()
  {
    return this.body;
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
    this.body.add(new GameObjects.Sprite(this.scene, X, Y, this.asset));
    //Create body
    this.coordinates.push([X + orientation, Y]);
    this.body.add(new GameObjects.Sprite(this.scene, X + orientation, Y, this.asset, 4));
    //Create tail
    this.coordinates.push([X + (orientation * 2), Y]);
    this.body.add(new GameObjects.Sprite(this.scene, X + (orientation * 2), Y, this.asset));

    //Set the correct Frame
    if (direction === 'right')
    {
      this.body.getAt(2).setFrame(10);
    } else {
      this.body.getAt(0).setFrame(2);
      this.body.getAt(2).setFrame(11);
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
    this.body.moveTo(this.body.getAt(this.body.length - 1), 0);
    let newhead = this.body.getAt(0);
    let oldHead = this.body.getAt(1);
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
    for (let i = 1; i < this.body.length - 1; i++)
    {
      let onwardBodyPart = this.body.getAt(i - 1);
      let bodyPart = this.body.getAt(i);
      let backwardBodyPart = this.body.getAt(i + 1);
      //================================================== IN LINE
      if (backwardBodyPart.y === onwardBodyPart.y)         //horizontal
      {
        bodyPart.setFrame(4);
      }
      else if (backwardBodyPart.x === onwardBodyPart.x)    //vertical
      {
        bodyPart.setFrame(5);
      }
      else//============================================== ANGLE
      {
        if (bodyPart.y > onwardBodyPart.y)//============== going up
        {
          if (bodyPart.x > backwardBodyPart.x)             //...from right
          {
            bodyPart.setFrame(7);
          }
          else                                             //...from left
          {
            bodyPart.setFrame(9);
          }
        }
        else if (bodyPart.y < onwardBodyPart.y)//========= going down
        {
          if (bodyPart.x > backwardBodyPart.x)             //...from right
          {
            bodyPart.setFrame(6);
          }
          else                                             //...from left
          {
            bodyPart.setFrame(8);
          }
        }
        else if (bodyPart.x < onwardBodyPart.x)//========= going right
        {
          if (bodyPart.y > backwardBodyPart.y)             //...from up
          {
            bodyPart.setFrame(9);
          }
          else                                             //...from down
          {
            bodyPart.setFrame(8);
          }
        }
        else//============================================ going left
        {
          if (bodyPart.y > backwardBodyPart.y)             //...from up
          {
            bodyPart.setFrame(7);
          }
          else                                             //...from down
          {
            bodyPart.setFrame(6);
          }
        }
      }
    }
  }
  changeTail()
  {
    let lastBodyPart = this.body.getAt(this.body.length - 2);
    let tail = this.body.getAt(this.body.length - 1);
    //Horizontal
    if (tail.y === lastBodyPart.y)
    {
      //Going right
      if (tail.x < lastBodyPart.x)
      {
        tail.setFrame(10);
      }
      //Going left
      else
      {
        tail.setFrame(11);
      }
    }
    //Vertical
    else
    {
      //Going up
      if (tail.y > lastBodyPart.y)
      {
        tail.setFrame(12);
      }
      //Going down
      else
      {
        tail.setFrame(13);
      }
    }
  }

  eatItself()
  {
     // TODO: launch event
  }

  growUp()
  {
    let previousTail = this.body.getAt(this.body.length);
    this.body.add(new GameObjects.Sprite(this.scene, previousTail.x, previousTail.y, this.asset));
  }
}