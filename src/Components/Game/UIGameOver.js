import Phaser from 'phaser';

export default class GameOver extends Phaser.Scene
{
  constructor() {
    super("game-over");
  }

  create(tabScore)
  {
    if (tabScore[0] == -1) tabScore[0] = 0;
    if (tabScore[1] == -1) tabScore[1] = 0;
    var centerX = this.scale.width * 0.5;
    var centerY = this.scale.height * 0.5;
    this.add.text(centerX, centerY - 100, 'GAME OVER',
      {
        fontSize: '52px',
        color: '#665847',
        fontStyle: 'bold'
      }
    ).setOrigin(0.5);
    //Displayscore
    if(tabScore[1] == null)
    {
      this.add.text(this.scale.width * 0.5, this.scale.height * 0.5 - 16, `Score : ${tabScore[0]}`, {
        fontSize: 32,
        color: '#665847',
        fontStyle: 'bold'
      }).setOrigin(0.5);
    }
    else{
      this.add.text(this.scale.width * 0.5, this.scale.height * 0.5 - 16, `Player 1 : ${tabScore[0]}`, {
        fontSize: 32,
        color: '#665847',
        fontStyle: 'bold'
      }).setOrigin(0.5);
      this.add.text(this.scale.width * 0.5, this.scale.height * 0.5 + 16, `Player 2 : ${tabScore[1]}`, {
        fontSize: 32,
        color: '#665847',
        fontStyle: 'bold'
      }).setOrigin(0.5);
    }
    
    //Button to restart the game
    const button = this.add.text(centerX, centerY + 100, 'Restart',
      {
        fontSize: '32px',
        color: '#665847',
        fontStyle: 'bold'
      }
    ).setOrigin(0.5);
    button.setInteractive();
    button.on('pointerover', () => { button.setFontSize(48);});
    button.on('pointerout', () => { button.setFontSize(32);});
    button.on('pointerdown', () => {
      this.scene.stop('ui-score');
      this.scene.start('game-scene');
    });
  }
}
