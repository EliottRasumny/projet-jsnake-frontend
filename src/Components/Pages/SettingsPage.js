import HomePage from "./HomePage";
import { Redirect } from "../Router/Router";
import { getSessionObject } from "../../utils/session";

import arrowUp from "../../img/upArrowKey.png";
import arrowRight from "../../img/rightArrowKey.png";
import arrowDown from "../../img/downArrowKey.png";
import arrowLeft from "../../img/leftArrowKey.png";

/**
 * Render the NewPage :
 * Just an example to demonstrate how to use the router to "redirect" to a new page
 */
function SettingsPage() {
  let upKey1;
  let rightKey1;
  let downKey1;
  let leftKey1;  

  let user = getSessionObject("user1");

  
  const pageDiv = document.querySelector("#page");
  updatePage();

  function updatePage(){
    
    if(!user){
      console.log("Not Connected !");
      upKey1 = "Z";
      rightKey1 = "D";
      downKey1 = "S";
      leftKey1 = "Q";  
    }else{
      console.log("In the session : ", user);
      upKey1 = user.keyUp1;
      rightKey1 = user.keyRight1;
      downKey1 = user.keyDown1;
      leftKey1 = user.keyLeft1;  
    }


    pageDiv.innerHTML =  `
    <h1 class="m-5">Settings</h1>
    <div class="wrapper">
      <div class="row"> 
        <div class="col-md-6"> 
          <p>Player 1</p>
          <span id="up1"><img src="${arrowUp}" class="rounded inline" alt="up key" style="width:10% ;heigth:auto" > : ${upKey1}</span></br>
          <span id="left1"><img src="${arrowLeft}" class="rounded inline" alt="left key" style="width:10% ;heigth:auto" >  : ${leftKey1}</span>
          <span id="down1"><img src="${arrowDown}" class="rounded inline" alt="down key" style="width:10% ;heigth:auto" >  : ${downKey1}</span>
          <span id="right1"><img src="${arrowRight}" class="rounded inline" alt="right key" style="width:10% ;heigth:auto" >  : ${rightKey1}</span>            
        </div>

        <div class="col-md-6"> 
          <p>Player 2</p>
          <span id="up1"><img src="${arrowUp}" class="rounded inline" alt="up key" style="width:10% ;heigth:auto" > : ${upKey1}</span>
          <span id="right1"><img src="${arrowRight}" class="rounded inline" alt="right key" style="width:10% ;heigth:auto" >  : ${rightKey1}</span>            
          <span id="down1"><img src="${arrowDown}" class="rounded inline" alt="down key" style="width:10% ;heigth:auto" >  : ${downKey1}</span>
          <span id="left1"><img src="${arrowLeft}" class="rounded inline" alt="left key" style="width:10% ;heigth:auto" >  : ${leftKey1}</span>
        </div>

      </div>
    </div>
   `;  
    //TODO : add the settings for the other user and make it beautiful

    let up1Button = document.querySelector("#up1");
    let right1Button = document.querySelector("#right1");
    let down1Button = document.querySelector("#down1");
    let left1Button = document.querySelector("#left1");

    up1Button.addEventListener("click", listenKeyUp)
    right1Button.addEventListener("click", listenKeyRight)
    down1Button.addEventListener("click", listenKeyDown)
    left1Button.addEventListener("click", listenKeyLeft)


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




  function listenKeyUp(){
    document.addEventListener("keydown", changeKeyUp);
    console.log("UP");
    upKey1 = "Press any key";
    updatePage();
    //TODO : indiquer que le user doit enfoncer une touche
  }
  async function changeKeyUp(e){
    console.log(e.code);

    //TODO mettre le nom et le code de la touche dans le backend et ou dans une variable session
    try {
      const options = {
        method: "PUT", 
        body: JSON.stringify({
          keyUp1: e.code,
        }), 
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(`/api/auths/user/`, options); // fetch return a promise => we wait for the response
      if (!response.ok) {
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
    }catch (error) {
      console.error("LoginPage::error: ", error);
    }

    user.keyUp1 = e.code;
    updatePage();
    document.removeEventListener('keydown', changeKeyUp);
  }
  function listenKeyRight(){
    console.log("Right");
  }
  function listenKeyDown(){
    console.log("Down");
  }
  function listenKeyLeft(){
    console.log("Left");
  }



}

export default SettingsPage;