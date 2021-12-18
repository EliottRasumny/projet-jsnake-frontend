import { Redirect } from "../Router/Router";

/**
 * Render the Two Player Page :
 */
function TwoPlayer() {
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = `
  <h1 class="m-5">2 Players</h1>
  <div>
    <button id="btnToCOOP" class="btn p-3 m-5"">COOP</button>
  </div>
  <div>
    <button id="btnToBattle" class="btn p-3 m-5">BATTLE</button>
  </div>
  <div>
    <button id="btnToHome" class="btn p-3 m-5">GO BACK</button>
  </div>`;
  //button to launch game in COOP mode
  const submitCoop = document.querySelector("#btnToCOOP");
  submitCoop.addEventListener("click", () => {
    Redirect("/coop");
  });
  pageDiv.appendChild(submitCoop);
  //button to launch game in BATTLE mode
  const submitBattle = document.querySelector("#btnToBattle");
  submitBattle.addEventListener("click", () => {
    Redirect("/battle");
  });
  pageDiv.appendChild(submitBattle);
  //button to go back to home
  const submitHome = document.querySelector("#btnToHome");
  submitHome.addEventListener("click", () => {
    Redirect("/");
  });
  pageDiv.appendChild(submitHome);
}
export default TwoPlayer;
