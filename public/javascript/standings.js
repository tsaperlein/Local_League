function straightRank(){
  const parent = document.getElementById('tbody');
  const children = Array.from(parent.children);
  children.sort(function(a, b) {
    let rankA = parseInt(a.querySelector('.rank-td div').innerText);
    let rankB = parseInt(b.querySelector('.rank-td div').innerText);
    if (rankA < rankB) {
      return -1;
    }
    if (rankA > rankB) {
      return 1;
    }
    return 0;
  });

  parent.innerHTML = ""; // clear the parent element
  children.forEach(child => parent.appendChild(child));
}

function reverseRank(){
  const parent = document.getElementById('tbody');
  const children = Array.from(parent.children);
  children.sort(function(a, b) {
    let rankA = parseInt(a.querySelector('.rank-td div').innerText);
    let rankB = parseInt(b.querySelector('.rank-td div').innerText);
    if (rankA < rankB) {
      return 1;
    }
    if (rankA > rankB) {
      return -1;
    }
    return 0;
  });

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

function sortByWins(){
  const parent = document.getElementById('tbody');
  const children = Array.from(parent.children);

  // sort the child elements
  children.sort(function(a, b) {
    let winsA = parseInt(a.getElementsByTagName('td')[3].innerText);
    let winsB = parseInt(b.getElementsByTagName('td')[3].innerText);
    if (winsA < winsB) {
      return -1;
    }
    if (winsA > winsB) {
      return 1;
    }
    return 0;
  });

  parent.innerHTML = ""; // clear the parent element
  children.forEach(child => parent.appendChild(child));
}

function reverseSortByWins(){
  const parent = document.getElementById('tbody');
  const children = Array.from(parent.children);

  // sort the child elements
  children.sort(function(a, b) {
    let winsA = parseInt(a.getElementsByTagName('td')[3].innerText);
    let winsB = parseInt(b.getElementsByTagName('td')[3].innerText);
    if (winsA < winsB) {
      return 1;
    }
    if (winsA > winsB) {
      return -1;
    }
    return 0;
  });

  parent.innerHTML = ""; // clear the parent element
  children.forEach(child => parent.appendChild(child));
}

const rankBtn = document.querySelector('.rank-btn');
let ranked = 0;
rankBtn.addEventListener('click', () => {
  ranked++;
  if (ranked % 2 == 0) {
    straightRank();
  } else {
    reverseRank();
  }
});

const teamBtn = document.querySelector('.team-btn');
let teamBtnClicked = 0;
teamBtn.addEventListener('click', () => {
  teamBtnClicked++;
  if (teamBtnClicked % 2 == 0) {
    alphabeticalOrder();
  } else {
    reverseAlphabeticalOrder();
  }
});

if(window.location.pathname == '/Local-League/standings' || window.location.pathname == '/Local-League/main-page'){
  const pointsBtn = document.querySelector('.points-btn');
  pointsBtn.addEventListener('click', () => {
    ranked++;
    if (ranked % 2 == 0) {
      straightRank();
    }
    else {
      reverseRank();
    }
  });

  const wBtn = document.querySelector('.wins-btn');
  let wBtnClicked = 0;
  wBtn.addEventListener('click', () => {
    wBtnClicked++;
    if (wBtnClicked % 2 == 0) {
      reverseSortByWins();
    } else {
      sortByWins();
    }
  });
}