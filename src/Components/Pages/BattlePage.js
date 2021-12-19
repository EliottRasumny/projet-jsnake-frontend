import { Redirect } from "../Router/Router";
import Phaser from "phaser";
import BattleGame from '../Game/BattleGame';
import UIScore from "../Game/UIScore";
import UIStart from "../Game/UIStart";
import GameOver from "../Game/UIGameOver";

var game;

function BattlePage() {
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = `
  <div id="navbar" class="mb-5">
    <button id="battleToHome" type="button" class="btn btn-secondary text-center active">JSnake</button>
    <button id="battleToSettings" type="button" class="btn btn-secondary text-center active">Settings</button>
    <button id="battleToSinglePlayer" type="button" class="btn btn-secondary text-center active">Single Player</button>

  </div>
  <div id="battleGame" class="container justify-content-center my-3"></div>`;

  const config = {
    type: Phaser.AUTO,
    width: 736,
    height: 544,
    backgroundColor: '#BDEB5E',
    physics: {
      default: 'arcade',
      arcade: {y: 0}
    },
    parent: "battleGame",
    scene: [UIStart, BattleGame, UIScore, GameOver]
  };
  // there could be issues when a game was quit (events no longer working)
  // therefore destroy any started game prior to recreate it
  if (game) game.destroy(true);
  game = new Phaser.Game(config);
  //button==================================================
  //Go back to 2 players
  const submitGoBack = document.createElement("input");
  submitGoBack.value = "GO BACK";
  submitGoBack.className = "btn btn-secondary m-3";
  submitGoBack.addEventListener("click", () => {
    if (game) game.destroy(true);
    Redirect("/twoPlayers");
  });
  pageDiv.appendChild(submitGoBack);
 
   //Go Home
  var submitHome = document.querySelector("#battleToHome");
  submitHome.addEventListener("click", () => {
    if (game) game.destroy(true);
    Redirect("/");
  });

  //Go to settings
  var submitSettings = document.querySelector("#battleToSettings");
  submitSettings.addEventListener("click", () => {
    if (game) game.destroy(true);
    Redirect("/settings");
  });

  //Go to two players
  var submitTwoPlayers = document.querySelector("#battleToSinglePlayer");
  submitTwoPlayers.addEventListener("click", () => {
    if (game) game.destroy(true);
    Redirect("/singlePlayer");
  });
}
export default BattlePage;
