// -------------------------- Standings container -------------------------- //

// // Function that calculates the rank of each team and sorts them by it
// function sortRanking(teams) {
//   // sort the teams by their rank (in descending order)
//   teams.sort((a, b) => b.points - a.points);
//   teams.forEach((team, index) => {
//     team.rank = index + 1;
//   });
  
//   return teams;
// }

// function reverseRanking(teams) {
//   // sort the teams by their rank (in descending order)
//   teams.sort((a, b) => a.points - b.points);
//   teams.forEach((team, index) => {
//     team.rank = teams.length - index;
//   });
  
//   return teams;
// }

// function rankByGoalsFor(teams){
//   teams = teams.sort(function(a, b) {
//     if(a.goalsFor < b.goalsFor) {
//       return 1;
//     } else if(a.goalsFor == b.goalsFor) {
//         if(a.points < b.points) {
//           return 1;
//         } else {
//           return -1;
//         }
//     } else {
//       return -1;
//     }
//   });
//   teams.forEach((team, index) => {
//     team.rank = index + 1;
//   });
//   return teams;
// }

// function reverseRankByGoalsFor(teams){
//   teams = teams.sort(function(a, b) {
//     if(b.goalsFor < a.goalsFor) {
//       return 1;
//     } else if(a.goalsFor == b.goalsFor) {
//         if(b.points < a.points) {
//           return 1;
//         } else {
//           return -1;
//         }
//     } else {
//       return -1;
//     }
//   });
//   teams.forEach((team, index) => {
//     team.rank = teams.length - index;
//   });
//   return teams;
// }

// function handleHomeWins(teams){
//   for (let i = 0; i < teams.length; i++) {
//     teams[i].homeWins = getRandomInt(1, teams[i].wins - 1);
//   }
//   return teams;
// }

// function handleGuestWins(teams){
//   for (let i = 0; i < teams.length; i++) {
//     teams[i].guestWins = teams[i].wins - teams[i].homeWins;
//   }
//   return teams;
// }

// function rankByHomeWins(teams){
//   teams = teams.sort(function(a, b) {
//     if(a.homeWins < b.homeWins) { 
//       return 1;
//     } else if(a.homeWins == b.homeWins) {
//         if(a.points < b.points) {
//           return 1;
//         } else {
//           return -1;
//         }
//     } else {
//       return -1;
//     }
//   });
//   teams.forEach((team, index) => {
//     team.rank = index + 1;
//   });
//   return teams;
// }

// function rankByGuestWins(teams){
//   teams = teams.sort(function(a, b) {
//     if(a.guestWins < b.guestWins) {
//       return 1;
//     } else if(a.guestWins == b.guestWins) {
//         if(a.points < b.points) {
//           return 1;
//         } else {
//           return -1;
//         }
//     } else {
//       return -1;
//     }
//   });
//   teams.forEach((team, index) => {
//     team.rank = index + 1;
//   });
//   return teams;
// }

// function rankByOverallWins(teams){
//   teams = teams.sort(function(a, b) {
//     if(a.wins < b.wins) {
//       return 1;
//     } else if(a.wins == b.wins) {
//         if(a.points < b.points) {
//           return 1;
//         } else {
//           return -1;
//         }
//     } else {
//       return -1;
//     }
//   });
//   teams.forEach((team, index) => {
//     team.rank = index + 1;
//   });
//   return teams;
// }

// Calculate the points and sort the teams by their rank
// calculatePoints(teamsData);
// teamsData = calculateAndSortRanking(teamsData);
// teamsData = handleHomeWins(teamsData);
// teamsData = handleGuestWins(teamsData);

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

// Get the table element and its head and body
const table = document.getElementById("teams-table");
const tableHead = table.querySelector("thead");

// create table header and append it to the table head
const headerRow = createHeaderRow();
tableHead.appendChild(headerRow);

// For the /main-page select only the first 5 teams in the standings
if (window.location.pathname === "/Local-League/main-page") {
  const tableRows = document.querySelectorAll("tbody tr");
  for (let i = 5; i < tableRows.length; i++) {
    tableRows[i].classList.add("hide");
  }
}

