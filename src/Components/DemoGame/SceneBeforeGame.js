import Phaser from 'phaser';
import eventsCenter from '../Game/EventCenter';


class SceneBeforeGame extends Phaser.Scene
{


	constructor()
	{
		super('game-scene');
		this.button = undefined;
        this.background = undefined;
	}

    preload(){
        this.load.atlas('button', 'assets/buttons/button_texture_atlas.png', 'assets/buttons/button_texture_atlas.json');
    }

    
	create()
	{
		this.background = game.add.tileSprite(0, 0, 800, 600, 'background');
        this.button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 'over', 'out', 'down');
	}

}

export default SceneBeforeGame;