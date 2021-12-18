import { Redirect } from "../Router/Router";
import Phaser from 'phaser';
import CoopGame from '../Game/CoopGame';
import UISingleScore from "../Game/UISingleScore";
import GameOver from "../Game/UIGameOver";
import Start from "../Game/UIStart";

var game;

function CoopPage() {
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = `<div id="coopGame" class="container justify-content-center my-3"></div>`;

  const config = {
    type: Phaser.AUTO,
    width: 736,
    height: 544,
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
  //button==================================================
  //Go back to 2 players
  const submitGoBack = document.createElement("input");
  submitGoBack.value = "< GO BACK";
  submitGoBack.className = "btn btn-secondary m-3";
  submitGoBack.addEventListener("click", () => {
    if (game) game.destroy(true);
    Redirect("/twoPlayers");
  });
  pageDiv.appendChild(submitGoBack);
  //To Home
  const submitHome = document.createElement("input");
  submitHome.value = "< GO HOME >";
  submitHome.className = "btn btn-secondary m-3";
  submitHome.addEventListener("click", () => {
    if (game) game.destroy(true);
    Redirect("/");
  });
  pageDiv.appendChild(submitHome);
  //To settings
  const submitSettings = document.createElement("input");
  submitSettings.value = "< SETTINGS >";
  submitSettings.className = "btn btn-secondary m-3";
  submitSettings.addEventListener("click", () => {
    if (game) game.destroy(true);
    Redirect("/settings");
  });
  pageDiv.appendChild(submitSettings);
  //To Scoreboard
  const submitScoreBoard = document.createElement("input");
  submitScoreBoard.value = "< SCOREBOARD >";
  submitScoreBoard.className = "btn btn-secondary m-3";
  submitScoreBoard.addEventListener("click", () => {
    if (game) game.destroy(true);
    Redirect("/scoreboardCoop");
  });
  pageDiv.appendChild(submitScoreBoard);
  //To Single Player
  const submitSingle = document.createElement("input");
  submitSingle.value = "TO SINGLE PLAYER >";
  submitSingle.className = "btn btn-secondary m-3";
  submitSingle.addEventListener("click", () => {
    if (game) game.destroy(true);
    Redirect("/singlePlayer");
  });
  pageDiv.appendChild(submitSingle);
}

export default CoopPage;