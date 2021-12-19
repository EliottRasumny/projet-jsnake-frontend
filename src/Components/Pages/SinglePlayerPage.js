import { Redirect } from "../Router/Router";
import Phaser from 'phaser';
import SingleGame from "../Game/SingleGame";
import UISingleScore from "../Game/UISingleScore";
import GameOver from "../Game/UIGameOver";
import Start from "../Game/UIStart";

var game;

function SinglePage() {
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = `
  <div id="navbar" class="mb-5">
    <button id="singleToHome" type="button" class="btn btn-secondary text-center active">JSnake</button>
    <button id="singleToScore" type="button" class="btn btn-secondary text-center active">Scoreboard</button>
    <button id="singleToSettings" type="button" class="btn btn-secondary text-center active">Settings</button>
    <button id="singleToTwoPlayers" type="button" class="btn btn-secondary text-center active">Two Players</button>

  </div>
  <h1 class="m-5">Single Player</h1>
  <div id="playGame" class="container justify-content-center mt-5 my-3"></div>`;

  const config = {
    type: Phaser.AUTO,
    width: 544,
    height: 480,
    backgroundColor: '#BDEB5E',
    physics: {
      default: 'arcade',
      arcade: {y: 0}
    },
    parent: "playGame",
    scene: [Start, SingleGame, UISingleScore, GameOver]
  };

  // there could be issues when a game was quit (events no longer working)
  // therefore destroy any started game prior to recreate it
  if (game) game.destroy(true, false);
  game = new Phaser.Game(config);
  //Buttons ======================================================
  //Go Home
  var submitHome = document.querySelector("#singleToHome");
  submitHome.addEventListener("click", () => {
    if (game) game.destroy(true);
    Redirect("/");
  });
  //TODO: a supprimer ce qui suit et faire comme dans 'EXEMPLE'
  /*
  const submitHome = document.createElement("input");
  submitHome.value = "< GO HOME";
  submitHome.id = "button";
  submitHome.className = "btn btn-secondary m-3";
  submitHome.addEventListener("click", () => {
    if (game) game.destroy(true, false);
    Redirect("/");
  });
  pageDiv.appendChild(submitHome);
  */
  //Go to scoreboard
  var submitScore = document.querySelector("#singleToScore");
  submitScore.addEventListener("click", () => {
    if (game) game.destroy(true);
    Redirect("/scoreboardSingle");
  });

  //Go to settings
  var submitSettings = document.querySelector("#singleToSettings");
  submitSettings.addEventListener("click", () => {
    if (game) game.destroy(true);
    Redirect("/settings");
  });

  //Go to two players
  var submitTwoPlayers = document.querySelector("#singleToTwoPlayers");
  submitTwoPlayers.addEventListener("click", () => {
    if (game) game.destroy(true);
    Redirect("/twoPlayers");
  });
}
export default SinglePage;
