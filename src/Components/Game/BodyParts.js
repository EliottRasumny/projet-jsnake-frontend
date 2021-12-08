import Phaser from 'phaser';

export default class bodyParts
{
	/**
	 * @param {Phaser.Scene} scene: where it needs to be displayed
   * @param {Phaser.asset} asset: it's sprites
   */
	constructor(scene, asset)
	{
		this.scene = scene;
    this.asset = asset;
		this._group = this.scene.physics.add.group();
	}

	get group()
	{
		return this._group;
	}

  /**
   * Create a new part of the snake's body
   * @param {number} X: coordinate of the position on the grid
   * @param {number} Y: coordinate of the position on the grid
   * @param {string} direction: it's orientation
   * @returns a new part of the body
   */
	addBodyPart(X, Y, direction)
	{
    let bodyPart = undefined;
    if (direction === 'left' || direction === 'right')
    {
      bodyPart = this.group.create(X, Y, this.asset, 4, true, true);
    } else {
      bodyPart = this.group.create(X, Y, this.asset, 5, true, true);
    }
    bodyPart.setCollideWorldBounds(true);
    this.createBodyAnimation(bodyPart);
		return bodyPart;
	}


  /**
   * Create an anination for a part of the body
   * @param {Phaser.GameObjects} body: part of the body that needs to be animated
   */
  createBodyAnimation(body)
  {
    body.anims.create(
      {
        key: 'horizontal',
        frames:  [ { key: this.asset, frame: 4 } ],
        frameRate: 32,
        repeat: -1
      }
    );
    body.anims.create(
      {
        key: 'vertical',
        frames:  [ { key: this.asset, frame: 5 } ],
        frameRate: 32,
        repeat: -1
      }
    );
  }
}