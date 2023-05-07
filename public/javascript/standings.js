// -------------------------- Standings container -------------------------- //
// Data for the teams
let teamsData = [
  { name: "AEK", logo: "aek.png", matches: 27, wins: 19, draws: 3, losses: 5, points: 60 },
  { name: "Panathinaikos", logo: "pao.png", matches: 27, wins: 16, draws: 8, losses: 2, points: 59 },
  { name: "Olympiakos", logo: "osfp.png", matches: 27, wins: 14, draws: 9, losses: 2, points: 57 },
  { name: "PAOK", logo: "paok.png", matches: 27, wins: 14, draws: 8, losses: 2, points: 59 },
  { name: "Team5", logo: "home-team.png", matches: 27, wins: 11, draws: 9, losses: 3, points: 57 },
  { name: "Team6", logo: "away-team.png", matches: 27, wins: 10, draws: 4, losses: 8, points: 59 },
  { name: "Team7", logo: "team7.png", matches: 27, wins: 1, draws: 10, losses: 10, points: 57 },
  { name: "Napoli", logo: "napoli.png", matches: 27, wins: 1, draws: 10, losses: 10, points: 59 },
  { name: "Barcelona", logo: "barc.png", matches: 27, wins: 1, draws: 10, losses: 10, points: 57 },
  { name: "Juventus", logo: "juve.png", matches: 27, wins: 1, draws: 10, losses: 10, points: 59 },
  { name: "PSG", logo: "psg.png", matches: 27, wins: 1, draws: 10, losses: 10, points: 57 },
  { name: "Arsenal", logo: "arsenal.png", matches: 27, wins: 1, draws: 10, losses: 10, points: 59 },
  { name: "Fenerbache", logo: "fener.png", matches: 27, wins: 1, draws: 10, losses: 10, points: 57 },
  { name: "Liverpool", logo: "live.png", matches: 27, wins: 1, draws: 10, losses: 10, points: 59 },
  { name: "Porto", logo: "porto.png", matches: 27, wins: 1, draws: 10, losses: 10, points: 57 },
];

// Function that calculates the points for each team
function calculatePoints(teams) {
  for (let i = 0; i < teams.length; i++) {
    const team = teams[i];
    const points = team.wins * 3 + team.draws;
    team.points = points;
  }
}

// Functon that returns a random integer between min and max (both included)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function that generates random goal data for each team
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

// Function that calculates the rank of each team and sorts them by it
function calculateAndSortRanking(teams) {
  // sort the teams by their rank (in descending order)
  teams.sort((a, b) => b.points - a.points);
  teams.forEach((team, index) => {
    team.rank = index + 1;
  });
  
  return teams;
}

function reverseRanking(teams) {
  // sort the teams by their rank (in descending order)
  teams.sort((a, b) => a.points - b.points);
  teams.forEach((team, index) => {
    team.rank = teams.length - index;
  });
  
  return teams;
}

function rankByGoalsFor(teams){
  teams = teams.sort(function(a, b) {
    if(a.goalsFor < b.goalsFor) {
      return 1;
    } else if(a.goalsFor == b.goalsFor) {
        if(a.points < b.points) {
          return 1;
        } else {
          return -1;
        }
    } else {
      return -1;
    }
  });
  teams.forEach((team, index) => {
    team.rank = index + 1;
  });
  return teams;
}

function reverseRankByGoalsFor(teams){
  teams = teams.sort(function(a, b) {
    if(b.goalsFor < a.goalsFor) {
      return 1;
    } else if(a.goalsFor == b.goalsFor) {
        if(b.points < a.points) {
          return 1;
        } else {
          return -1;
        }
    } else {
      return -1;
    }
  });
  teams.forEach((team, index) => {
    team.rank = teams.length - index;
  });
  return teams;
}

function handleHomeWins(teams){
  for (let i = 0; i < teams.length; i++) {
    teams[i].homeWins = getRandomInt(1, teams[i].wins - 1);
  }
  return teams;
}

function handleGuestWins(teams){
  for (let i = 0; i < teams.length; i++) {
    teams[i].guestWins = teams[i].wins - teams[i].homeWins;
  }
  return teams;
}

function rankByHomeWins(teams){
  teams = teams.sort(function(a, b) {
    if(a.homeWins < b.homeWins) { 
      return 1;
    } else if(a.homeWins == b.homeWins) {
        if(a.points < b.points) {
          return 1;
        } else {
          return -1;
        }
    } else {
      return -1;
    }
  });
  teams.forEach((team, index) => {
    team.rank = index + 1;
  });
  return teams;
}

