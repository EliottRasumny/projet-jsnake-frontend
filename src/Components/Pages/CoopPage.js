import { Redirect } from "../Router/Router";
import Phaser from 'phaser';
import CoopGame from '../Game/CoopGame';
import UISingleScore from "../Game/UISingleScore";
import GameOver from "../Game/GameOver";
import Start from "../Game/Start";

var game;

function CoopPage() {
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = `<div id="coopGame" class="container justify-content-center my-3"></div>`;

  const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    backgroundColor: '#BDEB5E',
    physics: {
      default: 'arcade',
      arcade: {y: 0}
    },
    parent: "coopGame",
    scene: [Start, CoopGame, UISingleScore, GameOver]
  };

  // there could be issues when a game was quit (events no longer working)
  // therefore destroy any started game prior to recreate it
  if (game) game.destroy(true);
  game = new Phaser.Game(config);
  // create a login form
  const submit = document.createElement("input");
  submit.value = "Go back to Two Player";
  // Example on how to use Bootstrap to style a Button
  submit.className = "btn btn-secondary mt-3";
  // Example on how to add an event handler : when the button is clicked, redirect
  // to the HomePage
  submit.addEventListener("click", () => {
    Redirect("/twoPlayer");
  });
  pageDiv.appendChild(submit);
}

export default CoopPage;