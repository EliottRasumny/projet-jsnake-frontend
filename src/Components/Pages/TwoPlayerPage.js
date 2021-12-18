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
  </div>
  <div>
    <button id="btnToBattle" class="btn p-3 m-5">BATTLE</button>
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
}
export default TwoPlayer;
