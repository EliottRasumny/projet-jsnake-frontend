/**
 * Render the HomePage
 */

const HomePage = () => { 
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = `<h1 class="m-5">JSnake</h1><button class="btn btn-outline-success m-5">1Player</button>`;
};

export default HomePage;
