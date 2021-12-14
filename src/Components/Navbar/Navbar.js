// When using Bootstrap to style components, the CSS is imported in index.js
// However, the JS has still to be loaded for each Bootstrap's component that needs it.
// Here, because our JS component 'Navbar' has the same name as Navbar Bootstrap's component
// we change the name of the imported Bootstrap's 'Navbar' component
import { Navbar as BootstrapNavbar} from "bootstrap";

/**
 * Render the Navbar which is styled by using Bootstrap
 * Each item in the Navbar is tightly coupled with the Router configuration :
 * - the URI associated to a page shall be given in the attribute "data-uri" of the Navbar
 * - the router will show the Page associated to this URI when the user click on a nav-link
 */

const Navbar = () => {
  const navbarWrapper = document.querySelector("#navbarWrapper");
  let navbar = `
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container ">
        <a class="navbar-brand text-white" href="/">JSnake</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse text-white navbar-dark" id="navbarNavDropdown">
            <ul class="navbar-nav mx-auto">
                <li class="nav-item">
                    <a class="nav-link active  text-white" href="/">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link  text-white" href="/single">Single Player</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link  text-white" href="/twoPlayer">Two Player</a>
                </li>
                
                <li class="nav-item">
                    <a class="nav-link  text-white" href="/scoreboard">Scoreboard</a>
                </li>
            </ul>
            <div class="d-flex">
                <a class="nav-link" href="/login"><button class="btn btn-light ms-3">Login</button></a>
                <a class="nav-link" href="/register"><button class="btn btn-light ms-3">Register</button></a>
            </div>
        </div>
    </div>
</nav>
  `;  
  navbarWrapper.innerHTML = navbar;
};

export default Navbar;
