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

  //TODO : delete arrowRight.png

  const pageDiv = document.querySelector("#page");
  updatePage();

  function updatePage(){
    
    //récupérer les touches du user authentifié 
    //TODO find keys already saved 
    let user = getSessionObject("user1");

    if(!user){
      upKey1 = "Z";
      rightKey1 = "D";
      downKey1 = "S";
      leftKey1 = "Q";  
    }else{
      //console.log(user.valueOf("keyUp1"));
      upKey1 = "Z";
      rightKey1 = "D";
      downKey1 = "S";
      leftKey1 = "Q";  
    }




    pageDiv.innerHTML =  `
    <h1 class="m-5">Settings</h1>
    <div class="wrapper">
      <form>
        <div class="row">
          <div class="col-md-6 "> 
            <p>Player 1</p>
            <span id="up1"><img src="${arrowUp}" class="rounded inline" alt="up key" style="width:10% ;heigth:auto" > : ${upKey1}</span>
            <span id="right1"><img src="${arrowRight}" class="rounded inline" alt="right key" style="width:10% ;heigth:auto" >  : ${rightKey1}</span>
            <span id="down1"><img src="${arrowDown}" class="rounded inline" alt="down key" style="width:10% ;heigth:auto" >  : ${downKey1}</span>
            <span id="left1"><img src="${arrowLeft}" class="rounded inline" alt="left key" style="width:10% ;heigth:auto" >  : ${leftKey1}</span>
            
          </div>
  
          <div class="col-md-6"> 
            
          </div>
        </div>
      </form>
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
    console.log("YOOOOOO UP");
    alert("Press the key");
    //TODO : indiquer que le user doit enfoncer une touche
  }
  function changeKeyUp(e){
    console.log(e.code);

    //TODO mettre le nom et le code de la touche dans le backend et ou dans une variable session
    //upKey1 = e.code;
    updatePage();
    document.removeEventListener('keydown', changeKeyUp);
  }
  function listenKeyRight(){
    console.log("YOOOOOO Right");
  }
  function listenKeyDown(){
    console.log("YOOOOOO Down");
  }
  function listenKeyLeft(){
    console.log("YOOOOOO Left");
  }



}

export default SettingsPage;