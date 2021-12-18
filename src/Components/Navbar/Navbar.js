// When using Bootstrap to style components, the CSS is imported in index.js
// However, the JS has still to be loaded for each Bootstrap's component that needs it.
// Here, because our JS component 'Navbar' has the same name as Navbar Bootstrap's component
// we change the name of the imported Bootstrap's 'Navbar' component
import { Navbar as BootstrapNavbar} from "bootstrap";
import { getSessionObject } from "../../utils/session"; // destructuring assignment ("{}": see MDN for more info ; )
import { Redirect } from "../Router/Router";



/**
 * Render the Navbar which is styled by using Bootstrap
 * Each item in the Navbar is tightly coupled with the Router configuration :
 * - the URI associated to a page shall be given in the attribute "data-uri" of the Navbar
 * - the router will show the Page associated to this URI when the user click on a nav-link
 */

const Navbar = () => {
  const navbarWrapper = document.querySelector("#navbarWrapper");
  let user1 = getSessionObject("user1");
  let user2 = getSessionObject("user2");
  let navbar;

  if (!user1) {
    navbar = `
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container ">
        <button id="btnToHome2" type="button" class="btn btn-link navbar-brand active text-white">JSnake</button>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse text-white navbar-dark" id="navbarNavDropdown">
            <ul class="navbar-nav mx-auto">
                <li class="nav-item">
                    <button id="btnToHome" type="button" class="btn btn-link nav-link active text-white">Home</button>
                </li>
                <li class="nav-item">
                    <button id="btnToTwoPlayer" type="button" class="btn btn-link nav-link active text-white">Two Players</button>
                </li>
                <li class="nav-item">
                    <button id="btnToScoreboards" type="button" class="btn btn-link nav-link active text-white">Scoreboard</button>
                </li>
            </ul>
            <div class="d-flex">
                <button id="btnToLogin1" type="button" class="btn btn-light ms-3 active">Login</button>
                <button id="btnToRegister" type="button" class="btn btn-light ms-3 active">Register</button>
            </div>
        </div>
    </div>
  </nav>
  `;  
  navbarWrapper.innerHTML = navbar;

  let submitLogin1 = document.querySelector("#btnToLogin1");
  submitLogin1.addEventListener("click", () => {
    Redirect("/login1");
  });
  let submitRegister = document.querySelector("#btnToRegister");
  submitRegister.addEventListener("click", () => {
    Redirect("/register");
  });



  } else if (!user2) {
    navbar = `
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container ">
          <button id="btnToHome2" type="button" class="btn btn-link navbar-brand active text-white">JSnake</button>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse text-white navbar-dark" id="navbarNavDropdown">
              <ul class="navbar-nav mx-auto">
                <li class="nav-item">
                    <button id="btnToHome" type="button" class="btn btn-link nav-link active text-white">Home</button>
                </li>
                <li class="nav-item">
                    <button id="btnToTwoPlayer" type="button" class="btn btn-link nav-link active text-white">Two Players</button>
                </li>
                <li class="nav-item">
                    <button id="btnToScoreboards" type="button" class="btn btn-link nav-link active text-white">Scoreboard</button>
                </li>
                <li class="nav-item">
                    <button id="btnToSetting" type="button" class="btn btn-link nav-link active text-white">Settings</button>
                </li>
              </ul>
              <div class="d-flex">
                <button id="btnToLogin2" type="button" class="btn btn-light ms-3 active">Login Second Player</button>
                <button id="btnToLogout" type="button" class="btn btn-light ms-3 active">Logout</button>
                <button id="btnToRegister" type="button" class="btn btn-light ms-3 active">Register</button>
              </div>
              <div class="d-flex">
                <span class="ms-3">${user1.username1}</span>
              </div>
          </div>
      </div>
  </nav>
    `;  
    navbarWrapper.innerHTML = navbar;

    let submitLogin2 = document.querySelector("#btnToLogin2");
    submitLogin2.addEventListener("click", () => {
      Redirect("/login2");
    });
    let submitLogout = document.querySelector("#btnToLogout");
    submitLogout.addEventListener("click", () => {
      Redirect("/logout");
    });
    let submitSettings = document.querySelector("#btnToSetting");
    submitSettings.addEventListener("click", () => {
      Redirect("/settings");
    });
    let submitRegister = document.querySelector("#btnToRegister");
    submitRegister.addEventListener("click", () => {
        Redirect("/register");
    });

  

  } else {
    navbar = `
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container ">
          <button id="btnToHome2" type="button" class="btn btn-link navbar-brand active text-white">JSnake</button>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse text-white navbar-dark" id="navbarNavDropdown">
            <ul class="navbar-nav mx-auto">
                <li class="nav-item">
                    <button id="btnToHome" type="button" class="btn btn-link nav-link active text-white">Home</button>
                </li>
                <li class="nav-item">
                    <button id="btnToTwoPlayer" type="button" class="btn btn-link nav-link active text-white">Two Players</button>
                </li>
                <li class="nav-item">
                    <button id="btnToScoreboards" type="button" class="btn btn-link nav-link active text-white">Scoreboard</button>
                </li>
                <li class="nav-item">
                    <button id="btnToSetting" type="button" class="btn btn-link nav-link active text-white">Settings</button>
                </li>
            </ul>
            <div class="d-flex">
                <button id="btnToLogout" type="button" class="btn btn-light ms-3 active">Logout</button>
            </div>
            <div class="d-flex">
              <span class="ms-3">${user1.username1}</span>
              <span class="ms-3">${user2.username1}</span>
            </div>
          </div>
      </div>
  </nav>
    `;  
    navbarWrapper.innerHTML = navbar;

    let submitLogout = document.querySelector("#btnToLogout");
    submitLogout.addEventListener("click", () => {
      Redirect("/logout");
    });
    let submitSettings = document.querySelector("#btnToSetting");
    submitSettings.addEventListener("click", () => {
      Redirect("/settings");
    });

  }
  

  let submitHome = document.querySelector("#btnToHome");
  submitHome.addEventListener("click", () => {
    Redirect("/");
  });
  let submitHome2 = document.querySelector("#btnToHome2");
  submitHome2.addEventListener("click", () => {
    Redirect("/");
  });
  let submitTwoPlayer = document.querySelector("#btnToTwoPlayer");
  submitTwoPlayer.addEventListener("click", () => {
    Redirect("/twoPlayer");
  });
  let submitScoreboard = document.querySelector("#btnToScoreboards");
  submitScoreboard.addEventListener("click", () => {
    Redirect("/scoreboard");
  });



};

export default Navbar;
