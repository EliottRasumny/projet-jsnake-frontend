import HomePage from "./HomePage";
import { Redirect } from "../Router/Router";

/**
 * Render the NewPage :
 * Just an example to demonstrate how to use the router to "redirect" to a new page
 */
function ScoreboardSinglePage() {
  // Deal with your NewPage content here
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = "";
  fetch("http://localhost:3000/bestscoressingle") // fetch return a promise => we wait for the response
  .then((response) => {
    if (!response.ok)
      throw new Error(
        "fetch error : " + response.status + " : " + response.statusText
      );
    return response.json(); // json() return a promise => we wait for the response
  })
  .then((scores) => {
    // create a wrapper to provide a responsive table
    const tableWrapper = document.createElement("div");
    tableWrapper.className = "table-responsive pt-5";
    // create an HTMLTableElement dynamically, based on the scores data (Array of Objects)
    const table = document.createElement("table");
    table.className = "table table-danger";
    tableWrapper.appendChild(table);
    // deal with header
    const thead = document.createElement("thead");
    const header = document.createElement("tr");
    thead.appendChild(header);
    const header1 = document.createElement("th");
    header1.innerText = "Score";
    const header2 = document.createElement("th");
    header2.innerText = "Player";
    header.appendChild(header1);
    header.appendChild(header2);
    table.appendChild(thead);
    // deal with data rows for tbody
    const tbody = document.createElement("tbody");
    scores.forEach((score) => {
      const line = document.createElement("tr");
      const scoreCell = document.createElement("td");
      scoreCell.innerText = score.score;
      line.appendChild(scoreCell);
      const playerCell = document.createElement("td");
      scoreCell.innerText = score.id;
      line.appendChild(scoreCell);
      tbody.appendChild(line);
    });
    table.appendChild(tbody);
      // add the HTMLTableElement to the main, within the #page div
      pageDiv.appendChild(tableWrapper);
    })
    .catch((err) => {
      console.error("ScoreBoardSinglePlayerpage::error: ", err);
    });

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
};

export default ScoreboardSinglePage;