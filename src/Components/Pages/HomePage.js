import blue_snake from "../../img/blue_snake.png";
import blue_snake_inverse from "../../img/blue_snake_inverse.png";
import red_snake from "../../img/red_snake.png";
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
        <img src="${oneSnake}" class="rounded" alt="Blue Snake" style="width:100% ;heigth:auto" >  <br>
        <a id="btnToSingle" class="btn p-3 m-5 text-center" href="/single">Single Player</a>
      </div>

      <div class="col-md-6"> 
        <img src="${twoSnakes}" class="rounded" alt="Two Snakes" style="width:100% ;heigth:auto"> 
        <a id="btnToDual" class="btn p-3 m-5 text-center" href="/twoPlayer">Two Players</a>
      </div>
    </div>
  </div>
 `;
};


export default HomePage;
