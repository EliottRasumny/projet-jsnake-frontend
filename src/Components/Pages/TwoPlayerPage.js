import HomePage from "./HomePage";
import { Redirect } from "../Router/Router";

/**
 * Render the Two Player Page :
 */
function TwoPlayer() {
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = `
  <h1 class="m-5">2 Players</h1>
  <div cl>
    <button id="btnToCOOP" class="btn p-3 m-5"">COOP</button>
    <button id="btnToScoreboardCoop" class="btn p-3 m-5">Scoreboard</button>
  </div>
  <div>
    <button id="btnToBattle" class="btn p-3 m-5">BATTLE</button>
  </div>
  <div>
    <button id="btnToSettings" class="btn p-3 m-5"">Settings</button>
  </div>`;
  //button to launch game in COOP mode
  const submitCoop = document.querySelector("#btnToCOOP");
  submitCoop.addEventListener("click", () => {
    Redirect("/coop");
  });
  pageDiv.appendChild(submitCoop);
  //button to get scoreboard for COOP
  const submitScoreBoardCoop = document.querySelector("#btnToScoreboardCoop");
  submitScoreBoardCoop.addEventListener("click", () => {
    Redirect("/scoreboardCoop");
  });
  pageDiv.appendChild(submitScoreBoardCoop);
  //button to launch game in BATTLE mode
  const submitBattle = document.querySelector("#btnToBattle");
  submitBattle.addEventListener("click", () => {
    Redirect("/battle");
  });
  pageDiv.appendChild(submitBattle);
  //button to get settings for two players
  const submitSettings = document.querySelector("#btnToSettings");
  submitSettings.addEventListener("click", () => {
    Redirect("/settings");
  });
  pageDiv.appendChild(submitSettings);
}

export default TwoPlayer;
