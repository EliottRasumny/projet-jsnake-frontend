import { Redirect } from "../Router/Router";

/**
 * Render the NewPage :
 * Just an example to demonstrate how to use the router to "redirect" to a new page
 */
function SinglePLayer() {
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = `
  <h1 class="m-5">1Player</h1>
    <button id="btnToPlay" class="btn p-3 m-5">Play</button>
    <button id="btnToScoreboard" class="btn p-3 m-5">ScoreBoard</button>
    <button id="btnToSettings" class="btn p-3 m-5">Settings</button>  `;
  const submitPlay = document.querySelector("#btnToPlay");
  submitPlay.addEventListener("click", () => {
    Redirect("/play");
  });
  pageDiv.appendChild(submitPlay);

  const submitScoreboard = document.querySelector("#btnToScoreboard");
  submitScoreboard.addEventListener("click", () => {
    Redirect("/scoreboardSingle");
  });
  pageDiv.appendChild(submitScoreboard);

  const submitSettings = document.querySelector("#btnToSettings");
  submitSettings.addEventListener("click", () => {
    Redirect("/settings");
  });
  pageDiv.appendChild(submitSettings);
}

export default SinglePLayer;
