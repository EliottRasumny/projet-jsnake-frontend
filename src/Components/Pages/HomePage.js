import blue_snake from "../../img/blue_snake.png";
import blue_snake_inverse from "../../img/blue_snake_inverse.png";
import red_snake from "../../img/red_snake.png";
import { Redirect } from "../Router/Router";

/**
 * Render the HomePage
 */

const HomePage = () => {
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = `
  <h1 class="m-5">JSnake</h1>
  <div class="d-inline-flex p-1 ">
    <img src="${blue_snake}" class="rounded float-start" alt="Blue Snake" style="width:8vw ;heigth:auto" >
    <div>
      <img src="${red_snake}" class="rounded float-start" alt="Red Snake" style="width:8vw ;heigth:auto">
      <img src="${blue_snake_inverse}" class="rounded float-start"alt="Blue Snake" style="width:8vw ;heigth:auto">
    </div>
  </div>
  <div class="container ">
    <button id="btnToSingle" class="btn p-3 m-5">1Player</button>
    <button id="btnToDual" class="btn p-3 m-5">2Player</button>
  </div>`;
  const submitSingle = document.querySelector("#btnToSingle");
  submitSingle.addEventListener("click", () => {
    Redirect("/single");
  });
  pageDiv.appendChild(submitSingle);

  const submitDual = document.querySelector("#btnToDual");
  submitDual.addEventListener("click", () => {
    Redirect("/dual");
  });
  pageDiv.appendChild(submitDual);
};


export default HomePage;