// // Function that sorts the teams by their rank
// let rankBtnClickedCounter = 0;
// const rankBtn = document.querySelector('.rank-btn');
// rankBtn.addEventListener('click', () => {
//   rankBtnClickedCounter++;
//   // sort the teams by their rank (in descending order)
//   if(rankBtnClickedCounter % 2 === 1) {
//     tableBody.innerHTML = '';
//     teamsData = reverseRanking(teamsData);
//   } else {
//     tableBody.innerHTML = '';
//     teamsData = sortRanking(teamsData);
//   }
//   rows = createTableRows(teamsData);
//   rows.forEach((rowHTML) => {
//     const row = document.createElement('tr');
//     row.innerHTML = rowHTML;
//     tableBody.appendChild(row);
//   });
// });

// // Function that sorts the teams by their goals for
// let gfBtnClickedCounter = 0;
// const gfBtn = document.querySelector('.goals-for-btn');
// gfBtn.addEventListener('click', () => {
//   gfBtnClickedCounter++;
//   // sort the teams by their rank (in descending order)
//   if(gfBtnClickedCounter % 2 === 1) {
//     tableBody.innerHTML = '';
//     teamsData = reverseRankByGoalsFor(teamsData);
//   } else {
//     tableBody.innerHTML = '';
//     teamsData = rankByGoalsFor(teamsData);
//   }
//   rows = createTableRows(teamsData);
//   rows.forEach((rowHTML) => {
//     const row = document.createElement('tr');
//     row.innerHTML = rowHTML;
//     tableBody.appendChild(row);
//   });
// });

// // Function that sorts the teams by their name
// let teamBtnClickedCounter = 0;
// const teamBtn = document.querySelector('.team-btn');
// teamBtn.addEventListener('click', () => {
//   teamBtnClickedCounter++;
//   // sort the teams by their name (in ascending order)
//   if(teamBtnClickedCounter % 2 === 1) {
//     tableBody.innerHTML = '';
//     teamsData = teamsData.sort(function(a, b) {
//       if(a.name < b.name) { 
//         return -1; 
//       } else {
//         return 1;
//       }
//     });
//   } else {
//     tableBody.innerHTML = '';
//     teamsData = teamsData.sort(function(a, b) {
//       if(a.name < b.name) { 
//         return -1; 
//       } else {
//         return 1;
//       }
//     }).reverse();
//   }
//   rows = createTableRows(teamsData);
//   rows.forEach((rowHTML) => {
//     const row = document.createElement('tr');
//     row.innerHTML = rowHTML;
//     tableBody.appendChild(row);
//   });
// });

// if (window.location.pathname === "/Local-League/standings"){
//   // Function that sorts the teams by their overall wins
//   const overallBtn = document.querySelector('.overall');
//   overallBtn.addEventListener('click', () => {
//     tableBody.innerHTML = '';
//     teamsData = rankByOverallWins(teamsData);
//     rows = createTableRows(teamsData);
//     rows.forEach((rowHTML) => {
//       const row = document.createElement('tr');
//       row.innerHTML = rowHTML;
//       tableBody.appendChild(row);
//     });
//   });

//   // Function that sorts the teams by their home wins
//   const homeBtn = document.querySelector('.home');
//   homeBtn.addEventListener('click', () => {
//     tableBody.innerHTML = '';
//     teamsData = rankByHomeWins(teamsData);
//     rows = createTableRows(teamsData);
//     rows.forEach((rowHTML) => {
//       const row = document.createElement('tr');
//       row.innerHTML = rowHTML;
//       tableBody.appendChild(row);
//     });
//   });

//   // Function that sorts the teams by their away wins
//   const guestBtn = document.querySelector('.guest');
//   guestBtn.addEventListener('click', () => {
//     tableBody.innerHTML = '';
//     teamsData = rankByGuestWins(teamsData);
//     rows = createTableRows(teamsData);
//     rows.forEach((rowHTML) => {
//       const row = document.createElement('tr');
//       row.innerHTML = rowHTML;
//       tableBody.appendChild(row);
//     });
//   });
// }