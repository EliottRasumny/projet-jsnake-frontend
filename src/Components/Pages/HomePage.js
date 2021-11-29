import blue_snake from "../../img/blue_snake.png";
import blue_snake_inverse from "../../img/blue_snake_inverse.png";
import red_snake from "../../img/red_snake.png";

/**
 * Render the HomePage
 */

const HomePage = () => {
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = `<h1 class="m-5">JSnake</h1>
  <div class="d-inline-flex p-1 ">
  <img src="${blue_snake}" class="rounded float-start" alt="Blue Snake" style="width:8vw ;heigth:auto" >
  <div class="container">
  <img src="${red_snake}" class="rounded float-start" alt="Red Snake" style="width:8vw ;heigth:auto">
  <img src="${blue_snake_inverse}" class="rounded float-start"alt="Blue Snake" style="width:8vw ;heigth:auto">
  </div>
  </div>
  <div class="container ">
  <button id="btn" class="btn p-3 m-5">1Player</button>
  <button id="btn" class="btn p-3 m-5">2Player</button>
</div>`;
};

export default HomePage;
