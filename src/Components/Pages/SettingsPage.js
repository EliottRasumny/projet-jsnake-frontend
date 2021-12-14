import HomePage from "./HomePage";
import { Redirect } from "../Router/Router";

import arrowUp from "../../img/upArrowKey.png";
import arrowRight from "../../img/rightArrowKey.png";
import arrowDown from "../../img/downArrowKey.png";
import arrowLeft from "../../img/leftArrowKey.png";

/**
 * Render the NewPage :
 * Just an example to demonstrate how to use the router to "redirect" to a new page
 */
function SettingsPage() {
  //find keys already saved
  let upKey1 = "Z";
  let rightKey1 = "D";
  let downKey1 = "S";
  let leftKey1 = "Q";

  //TODO : delete arrowRight.png

  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML =  `
  <h1 class="m-5">Settings</h1>
  <div class="wrapper">
    <form>
      <div class="row">
        <div class="col-md-6 "> 
          <p>Player 1</p>
          <span><img src="${arrowUp}" class="rounded inline" alt="up key" style="width:10% ;heigth:auto" > : ${upKey1}</span>
          <span><img src="${arrowRight}" class="rounded inline" alt="right key" style="width:10% ;heigth:auto" >  : ${rightKey1}</span>
          <span><img src="${arrowDown}" class="rounded inline" alt="down key" style="width:10% ;heigth:auto" >  : ${downKey1}</span>
          <span><img src="${arrowLeft}" class="rounded inline" alt="left key" style="width:10% ;heigth:auto" >  : ${leftKey1}</span>
          
        </div>

        <div class="col-md-6"> 
          
        </div>
      </div>
    </form>
  </div>
 `;

 // TODO : Add an event listenner when we clic on an arrow



  // create a login form
  const submit = document.createElement("input");
  submit.value = "Go back to HomePage";
  // Example on how to use Bootstrap to style a Button
  submit.className = "btn btn-secondary mt-3";
  // Example on how to add an event handler : when the button is clicked, redirect
  // to the HomePage
  submit.addEventListener("click", () => {
    Redirect("/");
  });
  pageDiv.appendChild(submit);
}

export default SettingsPage;