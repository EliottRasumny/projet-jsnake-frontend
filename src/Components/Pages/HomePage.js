
import oneSnake from "../../img/oneSnake.png";
import twoSnakes from "../../img/twoSnakes.png";
import { Redirect } from "../Router/Router";

/**
 * Render the HomePage
 */

const HomePage = () => {
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = `
  <h1 class="m-5">JSnake</h1>
  <div class="wrapper">
    <div class="row">
      <div class="col-md-6 "> 
        <img src="${oneSnake}" class="rounded" alt="Blue Snake" style="width:100% ;heigth:auto" >
        <button id="btnToSingle" type="button" class="btn p-3 m-5 text-center active">Single Player</button>
      </div>

      <div class="col-md-6"> 
        <img src="${twoSnakes}" class="rounded" alt="Two Snakes" style="width:100% ;heigth:auto"> 
        <button id="btnToDual" type="button" class="btn p-3 m-5 text-center active">Two Players</button>
      </div>
    </div>
  </div>
  `;
  let submitSingle = document.querySelector("#btnToSingle");
  submitSingle.addEventListener("click", () => {
    Redirect("/single");
  });
  let submitDual = document.querySelector("#btnToDual");
  submitDual.addEventListener("click", () => {
    Redirect("/twoPlayer");
  });

};


export default HomePage;
//        <a id="btnToSingle" class="btn p-3 m-5 text-center" href="/single">Single Player</a>
