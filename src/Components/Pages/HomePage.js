/**
 * Render the HomePage
 */

const HomePage = () => {
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = `<div class="container fixed-">
    <h1 class="m-5">JSnake</h1>
    <button id="btn" class="btn p-3 m-5">1Player</button>
    <button id="btn" class="btn p-3 m-5">2Player</button>
  </div>`;
};

export default HomePage;
