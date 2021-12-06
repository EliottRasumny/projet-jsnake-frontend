import { Redirect } from "../Router/Router";
import Phaser from "phaser";
import CoopScene from "../Game/CoopScene";

var game;

/**
 * Render the CoopPage :
 * Just an example to demonstrate how to use the router to "redirect" to a new page
 */
function CoopPage() {
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = `<div id="gameDiv" class="d-flex justify-content-center my-3"></div>`;

  let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0 },
        debug: false,
      },
    },
    scene: [CoopScene],
    //  parent DOM element into which the canvas created by the renderer will be injected.
    parent: "gameDiv",
  };
  // there could be issues when a game was quit (events no longer working)
  // therefore destroy any started game prior to recreate it
  if (game) game.destroy(true);
  console.log(game);
  game = new Phaser.Game(config);
  console.log("game");

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