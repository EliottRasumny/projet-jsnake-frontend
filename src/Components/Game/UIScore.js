import Phaser from 'phaser';
import eventsCenter from './EventCenter';

let X, Y, score, player;

export default class UIScore extends Phaser.Scene
{
	constructor(X, Y, player)
	{
		super('ui-score');
		this.score = 0;
		this.player = player;
		this.X = X;
		this.Y = Y;
	}

	create()
	{
		//Creating score's text to display
		this.label = this.add.text(X, Y, `Player${this.player}: 0`, {
			fontSize: 16
		});
		//Listen to an event
		eventsCenter.on('update-score', this.updateScore, this);

		// clean up when Scene is shutdown
		this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
			eventsCenter.off('update-score', this.updateScore, this)
		});
	}

	updateScore(score, player)
	{
		this.label.text = `Player${player}: ${score}`;		
	}
}