function rankByGuestWins(teams){
  teams = teams.sort(function(a, b) {
    if(a.guestWins < b.guestWins) {
      return 1;
    } else if(a.guestWins == b.guestWins) {
        if(a.points < b.points) {
          return 1;
        } else {
          return -1;
        }
    } else {
      return -1;
    }
  });
  teams.forEach((team, index) => {
    team.rank = index + 1;
  });
  return teams;
}

function rankByOverallWins(teams){
  teams = teams.sort(function(a, b) {
    if(a.wins < b.wins) {
      return 1;
    } else if(a.wins == b.wins) {
        if(a.points < b.points) {
          return 1;
        } else {
          return -1;
        }
    } else {
      return -1;
    }
  });
  teams.forEach((team, index) => {
    team.rank = index + 1;
  });
  return teams;
}

// Calculate the points and sort the teams by their rank
calculatePoints(teamsData);
teamsData = calculateAndSortRanking(teamsData);
teamsData = handleHomeWins(teamsData);
teamsData = handleGuestWins(teamsData);

// Function that creates the table header row
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

  rankHeader.innerHTML = "<a class='header-button rank-btn'>Rank &nbsp;<i class='fa fa-sort'></i></a>";
  teamHeader.innerHTML = "<a class='header-button team-btn'>Team &nbsp;<i class='fa fa-sort'></i></a>";
  matchesHeader.innerHTML = "<a class='header-button matches-btn'>Matches &nbsp;</a>";
  wHeader.innerHTML = "<a class='header-button wins-btn'>W &nbsp;<i class='fa fa-sort'></i></a>";
  dHeader.innerHTML = "<a class='header-button draws-btn'>D &nbsp;<i class='fa fa-sort'></i></a>";
  lHeader.innerHTML = "<a class='header-button losses-btn'>L &nbsp;<i class='fa fa-sort'></i></a>";
  gfHeader.innerHTML = "<a class='header-button goals-for-btn'>GF &nbsp;<i class='fa fa-sort'></i></a>";
  gaHeader.innerHTML = "<a class='header-button goals-against-btn'>GA &nbsp;<i class='fa fa-sort'></i></a>";
  gdHeader.innerHTML = "<a class='header-button goal-diff-btn'>GD &nbsp;<i class='fa fa-sort'></i></a>";
  ptsHeader.innerHTML = "<a class='header-button points-btn'>PTS &nbsp;<i class='fa fa-sort'></i></a>";

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

  rankHeader.classList.add('sticky-rank');
  teamHeader.classList.add('team-th', 'sticky-team');
  ptsHeader.classList.add('sticky-points');

  return headerRow;
}

// Function that creates the table rows for each team
function createTableRows(teamsData) {
    let tableRows = [];

    teamsData.forEach((teamData, index) => {
        const teamRow = document.createElement("tr");
        const rankCell = document.createElement("td");
        const teamCell = document.createElement("td");
        const matchesCell = document.createElement("td");
        const winsCell = document.createElement("td");
        const drawsCell = document.createElement("td");
        const losesCell = document.createElement("td");
        const gfCell = document.createElement("td");
        const gaCell = document.createElement("td");
        const gdCell = document.createElement("td");
        const ptsCell = document.createElement("td");

        const rank = teamData.rank;
        const teamLogoSrc = teamData.logo;
        const teamName = teamData.name;
        const matches = teamData.matches;
        const wins = teamData.wins;
        const draws = teamData.draws;
        const loses = teamData.losses;
        const goalsFor = teamData.goalsFor;
        const goalsAgainst = teamData.goalsAgainst;
        const goalDiff = teamData.goalDifference;
        const points = teamData.points;
      
        rankCell.innerHTML = `<div class="ranking${rank}">${rank}</div>`;
        teamCell.innerHTML = `<div class="team container"><a class="logo-team" href="/teams?team=${teamName}"><img src="../../team-icons/${teamLogoSrc}" alt="${teamName}"></a><a class="name-team" href="/teams?team=${teamName}">${teamName}</a></div>`;
        matchesCell.textContent = matches;
        winsCell.textContent = wins;
        drawsCell.textContent = draws;
        losesCell.textContent = loses;
        gfCell.textContent = goalsFor;
        gaCell.textContent = goalsAgainst;
        gdCell.textContent = goalDiff;
        ptsCell.textContent = points;

        rankCell.classList.add('rank-td');
        teamCell.classList.add('team-td');
        ptsCell.classList.add('points-td');
      
        teamRow.appendChild(rankCell);
        teamRow.appendChild(teamCell);
        teamRow.appendChild(matchesCell);
        teamRow.appendChild(winsCell);
        teamRow.appendChild(drawsCell);
        teamRow.appendChild(losesCell);
        teamRow.appendChild(gfCell);
        teamRow.appendChild(gaCell);
        teamRow.appendChild(gdCell);
        teamRow.appendChild(ptsCell);
      
        tableRows.push(teamRow.innerHTML);
    });
    return tableRows;
}

