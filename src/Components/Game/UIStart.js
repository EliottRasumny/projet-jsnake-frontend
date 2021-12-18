import Phaser from 'phaser';
//import scenes & events
import eventsCenter from './EventCenter';

export default class Start extends Phaser.Scene
{
  constructor() {
    super("game-start");
  }

  create()
  {
    //FIXME:this.loadFont('showcard-gothic', '../../assets/fonts/showcard_gothic.ttf');
    const button = this.add.text(this.scale.width * 0.5, this.scale.height * 0.5, 'START',
      {
        //fontFamily: 'showcard-gothic',
        fontSize: '32px',
        color: '#665847',
        fontStyle: 'bold'
      }
    ).setOrigin(0.5);
    button.setInteractive();
    button.on('pointerover', () => { button.setFontSize(48); });
    button.on('pointerout', () => { button.setFontSize(32); });
    button.on('pointerdown', () => { this.scene.start('game-scene'); });
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
