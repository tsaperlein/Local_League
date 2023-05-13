// const matchesData = [
//     { date: 'Sunday March 26', state: 'Upcoming', homeTeam: 'PAO', homeTeamLogo: '/team-icons/pao.png', awayTeam: 'AEK', awayTeamLogo: '/team-icons/aek.png', startTime: '18:00', field: 'Γήπεδο Αγιά Σοφιά', referees: ['John Smith (main)', 'George Brown (assistant)'] },
// ];

// const finalMatchesContainer = document.getElementById('final-matches-container');
// const upcomingMatchesContainer = document.getElementById('upcoming-matches-container');

// // Group matches by date and state
// const matchesByStateAndDate = matchesData.reduce((groups, match) => {
//   const state = match.state;
//   const date = match.date;
//   groups[state] = groups[state] || {};
//   groups[state][date] = groups[state][date] || [];
//   groups[state][date].push(match);
//   return groups;
// }, {});

// function matchHtml(match) {
//     const homeScoreClass = match.homeScore > match.awayScore ? 'winning-score' : 'losing-score';
//     const awayScoreClass = match.awayScore > match.homeScore ? 'winning-score' : 'losing-score';

//     const matchHtml = `
//         <div class="match-information d-flex flex-row align-items-center">
//             <div class="current-state">
//                 <li class="d-flex align-items-center">${match.state}</li>
//             </div>
//             <div class="teams-score d-flex flex-row justify-content-center justify-items-center">
//                 <label class="team-name d-flex align-items-center" for="home-team">${match.homeTeam}</label>
//                 <div class="team d-flex flex-row">
//                     <img class="home-team" src="${match.homeTeamLogo}" alt="Home Team">
//                 </div>
//                 ${match.state === "Upcoming" ? `
//                 <div class="match-time d-flex flex-row justify-content-center align-items-center list-unstyled">
//                     <li>${match.startTime}</li>
//                 </div>` : `
//                 <div class="score d-flex justif-content-center align-items-center">
//                     <li class="score ${homeScoreClass}">${match.homeScore}</li>
//                     <div class="line"></div>
//                     <li class="score ${awayScoreClass}">${match.awayScore}</li>
//                 </div>
//                 `}
//                 <div class="team d-flex flex-row">
//                     <img class="away-team" src="${match.awayTeamLogo}" alt="Away Team">
//                 </div>
//                 <label class="team-name d-flex align-items-center" for="away-team">${match.awayTeam}</label>
//             </div>
//             <div class="extra-information d-flex align-items-center">
//                 <ul class="list-unstyled d-flex flex-column justify-content-cente">
//                     <li class="field-name">${match.field}</li>
//                     ${match.referees.map(referee => `<li class="referee">${referee}</li>`).join('')}
//                 </ul>
//             </div>
//         </div>
//     `;

//     return matchHtml;
// }

// // Generate HTML code for final matches
// if (matchesByStateAndDate['Final']) {
//     for (const date in matchesByStateAndDate['Final']) {
//         const dateElement = document.createElement('div');
//         dateElement.classList.add('match-date');
//         dateElement.innerHTML = `<li>${date}</li>`;

//         const finalMatches = matchesByStateAndDate['Final'][date];
//         const finalMatchesWrapper = document.createElement('div');
//         finalMatchesWrapper.classList.add('matches-wrapper');
//         finalMatches.forEach((match, index) => {
//             const matchElement = document.createElement('div');
//             matchElement.classList.add('match', 'final-match');
//             if (index < finalMatches.length - 1) {
//                 matchElement.classList.add('bordered-bottom');
//             } else {
//                 matchElement.classList.add('margin-bottom-none');
//             }
//             matchElement.innerHTML = matchHtml(match);
//             finalMatchesContainer.appendChild(dateElement);
//             finalMatchesWrapper.appendChild(matchElement);
//         });
//         finalMatchesContainer.appendChild(finalMatchesWrapper);
//     }
// }
// // Generate HTML code for upcoming matches
// if (matchesByStateAndDate['Upcoming']) {
//     for (const date in matchesByStateAndDate['Upcoming']) {
//         const dateElement = document.createElement('div');
//         dateElement.classList.add('match-date');
//         dateElement.innerHTML = `<li>${date}</li>`;

