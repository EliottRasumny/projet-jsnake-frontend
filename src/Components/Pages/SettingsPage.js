import HomePage from "./HomePage";
import { Redirect } from "../Router/Router";

import arrowRight from "../../img/arrowRight.png";

/**
 * Render the NewPage :
 * Just an example to demonstrate how to use the router to "redirect" to a new page
 */
function SettingsPage() {
  // Deal with your NewPage content here
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML =  `
  <h1 class="m-5">Settings</h1>
  <div class="wrapper">
    <form>
      <div class="row">
        <div class="col-md-6 "> 
          <p>Player 1</p>
          <span><img src="${arrowRight}" class="rounded inline" alt="Blue Snake" style="width:20% ;heigth:auto" >  : <input type="text" id="fname" name="fname"> </span>
          
        </div>

        <div class="col-md-6"> 
          
        </div>
      </div>
    </form>
  </div>
 `;



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