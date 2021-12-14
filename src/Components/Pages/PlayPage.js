import { Redirect } from "../Router/Router";
import Phaser from 'phaser';
import PlayGame from "../Game/SingleGame";
import UIScore from "../Game/UIScore";

var game;

function PlayPage() {
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = `<div id="playGame" class="container justify-content-center my-3"></div>`;

  const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    backgroundColor: '#BDEB5E',
    physics: {
      default: 'arcade',
      arcade: {y: 0}
    },
    parent: "playGame",
    scene: [PlayGame, UIScore]
  };

  // there could be issues when a game was quit (events no longer working)
  // therefore destroy any started game prior to recreate it
  if (game) game.destroy(true);
  //FIXME: bugs while collisions = true
  game = new Phaser.Game(config);
  
  /*
  game.stage.add('Menu', Menu);     
  // Adding the Game state.
  game.state.add('Game', CoopGame);
  game.state.start('Menu');
  */

  // create a login form
  const submit = document.createElement("input");
  submit.value = "Go back to Single player";
  // Example on how to use Bootstrap to style a Button
  submit.className = "btn btn-secondary mt-3";
  // Example on how to add an event handler : when the button is clicked, redirect
  // to the HomePage
  submit.addEventListener("click", () => {
    Redirect("/single");
  });
  pageDiv.appendChild(submit);
}

export default PlayPage;