//         const upcomingMatches = matchesByStateAndDate['Upcoming'][date];
//         const upcomingMatchesWrapper = document.createElement('div');
//         upcomingMatchesWrapper.classList.add('matches-wrapper');
//         upcomingMatches.forEach((match, index) => {
//             const matchElement = document.createElement('div');
//             matchElement.classList.add('match', 'upcoming-match');
//             if (index < upcomingMatches.length - 1) {
//                 matchElement.classList.add('bordered-bottom');
//             } else {
//                 matchElement.classList.add('margin-bottom-none');
//             }
//             matchElement.innerHTML = matchHtml(match);
//             upcomingMatchesContainer.appendChild(dateElement);
//             upcomingMatchesWrapper.appendChild(matchElement);
//         });
//         upcomingMatchesContainer.appendChild(upcomingMatchesWrapper);
//     }
// }

const goal_url = 'https://ssl.gstatic.com/onebox/sports/game_feed/goal_icon.svg';
const red_card_url = 'https://ssl.gstatic.com/onebox/sports/soccer_timeline/red-card-right.svg';
const yellow_card_url = 'https://ssl.gstatic.com/onebox/sports/soccer_timeline/yellow-card-right.svg';

const matchStats = {
    match1: {
        homeTeam: 'AEK',
        awayTeam: 'PAO',
        stats: [
            { team: 'home', player: 'Mpelmpas', time: '45', type: 'goal' },
            { team: 'home', player: 'Mpelmpas', time: '60', type: 'goal' },
            { team: 'away', player: 'Efthymiou', time: '70', type: 'goal' },
            { team: 'away', player: 'Nikolaou', time: '80', type: 'goal' },
            { team: 'home', player: 'Mpelmpas', time: '30', type: 'yellow-card' },
            { team: 'away', player: 'Efthymiou', time: '40', type: 'yellow-card' },
            { team: 'away', player: 'Nikolaou', time: '70', type: 'red-card' },
        ]
    }
};


// Add all the stats to an array, but sorted by time
const allStats = [];
for (const match in matchStats) {
    matchStats[match].stats.forEach(stat => {
        allStats.push(stat);
    });
}
allStats.sort((a, b) => a.time - b.time);

