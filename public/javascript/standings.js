// -------------------------- Standings container -------------------------- //

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

function reverseRank(){
  const parent = document.getElementById('tbody');
  const children = Array.from(parent.children);
  children.reverse();
  parent.innerHTML = ""; // clear the parent element
  children.forEach(child => parent.appendChild(child));
}

function alphabeticalOrder(){
  const parent = document.getElementById('tbody');
  const children = Array.from(parent.children);

  // sort the child elements
  children.sort(function(a, b) {
    let nameA = a.querySelector('.name-team').innerText.toUpperCase();
    let nameB = b.querySelector('.name-team').innerText.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  parent.innerHTML = ""; // clear the parent element
  children.forEach(child => parent.appendChild(child));
}

function reverseAlphabeticalOrder(){
  const parent = document.getElementById('tbody');
  const children = Array.from(parent.children);

  // sort the child elements
  children.sort(function(a, b) {
    let nameA = a.querySelector('.name-team').innerText.toUpperCase();
    let nameB = b.querySelector('.name-team').innerText.toUpperCase();
    if (nameA < nameB) {
      return 1;
    }
    if (nameA > nameB) {
      return -1;
    }
    return 0;
  });

  parent.innerHTML = ""; // clear the parent element
  children.forEach(child => parent.appendChild(child));
}

const rankBtn = document.querySelector('.rank-btn');
const pointsBtn = document.querySelector('.points-btn');
const teamBtn = document.querySelector('.team-btn');
rankBtn.addEventListener('click', reverseRank);
pointsBtn.addEventListener('click', reverseRank);

let teamBtnClicked = 0;
teamBtn.addEventListener('click', () => {
  teamBtnClicked++;
  if (teamBtnClicked % 2 == 0) {
    alphabeticalOrder();
  } else {
    reverseAlphabeticalOrder();
  }
});