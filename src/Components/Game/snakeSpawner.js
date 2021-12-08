import Phaser from 'phaser';
//import classes
import BodyPartSpawner from './BodyPartSpawner';
//import scenes & events
import eventsCenter from './EventCenter';

export default class SnakeSpawner
{
	/**
	 * @param {Phaser.Scene} scene: where it needs to be displayed
   * @param {Phaser.asset} asset: it's sprites
   * @param {string} direction: orientation at the start
	 */
	constructor(scene, asset, direction)
	{
		this.scene = scene;
		this.asset = asset;
    this.head = undefined;
    this.tail = undefined;
    //body parts
    this.bodyParts = new BodyPartSpawner(this.scene, asset);
    //direction taken by the head
    this.direction = direction;
    //TODO: Create collider between head and body parts
    //this.physics.add.overlap(this.head, this.bodyParts.group, this.eatItself, null, this);
		this._group = this.scene.physics.add.group();
	}

	get group()
	{
		return this._group;
	}

  /**
   * Create/define the head of the snake
   * @param {number} X: coordinate of the position on the grid
   * @param {number} Y: coordinate of the position on the grid
   * @param {string} direction: it's orientation
   */
  setHead(X, Y)
  {
    if (this.direction === 'right')
    {
      this.head = this.group.create(X, Y, this.asset, 0, true, true);
    } else if (this.direction === 'left')
    {
      this.head = this.group.create(X, Y, this.asset, 2, true, true);
    } else if (this.direction === 'up')
    {
      this.head = this.group.create(X, Y, this.asset, 3, true, true);
    } else if (this.direction === 'down')
    {
      this.head = this.group.create(X, Y, this.asset, 1, true, true);
    }
    this.head.setCollideWorldBounds(true);
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


  eatItself()
  {
     // TODO: launch event
  }
}