// When the user clicks on a match that is final show the match details in a modal
const finalMatch = document.querySelectorAll('.final-match');
finalMatch.forEach(match => {
    match.addEventListener('click', () => {
        // Create a modal for the match details
        const modal = document.createElement('div');
        modal.classList.add('modal', 'd-flex', 'justify-content-center', 'align-items-center');
        modal.setAttribute('id', 'match-details-modal');
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-btn">x</span>
                <div class="modal-header"></div>
                <div class="modal-body"></div>
            </div>
        `;
        document.body.appendChild(modal);

        const closeBtn = modal.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            modal.remove();
            document.body.style.overflow = 'visible';
        });
        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.remove();
                document.body.style.overflow = 'visible';
            }
        });
        
        if (modal) {
            document.body.style.overflow = 'hidden';
            addStatistics();
        }
    });
});

function addStatistics() {
    // Add the team names and the h3 element for time in the modal header
    let modalHeader = document.querySelector('.modal-header');
    let homeTeam = document.createElement('div');
    let homeTeamName = document.createElement('h2');
    let homeTeamLogo = document.createElement('img');
    let time = document.createElement('h3');
    let awayTeam = document.createElement('div');
    let awayTeamLogo = document.createElement('img');
    let awayTeamName = document.createElement('h2');
    modalHeader.classList.add('d-flex', 'justify-content-between', 'align-items-center');
    homeTeamLogo.classList.add('team-logo');
    awayTeamLogo.classList.add('team-logo');
    homeTeam.classList.add('logo-name', 'd-flex', 'flex-row', 'justify-content-start', 'align-items-center', 'col-5');
    awayTeam.classList.add('logo-name', 'd-flex', 'flex-row', 'justify-content-end', 'align-items-center', 'col-5');

    homeTeamName.innerHTML = matchStats.match1.homeTeam;
    homeTeamLogo.setAttribute('src', '/team-icons/aek.png');
    time.innerHTML = 'Time';
    awayTeamName.innerHTML = matchStats.match1.awayTeam;
    awayTeamLogo.setAttribute('src', '/team-icons/pao.png');

    homeTeam.appendChild(homeTeamName);
    homeTeam.appendChild(homeTeamLogo);
    awayTeam.appendChild(awayTeamLogo);
    awayTeam.appendChild(awayTeamName);

    modalHeader.appendChild(homeTeam);
    modalHeader.appendChild(time);
    modalHeader.appendChild(awayTeam);

    // Fill the modal body with the match details
    let modalBody = document.querySelector('.modal-body');
    let matchDetails = document.createElement('div');
    matchDetails.classList.add('match-details');
    // Create the grid for the match details depending on the number of goals and cards for both teams
    let numberOfStats = allStats.length;

    for (let i = 0; i < numberOfStats; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        row.innerHTML = `
            <div class="ht-player col-4">
                <div class="home-team-player"></div>
            </div>
            <div class="stat-time col-4">
                <div class="stat-and-time">
                    <div class="home-stat col-4"></div>
                    <div class="time col-4"></div>
                    <div class="away-stat col-4"></div>
                </div>
            </div>
            <div class="at-player col-4">
                <div class="away-team-player"></div>
            </div>
        `;
        let homeTeamPlayer = row.querySelector('.home-team-player');
        let statAndTime = row.querySelector('.stat-and-time');
        let homeStat = row.querySelector('.home-stat');
        let time = row.querySelector('.time');
        let awayStat = row.querySelector('.away-stat');
        let awayTeamPlayer = row.querySelector('.away-team-player');

        if (allStats[i].team === 'home') {
            homeTeamPlayer.innerHTML = allStats[i].player;
            if (allStats[i].type === 'goal') {
                homeStat.innerHTML = '<img src="' + goal_url + '" alt="goal">';
            } else if (allStats[i].type === 'yellow-card') {
                homeStat.innerHTML = '<img src="' + yellow_card_url + '" alt="yellow card">';
            } else {
                homeStat.innerHTML = '<img src="' + red_card_url + '" alt="red card">';
            }
            time.innerHTML = allStats[i].time+ "'";
            awayStat.innerHTML = '';
            awayTeamPlayer.innerHTML = '';
        } else {
            awayTeamPlayer.innerHTML = allStats[i].player;
            if (allStats[i].type === 'goal') {
                awayStat.innerHTML = '<img src="' + goal_url + '" alt="goal">';
            } else if (allStats[i].type === 'yellow-card') {
                awayStat.innerHTML = '<img src="' + yellow_card_url + '" alt="yellow card">';
            } else {
                awayStat.innerHTML = '<img src="' + red_card_url + '" alt="red card">';
            }
            time.innerHTML = allStats[i].time + "'";
            homeStat.innerHTML = '';
            homeTeamPlayer.innerHTML = '';
        }

        statAndTime.appendChild(homeStat);
        statAndTime.appendChild(time);
        statAndTime.appendChild(awayStat);
        matchDetails.appendChild(row);
        modalBody.appendChild(matchDetails);
    }
}

const matchDates = {};

document.querySelectorAll('.match-date').forEach(matchDate => {
  const date = matchDate.textContent;
  if (matchDates[date]) {
    matchDate.remove();
  } else {
    matchDates[date] = true;
  }
});