// Get the table element and its head and body
const table = document.getElementById("teams-table");
const tableHead = table.querySelector("thead");
const tableBody = table.querySelector("tbody");

// create table header and append it to the table head
const headerRow = createHeaderRow();
tableHead.appendChild(headerRow);

// create table rows and append them to the table body
let rows = createTableRows(teamsData);
rows.forEach((rowHTML) => {
    const row = document.createElement('tr');
    row.innerHTML = rowHTML;
    tableBody.appendChild(row);
});

// For the /main-page select only the first 5 teams in the standings
if (window.location.pathname === "/Local-League/main-page") {
  const tableRows = document.querySelectorAll("tbody tr");
  for (let i = 5; i < tableRows.length; i++) {
    tableRows[i].classList.add("hide");
  }
}

// Function that sorts the teams by their rank
let rankBtnClickedCounter = 0;
const rankBtn = document.querySelector('.rank-btn');
rankBtn.addEventListener('click', () => {
  rankBtnClickedCounter++;
  // sort the teams by their rank (in descending order)
  if(rankBtnClickedCounter % 2 === 1) {
    tableBody.innerHTML = '';
    teamsData = reverseRanking(teamsData);
  } else {
    tableBody.innerHTML = '';
    teamsData = calculateAndSortRanking(teamsData);
  }
  rows = createTableRows(teamsData);
  rows.forEach((rowHTML) => {
    const row = document.createElement('tr');
    row.innerHTML = rowHTML;
    tableBody.appendChild(row);
  });
});

// Function that sorts the teams by their goals for
let gfBtnClickedCounter = 0;
const gfBtn = document.querySelector('.goals-for-btn');
gfBtn.addEventListener('click', () => {
  gfBtnClickedCounter++;
  // sort the teams by their rank (in descending order)
  if(gfBtnClickedCounter % 2 === 1) {
    tableBody.innerHTML = '';
    teamsData = reverseRankByGoalsFor(teamsData);
  } else {
    tableBody.innerHTML = '';
    teamsData = rankByGoalsFor(teamsData);
  }
  rows = createTableRows(teamsData);
  rows.forEach((rowHTML) => {
    const row = document.createElement('tr');
    row.innerHTML = rowHTML;
    tableBody.appendChild(row);
  });
});

// Function that sorts the teams by their name
let teamBtnClickedCounter = 0;
const teamBtn = document.querySelector('.team-btn');
teamBtn.addEventListener('click', () => {
  teamBtnClickedCounter++;
  // sort the teams by their name (in ascending order)
  if(teamBtnClickedCounter % 2 === 1) {
    tableBody.innerHTML = '';
    teamsData = teamsData.sort(function(a, b) {
      if(a.name < b.name) { 
        return -1; 
      } else {
        return 1;
      }
    });
  } else {
    tableBody.innerHTML = '';
    teamsData = teamsData.sort(function(a, b) {
      if(a.name < b.name) { 
        return -1; 
      } else {
        return 1;
      }
    }).reverse();
  }
  rows = createTableRows(teamsData);
  rows.forEach((rowHTML) => {
    const row = document.createElement('tr');
    row.innerHTML = rowHTML;
    tableBody.appendChild(row);
  });
});

if (window.location.pathname === "/Local-League/standings"){
  // Function that sorts the teams by their overall wins
  const overallBtn = document.querySelector('.overall');
  overallBtn.addEventListener('click', () => {
    tableBody.innerHTML = '';
    teamsData = rankByOverallWins(teamsData);
    rows = createTableRows(teamsData);
    rows.forEach((rowHTML) => {
      const row = document.createElement('tr');
      row.innerHTML = rowHTML;
      tableBody.appendChild(row);
    });
  });

  // Function that sorts the teams by their home wins
  const homeBtn = document.querySelector('.home');
  homeBtn.addEventListener('click', () => {
    tableBody.innerHTML = '';
    teamsData = rankByHomeWins(teamsData);
    rows = createTableRows(teamsData);
    rows.forEach((rowHTML) => {
      const row = document.createElement('tr');
      row.innerHTML = rowHTML;
      tableBody.appendChild(row);
    });
  });

  // Function that sorts the teams by their away wins
  const guestBtn = document.querySelector('.guest');
  guestBtn.addEventListener('click', () => {
    tableBody.innerHTML = '';
    teamsData = rankByGuestWins(teamsData);
    rows = createTableRows(teamsData);
    rows.forEach((rowHTML) => {
      const row = document.createElement('tr');
      row.innerHTML = rowHTML;
      tableBody.appendChild(row);
    });
  });
}