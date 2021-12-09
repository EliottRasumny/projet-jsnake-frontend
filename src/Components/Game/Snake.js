import Phaser from 'phaser';
//import scenes & events
import eventsCenter from './EventCenter';

export default class Snake
{
	/**
	 * @param {Phaser.Scene} scene: where it needs to be displayed
	 * @param {Phaser.asset} asset: it's sprites
   */
	constructor(scene, asset, squareSize)
	{
		this.scene = scene;
    this.asset = asset;
    this.SQUARE_SIZE = squareSize;
    //Save coordinates of the snake body like [[head][body part]...[body part][tail]]
    this.size = null;
    this.coordinates = [];
    //Contains all the sprites of the snake
    this.snake = [];
    //Create collider between head and body parts
    this._group = this.scene.physics.add.group();
    this._group.addMultiple(this.snake);
	}

	get group()
	{
		return this._group;
	}


  createSnake(X, Y, direction)
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
    this.coordinates[0] = [X, Y];
    this.snake[0] = this.scene.physics.add.sprite(this.coordinates[0][0], this.coordinates[0][1], this.asset);
    //Create body
    this.coordinates[1] = [X + orientation, Y];
    this.snake[1] = this.scene.physics.add.sprite(this.coordinates[1][0], this.coordinates[1][1], this.asset).setFrame(4);
    //Create tail
    this.coordinates[2] = [X + (orientation * 2), Y];
    this.snake[2] = this.scene.physics.add.sprite(this.coordinates[2][0], this.coordinates[2][1], this.asset);
    //Set the correct Frame
    if (direction === 'right')
    {
      this.snake[2].setFrame(10);
    } else {
      this.snake[0].setFrame(2);
      this.snake[2].setFrame(11);
    }
    this.size = 3;
  }


  /**
   * Update the coordinates of each snake's body part
   * @param {string} direction: of the head
   */
  updateCoordinates(direction)
  {
    //Verify with the world border
    if (this.coordinates[0][0] >= 1024 - (this.SQUARE_SIZE/2) || this.coordinates[0][1] >= 1024 - (this.SQUARE_SIZE/2) ||
      this.coordinates[0][0] <= 0 + (this.SQUARE_SIZE/2) || this.coordinates[0][1] <= 0 + (this.SQUARE_SIZE/2)) return;
    //Put the old tail as the new head
    //The old head becomes the first body part
    //The last body part becomes the new tail
    this.coordinates.unshift(this.coordinates.pop());
    switch(direction)
    {
      case 'down':
        this.coordinates[0] = [this.coordinates[1][0], this.coordinates[1][1] + this.SQUARE_SIZE];
        break;
      case 'up':
        this.coordinates[0] = [this.coordinates[1][0], this.coordinates[1][1] - this.SQUARE_SIZE];
        break;
      case 'left':
        this.coordinates[0] = [this.coordinates[1][0] - this.SQUARE_SIZE, this.coordinates[1][1]];
        break;
      case 'right':
        this.coordinates[0] = [this.coordinates[1][0] + this.SQUARE_SIZE, this.coordinates[1][1]];
        break;
    }
  }

  move(direction)
  {
    this.moveHead(direction);
    this.moveBody();
    this.moveTail();
  }
  moveHead(direction)
  {
    this.snake[0].setPosition(this.coordinates[0][0], this.coordinates[0][1]);
    switch(direction)
    {
      case 'right':
        this.snake[0].setFrame(0);
        break;
      case 'down':
        this.snake[0].setFrame(1);
        break;
      case 'left':
        this.snake[0].setFrame(2);
        break;
      case 'up':
        this.snake[0].setFrame(3);
        break;
    }
  }
  moveBody()
  {
    for (let i = 1; i < this.size - 1; i++)
    {
      //Set position
      this.snake[i].setPosition(this.coordinates[i][0], this.coordinates[i][1]);
      //Defining direction
      if (this.coordinates[i][1] === this.coordinates[i - 1][1])
      {
        //If horizontal
        if (this.coordinates[i][1] === this.coordinates[i + 1][1])
        {
          this.snake[i].setFrame(4);
        }
        //Comming from left
        else if (this.coordinates[i][0] < this.coordinates[i - 1][0])
        {
          //And below
          if (this.coordinates[i][1] < this.coordinates[i + 1][1])
          {
            this.snake[i].setFrame(8);
          }
          //And above
          else
          {
            this.snake[i].setFrame(9);
          }
        }
        //Comming from right
        else
        {
          //And below
          if (this.coordinates[i][1] < this.coordinates[i + 1][1])
          {
            this.snake[i].setFrame(6);
          }
          //And above
          else
          {
            this.snake[i].setFrame(7);
          }
        }
      }
      else
      {
        //If vertical
        if (this.coordinates[i][0] === this.coordinates[i + 1][0])
        {
          this.snake[i].setFrame(5);
        }
        //Comming from below
        else if (this.coordinates[i][1] > this.coordinates[i - 1][1])
        {
          //And right
          if (this.coordinates[i][0] > this.coordinates[i + 1][0])
          {
            this.snake[i].setFrame(7);
          }
          //And above
          else
          {
            this.snake[i].setFrame(9);
          }
        }
        //Comming from above
        else
        {
          //And right
          if (this.coordinates[i][0] > this.coordinates[i + 1][0])
          {
            this.snake[i].setFrame(6);
          }
          //And left
          else
          {
            this.snake[i].setFrame(8);
          }
        }
      }
    }
  }
  moveTail()
  {
    this.snake[this.size - 1].setPosition(this.coordinates[this.size - 1][0], this.coordinates[this.size - 1][1]);
    //Horizontal
    if (this.coordinates[this.size - 1][1] === this.coordinates[this.size - 2][1])
    {
      //Going right
      if (this.coordinates[this.size - 1][0] < this.coordinates[this.size - 2][0])
      {
        this.snake[this.size - 1].setFrame(10);
      }
      //Going left
      else
      {
        this.snake[this.size - 1].setFrame(11);
      }
    }
    //Vertical
    else
    {
      //Going up
      if (this.coordinates[this.size - 1][1] > this.coordinates[this.size - 2][1])
      {
        this.snake[this.size - 1].setFrame(12);
      }
      //Going down
      else
      {
        this.snake[this.size - 1].setFrame(13);
      }
    }
  }

  eatItself()
  {
     // TODO: launch event
  }
}