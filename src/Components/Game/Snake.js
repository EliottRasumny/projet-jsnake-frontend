import Phaser from 'phaser';
//import classes
import BodyPart from './BodyParts';
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
    this.bodyCoordinates = [];
    this.head = undefined;
    this.tail = undefined;
    //body parts
    this.bodyParts = new BodyParts(this.scene, this.asset);
    //Create collider between head and body parts
    //FIXME:this.scene.physics.add.overlap(this.head, this.bodyParts.group, this.eatItself, null, this);
    this._group = this.scene.physics.add.group();
	}

	get group()
	{
		return this._group;
	}


  /**
   * Create the body of the snake
   * @param {number} X: coordinate of the position on the grid
   * @param {number} Y: coordinate of the position on the grid
   * @param {string} direction: it's orientation 
   */
  createSnakeBody(X, Y, direction)
  {
    //Defining the starting orientation
    let orientation;
    if (direction === 'right')
    {
      orientation = -this.SQUARE_SIZE;
    } else {
      orientation = this.SQUARE_SIZE;
    }
    //generating it's head
    this.bodyCoordinates[0] = (X, Y);
    this.setHead(X, Y, direction, this.asset);
    //generating it's body
    this.bodyCoordinates[1] = (X + orientation, Y + orientation);
    this.addBodyPart(X + orientation, Y, direction, this.asset);
    //generating it's tail
    this.bodyCoordinates[2] = (X + (orientation * 2), Y + (orientation * 2));
    this.setTail(X + (orientation * 2), Y, direction, this.asset);
  }


  /**
   * Create/define the head of the snake
   * @param {number} X: coordinate of the position on the grid
   * @param {number} Y: coordinate of the position on the grid
   * @param {string} direction: it's orientation
   */
  setHead(X, Y, direction)
  {
    if (direction === 'right')
    {
      this.head = this.group.create(X, Y, this.asset, 0, true, true);
    } else if (direction === 'left')
    {
      this.head = this.group.create(X, Y, this.asset, 2, true, true);
    } else if (direction === 'up')
    {
      this.head = this.group.create(X, Y, this.asset, 3, true, true);
    } else if (direction === 'down')
    {
      this.head = this.group.create(X, Y, this.asset, 1, true, true);
    }
    this.head.setCollideWorldBounds(true);
    this.createHeadAnimation();
  }

  /**
   * Create a new body part for the snake
   * @param {number} X coordinate of the position on the grid
   * @param {number} Y coordinate of the position on the grid
   * @param {string} direction it's orientation
   */
	addBodyPart(X, Y, direction)
	{
    this.bodyParts.addBodyPart(X, Y, direction);
	}


  /**
   * Create/define the tail of the snake
   * @param {number} X: coordinate of the position on the grid
   * @param {number} Y: coordinate of the position on the grid
   * @param {string} direction: it's orientation
   */
  setTail(X, Y, direction)
  {
    if (direction === 'right')
    {
      this.tail = this.group.create(X, Y, this.asset, 10, true, true);
    } else if (direction === 'left')
    {
      this.tail = this.group.create(X, Y, this.asset, 11, true, true);
    } else if (direction === 'up')
    {
      this.tail = this.group.create(X, Y, this.asset, 12, true, true);
    } else if (direction === 'down')
    {
      this.tail = this.group.create(X, Y, this.asset, 13, true, true);
    }
    this.tail.setCollideWorldBounds(true);
  }


  /**
   * Create head animation
   */
  createHeadAnimation()
  {
    this.head.anims.create(
      {
        key: 'headUp',
        frames: [ { key: this.asset, frame: 3 } ],
        frameRate: this.SQUARE_SIZE,
        repeat: -1
      }
    );
    this.head.anims.create(
      {
        key: 'headDown',
        frames: [ { key: this.asset, frame: 1 } ],
        frameRate: this.SQUARE_SIZE,
        repeat: -1
      }
    );
		this.head.anims.create(
      {
        key: 'headRight',
        frames: [ { key: this.asset, frame: 0 } ],
        frameRate: this.SQUARE_SIZE,
        repeat: -1
		  }
    );
		this.head.anims.create(
      {
        key: 'headLeft',
        frames: [ { key: this.asset, frame: 2 } ],
        frameRate: this.SQUARE_SIZE,
        repeat: -1
		  }
    );
  }


  /**
   * Create tail animation
   */
  createTailAnimation()
  {
    this.tail.anims.create(
      {
        key: 'tailUp',
        frames: [ { key: this.asset, frame: 13 } ],
        frameRate: 32,
        repeat: -1
      }
    );
    this.tail.anims.create(
      {
        key: 'tailDown',
        frames: [ { key: this.asset, frame: 12 } ],
        frameRate: 32,
        repeat: -1
      }
    );
    this.tail.anims.create(
      {
        key: 'tailRight',
        frames: [ { key: this.asset, frame: 10 } ],
        frameRate: 32,
        repeat: -1
      }
    );
    this.tail.anims.create(
      {
        key: 'tailLeft',
        frames: [ { key: this.asset, frame: 11 } ],
        frameRate: 32,
        repeat: -1
      }
    );
  }


  /**
   * Update the coordinates of each snake's body part
   * @param {string} direction: of the head
   */
  updateCoordinates(direction)
  {
    //Put the old tail as the new head
    //The old head becomes the first body part
    //The last body part becomes the new tail
    this.bodyCoordinates.unshift(this.bodyCoordinates.pop());
    if (direction === 'down') {
      this.bodyCoordinates[0] = [this.bodyCoordinates[1][0], this.bodyCoordinates[1][0] + this.SQUARE_SIZE];
    }
    else if (direction === 'up') {
      this.bodyCoordinates[0] = [this.bodyCoordinates[1][0], this.bodyCoordinates[1][0] - this.SQUARE_SIZE];
    }
    else if (direction === 'left') {
      this.bodyCoordinates[0] = [this.bodyCoordinates[1][0] - this.SQUARE_SIZE, this.bodyCoordinates[1][0]];
    }
    else if (direction === 'right') {
      this.bodyCoordinates[0] = [this.bodyCoordinates[1][0] + this.SQUARE_SIZE, this.bodyCoordinates[1][0]];
    }
  }


  move()
  {

  }


  eatItself()
  {
     // TODO: launch event
  }
}