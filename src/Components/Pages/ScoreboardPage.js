import HomePage from "./HomePage";
import { Redirect } from "../Router/Router";

function ScoreboardPage() {
    const pageDiv = document.querySelector("#page");
    pageDiv.innerHTML = `<div class="container">
                            <div class="row">
                                <div class="col" id="col1"> <h6 class="display-6 m-4"> Single Player </h6> </div>
                                <div class="col" id="col2"> <h6 class="display-6 m-4"> Two Players </h6> </div>
                            </div>
                        </div>`;
    ScoreboardSingleTable();
    ScoreboardCoopTable();
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

/**
 * ScoreboardSingle :
 */
 function ScoreboardSingleTable() {
    const col = document.querySelector("#col1");
    fetch("api/single/bestscoressingle") // fetch return a promise => we wait for the response
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
      table.className = "table";
      tableWrapper.appendChild(table);
      // deal with header
      const thead = document.createElement("thead");
      const header = document.createElement("tr");
      thead.appendChild(header);
      const header1 = document.createElement("th");
      header1.innerText = "Score";
      header1.scope="col";
      const header2 = document.createElement("th");
      header2.innerText = "Player";
      header1.scope="col";
      header.appendChild(header1);
      header.appendChild(header2);
      table.appendChild(thead);
      // deal with data rows for tbody
      const tbody = document.createElement("tbody");
      scores.forEach((score) => {
        const line = document.createElement("tr");
        line.scope="row";
        const scoreCell = document.createElement("td");
        scoreCell.innerText = score.score;
        line.appendChild(scoreCell);
        const playerCell = document.createElement("td");
        playerCell.innerText = score.username;
        line.appendChild(playerCell);
        tbody.appendChild(line);
      });
      table.appendChild(tbody);
        // add the HTMLTableElement to the main, within the #page div
        col.appendChild(tableWrapper);
      })
      .catch((err) => {
        console.error("ScoreBoardSinglePlayerpage::error: ", err);
      });
  };

/**
 * ScoreboardTwoPlayers:
 */
 function ScoreboardCoopTable() {
  const col = document.querySelector("#col2");
  fetch("api/coop/bestscorescoop") // fetch return a promise => we wait for the response
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
    table.className = "table";
    tableWrapper.appendChild(table);
    // deal with header
    const thead = document.createElement("thead");
    const header = document.createElement("tr");
    thead.appendChild(header);
    const header1 = document.createElement("th");
    header1.innerText = "Score";
    header1.scope="col";
    const header2 = document.createElement("th");
    header2.innerText = "Player 1";
    const header3 = document.createElement("th");
    header3.innerText = "Player 2";
    header1.scope="col";
    header.appendChild(header1);
    header.appendChild(header2);
    header.appendChild(header3);
    table.appendChild(thead);
    // deal with data rows for tbody
    const tbody = document.createElement("tbody");
    scores.forEach((score) => {
      const line = document.createElement("tr");
      line.scope="row";
      const scoreCell = document.createElement("td");
      scoreCell.innerText = score.score;
      line.appendChild(scoreCell);
      const player1Cell = document.createElement("td");
      player1Cell.innerText = score.username1;
      line.appendChild(player1Cell);
      const player2Cell = document.createElement("td");
      player2Cell.innerText = score.username2;
      line.appendChild(player2Cell);
      tbody.appendChild(line);
    });
    table.appendChild(tbody);
      // add the HTMLTableElement to the main, within the #page div
      col.appendChild(tableWrapper);
    })
    .catch((err) => {
      console.error("ScoreBoardSinglePlayerpage::error: ", err);
    });
};

export default ScoreboardPage;