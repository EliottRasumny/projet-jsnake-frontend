import Phaser from 'phaser';
import eventsCenter from './EventCenter';

let X, Y, score, player;

export default class UIScoreSingleScore extends Phaser.Scene
{
	constructor(player)
	{
		super('ui-score');
		this.score = 0;
		this.player = player;
	}

	create()
	{
		//Creating score's text to display
		this.label = this.add.text(this.scale.width * 0.5, 16, `Score : 0`, {
			fontSize: 16,
			color: '#665847',
			fontStyle: 'bold'
		}).setOrigin(0.5);
		//Listen to an event
		eventsCenter.on('update-scoreSingle', this.updateScore, this);

		// clean up when Scene is shutdown
		this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
			eventsCenter.off('update-scoreSingle', this.updateScore, this)
		});
	}

	updateScore(score)
	{
		this.label.text = `Score : ${score}`;		
	}
}