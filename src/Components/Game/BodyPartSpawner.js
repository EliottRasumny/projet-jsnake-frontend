import Phaser from 'phaser';

export default class bodyPartSpawner
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
		return bodyPart;
	}
}