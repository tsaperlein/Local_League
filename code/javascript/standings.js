let teamsData = [
    { name: "AEK", image: "aek.png", matches: 27, wins: 19, draws: 3, losses: 5, points: 60 },
    { name: "Panathinaikos", image: "pao.png", matches: 26, wins: 16, draws: 8, losses: 2, points: 59 },
    { name: "Olympiakos", image: "osfp.png", matches: 25, wins: 14, draws: 9, losses: 2, points: 57 },
    { name: "PAOK", image: "paok.png", matches: 24, wins: 14, draws: 8, losses: 2, points: 59 },
    { name: "Team5", image: "home-team.png", matches: 23, wins: 11, draws: 9, losses: 3, points: 57 },
    { name: "Team6", image: "away-team.png", matches: 22, wins: 10, draws: 4, losses: 8, points: 59 },
    { name: "Team7", image: "team7.png", matches: 21, wins: 1, draws: 10, losses: 10, points: 57 },
];

function calculatePoints(teams) {
  for (let i = 0; i < teams.length; i++) {
    const team = teams[i];
    const points = team.wins * 3 + team.draws;
    team.points = points;
  }
}

// Define a function to generate random integers within a range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Loop through the teamsData array and add random goal data
for (let i = 0; i < teamsData.length; i++) {
  const team = teamsData[i];

  // Generate random goal data
  const goalsFor = getRandomInt(30, 80);
  const goalsAgainst = getRandomInt(20, 60);
  const goalDifference = goalsFor - goalsAgainst;

  // Add the goal data to the team object
  team.goalsFor = goalsFor;
  team.goalsAgainst = goalsAgainst;
  team.goalDifference = goalDifference;
}

calculatePoints(teamsData);

function calculateAndSortRanking(teams) {
  // calculate the rank of each team
  for (let i = 0; i < teams.length; i++) {
    let rank = 1;
    for (let j = 0; j < teams.length; j++) {
      if (teams[j].points > teams[i].points) {
        rank++;
      }
    }
    teams[i].rank = rank;
  }

  // sort the teams by their rank (in descending order)
  teams.sort((a, b) => b.points - a.points);

  return teams;
}

// calculate the rank of each team and sort them by it
teamsData = calculateAndSortRanking(teamsData);

function createHeaderRow() {
  const headerRow = document.createElement("tr");
  const rankHeader = document.createElement("th");
  const teamHeader = document.createElement("th");
  const matchesHeader = document.createElement("th");
  const wHeader = document.createElement("th");
  const dHeader = document.createElement("th");
  const lHeader = document.createElement("th");
  const gfHeader = document.createElement("th");
  const gaHeader = document.createElement("th");
  const gdHeader = document.createElement("th");
  const ptsHeader = document.createElement("th");

  rankHeader.innerHTML = "<a class='rank-btn'><span>Rank #</span></a>";
  teamHeader.innerHTML = "Team";
  matchesHeader.innerHTML = "Matches";
  wHeader.innerHTML = "W";
  dHeader.innerHTML = "D";
  lHeader.innerHTML = "L";
  gfHeader.innerHTML = "GF";
  gaHeader.innerHTML = "GA";
  gdHeader.innerHTML = "GD";
  ptsHeader.innerHTML = "PTS";

  headerRow.appendChild(rankHeader);
  headerRow.appendChild(teamHeader);
  headerRow.appendChild(matchesHeader);
  headerRow.appendChild(wHeader);
  headerRow.appendChild(dHeader);
  headerRow.appendChild(lHeader);
  headerRow.appendChild(gfHeader);
  headerRow.appendChild(gaHeader);
  headerRow.appendChild(gdHeader);
  headerRow.appendChild(ptsHeader);

  return headerRow;
}

function createTableRows(teamsData) {
    let tableRows = [];

    // Loop through each team data object and create a table row for it
    teamsData.forEach((teamData, index) => {
        tableRows.push(`
            <tr>
                <td>
                    <div class="rank${index + 1}">
                        ${index + 1}.
                    </div>
                </td>
                <td>
                    <div class="team">
                        <a href="teams.html">
                            <img src="../../images/${teamData.image}" alt="">
                        </a>
                        <div class="team-name">
                            ${teamData.name}
                        </div>
                    </div>
                </td>
                <td>
                    <div class="matches">
                        ${teamData.matches}
                    </div>
                </td>
                <td>${teamData.wins}</td>
                <td>${teamData.draws}</td>
                <td>${teamData.losses}</td>
                <td>${teamData.goalsFor}</td>
                <td>${teamData.goalsAgainst}</td>
                <td>${teamData.goalDifference}</td>
                <td>${teamData.points}</td>
            </tr>
        `);
    });
    return tableRows;
}

// get the table and its head and body elements
const table = document.getElementById("teams-table");
const tableHead = table.querySelector("thead");
const tableBody = table.querySelector("tbody");

// create table header and append it to the table head
const headerRow = createHeaderRow();
tableHead.appendChild(headerRow);

// create table rows and append them to the table body
const rows = createTableRows(teamsData);
rows.forEach((rowHTML) => {
    const row = document.createElement('tr');
    row.innerHTML = rowHTML;
    tableBody.appendChild(row);
    console.log(row);
});

console.log(table);







const btnEls = document.querySelectorAll('.standings-choice-buttons-group-button');   // get the button element

btnEls.forEach(btnEl => {
    btnEl.addEventListener('mouseover', (event) => { // when the mouse is over the button
        const x = (event.pageX - btnEl.offsetLeft); // get the x position
        const y = (event.pageY - btnEl.offsetTop);  // get the y position

        btnEl.style.setProperty('--xPos', x + 'px'); // set the x position
        btnEl.style.setProperty('--yPos', y + 'px'); // set the y position
    });
});