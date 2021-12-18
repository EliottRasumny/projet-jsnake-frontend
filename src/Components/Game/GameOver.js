import Phaser from 'phaser';
//import scenes & events
import eventsCenter from './EventCenter';

export default class GameOver extends Phaser.Scene
{
  constructor() {
    super("game-over");
  }

  create()
  {
    //FIXME:this.loadFont('showcard-gothic', '../../assets/fonts/showcard_gothic.ttf');
    var centerX = this.scale.width * 0.5;
    var centerY = this.scale.height * 0.5;
    this.add.text(centerX, centerY - 100, 'GAME OVER',
      {
        //fontFamily: 'showcard-gothic',
        fontSize: '48px',
        color: '#665847',
        fontStyle: 'bold'
      }
    ).setOrigin(0.5);
    const button = this.add.text(centerX, centerY + 100, 'Restart',
      {
        //fontFamily: 'showcard-gothic',
        fontSize: 25,
        color: '#665847',
        fontStyle: 'bold'
      }
    ).setOrigin(0.5);
    button.setInteractive();
    button.on('pointerover', () => { button.setFontSize(30);});
    button.on('pointerout', () => { button.setFontSize(25); });
    button.on('pointerdown', () => { this.scene.start('game-start'); });
  }


  loadFont(name, url) {
    var newFont = new FontFace(name, `url(${url})`);
    newFont.load().then(function (loaded) {
      document.fonts.add(loaded);
    }).catch(function (error) {
      return error;
  });
}
}
