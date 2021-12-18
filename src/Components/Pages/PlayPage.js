import { Redirect } from "../Router/Router";
import Phaser from 'phaser';
import PlayGame from "../Game/SingleGame";
import UISingleScore from "../Game/UISingleScore";
import GameOver from "../Game/UIGameOver";
import Start from "../Game/UIStart";

var game;

function PlayPage() {
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = `<div id="playGame" class="container justify-content-center my-3"></div>`;

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
    scene: [Start, PlayGame, UISingleScore, GameOver]
  };

  // there could be issues when a game was quit (events no longer working)
  // therefore destroy any started game prior to recreate it
  if (game) game.destroy(true, false);
  game = new Phaser.Game(config);
  //Buttons ======================================================
  //Go Home
  const submitHome = document.createElement("input");
  submitHome.value = "< GO HOME";
  submitHome.id = "button";
  submitHome.className = "btn btn-secondary m-3";
  submitHome.addEventListener("click", () => {
    if (game) game.destroy(true, false);
    Redirect("/");
  });
  pageDiv.appendChild(submitHome);
  //Go to scoreboard
  const submitScore = document.createElement("input");
  submitScore.value = "< SCOREBOARD >";
  submitScore.id = "button";
  submitScore.className = "btn btn-secondary m-3";
  submitScore.addEventListener("click", () => {
    if (game) game.destroy(true, false);
    Redirect("/scoreboardSingle");
  });
  pageDiv.appendChild(submitScore);
  //Go to settings
  const submitSettings = document.createElement("input");
  submitSettings.value = "< SETTINGS >";
  submitSettings.id = "button";
  submitSettings.className = "btn btn-secondary m-3";
  submitSettings.addEventListener("click", () => {
    if (game) game.destroy(true, false);
    Redirect("/settings");
  });
  pageDiv.appendChild(submitSettings);
  //Go to two players
  const submitTwo = document.createElement("input");
  submitTwo.value = "TWO PLAYERS >";
  submitTwo.id = "button";
  submitTwo.className = "btn btn-secondary m-3";
  submitTwo.addEventListener("click", () => {
    if (game) game.destroy(true, false);
    Redirect("/twoPlayer");
  });
  pageDiv.appendChild(submitTwo);
}
export default PlayPage;
