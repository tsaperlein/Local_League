// Urls for icons (goal, red card, yellow card)
// const goal_url = 'https://ssl.gstatic.com/onebox/sports/game_feed/goal_icon.svg';
// const red_card_url = 'https://ssl.gstatic.com/onebox/sports/soccer_timeline/red-card-right.svg';
// const yellow_card_url = 'https://ssl.gstatic.com/onebox/sports/soccer_timeline/yellow-card-right.svg';

// const matchStats = {
//     match1: {
//         homeTeam: 'AEK',
//         awayTeam: 'PAO',
//         stats: [
//             { team: 'home', player: 'Mpelmpas', time: '45', type: 'goal' },
//             { team: 'home', player: 'Mpelmpas', time: '60', type: 'goal' },
//             { team: 'away', player: 'Efthymiou', time: '70', type: 'goal' },
//             { team: 'away', player: 'Nikolaou', time: '80', type: 'goal' },
//             { team: 'home', player: 'Mpelmpas', time: '30', type: 'yellow-card' },
//             { team: 'away', player: 'Efthymiou', time: '40', type: 'yellow-card' },
//             { team: 'away', player: 'Nikolaou', time: '70', type: 'red-card' },
//         ]
//     }
// };

// // Add all the stats to an array, but sorted by time
// const allStats = [];
// for (const match in matchStats) {
//     matchStats[match].stats.forEach(stat => {
//         allStats.push(stat);
//     });
// }
// allStats.sort((a, b) => a.time - b.time);

const header = document.querySelector('#header');
let headerChildren = header.children;

const upcomingMatches = document.getElementById('upcoming-matches-container');
const finalMatches = document.getElementById('final-matches-container');
const match = document.querySelectorAll('div.matches-container div.match')
match.forEach((match) => {
    match.addEventListener('click', () => {
        // Get the homeTeam and awayTeam names and the date of the match in fomat dd/mm/yyyy
        let homeTeam = match.querySelector('label.home-team-name').innerHTML;
        let awayTeam = match.querySelector('label.away-team-name').innerHTML;
        homeTeam = homeTeam.toLowerCase();
        awayTeam = awayTeam.toLowerCase();

        // Get the date from his sibling without moving back to the parent
        let date = match.previousElementSibling;
        date = date.innerHTML;

        // Format the date from dddd MMM D to D-M
        const formattedDate = moment(date).format('DD-MM')

        // Find the modal with id {{homeTeam.name}}-{{awayTeam.name}}-{{formatDate2 date}}-match-details-modal
        const modal = document.getElementById(`${homeTeam}-${awayTeam}-${formattedDate}-match-details-modal`);

        modal.style.visibility = 'visible';
        if (match.classList.contains('final-match')) { // If the match is final, then show the modal on top of the upcoming matches
            upcomingMatches.style.zIndex = '0';
        } else finalMatches.style.zIndex = '0';
        document.body.style.overflow = 'hidden';
        header.style.pointerEvents = 'none';
        // Set the opacity of the children elements to 0.9
        for (let i = 0; i < headerChildren.length; i++) {
            headerChildren[i].style.opacity = '0.8';
        }

        const closeBtn = modal.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            modal.style.visibility = 'hidden';
            if (match.classList.contains('final-match')) {
                upcomingMatches.style.zIndex = '1';
            } else finalMatches.style.zIndex = '1';
            document.body.style.overflow = 'visible';
            header.style.pointerEvents = '';
            for (let i = 0; i < headerChildren.length; i++) {
                headerChildren[i].style.opacity = '1';
            }
        });
        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.style.visibility = 'hidden';
                if (match.classList.contains('final-match')) {
                    upcomingMatches.style.zIndex = '1';
                } else finalMatches.style.zIndex = '1';
                document.body.style.overflow = 'visible';
                header.style.pointerEvents = '';
                for (let i = 0; i < headerChildren.length; i++) {
                    headerChildren[i].style.opacity = '1';
                }
            }
        });
    });
});

// // When the user clicks on a match that is final show the match details in a modal
// const finalMatch = document.querySelectorAll('.final-match');
// finalMatch.forEach(match => {
//     match.addEventListener('click', () => {
//         // Create a modal for the match details
//         const modal = document.createElement('div');
//         modal.classList.add('modal', 'd-flex', 'justify-content-center', 'align-items-center');
//         modal.setAttribute('id', 'match-details-modal');
//         modal.innerHTML = `
//             <div class="modal-content">
//                 <span class="close-btn">x</span>
//                 <div class="modal-header"></div>
//                 <div class="modal-body"></div>
//             </div>
//         `;
//         document.body.appendChild(modal);

//         const closeBtn = modal.querySelector('.close-btn');
//         closeBtn.addEventListener('click', () => {
//             modal.remove();
//             document.body.style.overflow = 'visible';
//         });
//         window.addEventListener('click', (event) => {
//             if (event.target == modal) {
//                 modal.remove();
//                 document.body.style.overflow = 'visible';
//             }
//         });

//         if (modal) {
//             document.body.style.overflow = 'hidden';
//             addStatistics();
//         }
//     });
// });

// // Add the statistics to the modal
// function addStatistics() {
//     // Add the team names and the h3 element for time in the modal header
//     let modalHeader = document.querySelector('.modal-header');
//     let homeTeam = document.createElement('div');
//     let homeTeamName = document.createElement('h2');
//     let homeTeamLogo = document.createElement('img');
//     let time = document.createElement('h3');
//     let awayTeam = document.createElement('div');
//     let awayTeamLogo = document.createElement('img');
//     let awayTeamName = document.createElement('h2');
//     modalHeader.classList.add('d-flex', 'align-items-center');
//     homeTeamLogo.classList.add('team-logo');
//     awayTeamLogo.classList.add('team-logo');
//     homeTeam.classList.add('logo-name', 'd-flex', 'flex-row', 'justify-content-start', 'align-items-center', 'col-4');
//     awayTeam.classList.add('logo-name', 'd-flex', 'flex-row', 'justify-content-end', 'align-items-center', 'col-4');

//     homeTeamName.innerHTML = matchStats.match1.homeTeam;
//     homeTeamLogo.setAttribute('src', '/team-icons/aek.png');
//     time.innerHTML = 'Time';
//     awayTeamName.innerHTML = matchStats.match1.awayTeam;
//     awayTeamLogo.setAttribute('src', '/team-icons/pao.png');

//     homeTeam.appendChild(homeTeamName);
//     homeTeam.appendChild(homeTeamLogo);
//     awayTeam.appendChild(awayTeamLogo);
//     awayTeam.appendChild(awayTeamName);

//     modalHeader.appendChild(homeTeam);
//     modalHeader.appendChild(time);
//     modalHeader.appendChild(awayTeam);

//     // Fill the modal body with the match details
//     let modalBody = document.querySelector('.modal-body');
//     let matchDetails = document.createElement('div');
//     matchDetails.classList.add('match-details');
//     // Create the grid for the match details depending on the number of goals and cards for both teams
//     let numberOfStats = allStats.length;

//     for (let i = 0; i < numberOfStats; i++) {
//         let row = document.createElement('div');
//         row.classList.add('row');
//         row.innerHTML = `
//             <div class="ht-player col-4">
//                 <div class="home-team-player"></div>
//             </div>
//             <div class="stat-time col-4">
//                 <div class="stat-and-time">
//                     <div class="home-stat col-4"></div>
//                     <div class="time col-4"></div>
//                     <div class="away-stat col-4"></div>
//                 </div>
//             </div>
//             <div class="at-player col-4">
//                 <div class="away-team-player"></div>
//             </div>
//         `;
//         let homeTeamPlayer = row.querySelector('.home-team-player');
//         let statAndTime = row.querySelector('.stat-and-time');
//         let homeStat = row.querySelector('.home-stat');
//         let time = row.querySelector('.time');
//         let awayStat = row.querySelector('.away-stat');
//         let awayTeamPlayer = row.querySelector('.away-team-player');

//         if (allStats[i].team === 'home') {
//             homeTeamPlayer.innerHTML = allStats[i].player;
//             if (allStats[i].type === 'goal') {
//                 homeStat.innerHTML = '<img src="' + goal_url + '" alt="goal">';
//             } else if (allStats[i].type === 'yellow-card') {
//                 homeStat.innerHTML = '<img src="' + yellow_card_url + '" alt="yellow card">';
//             } else {
//                 homeStat.innerHTML = '<img src="' + red_card_url + '" alt="red card">';
//             }
//             time.innerHTML = allStats[i].time+ "'";
//             awayStat.innerHTML = '';
//             awayTeamPlayer.innerHTML = '';
//         } else {
//             awayTeamPlayer.innerHTML = allStats[i].player;
//             if (allStats[i].type === 'goal') {
//                 awayStat.innerHTML = '<img src="' + goal_url + '" alt="goal">';
//             } else if (allStats[i].type === 'yellow-card') {
//                 awayStat.innerHTML = '<img src="' + yellow_card_url + '" alt="yellow card">';
//             } else {
//                 awayStat.innerHTML = '<img src="' + red_card_url + '" alt="red card">';
//             }
//             time.innerHTML = allStats[i].time + "'";
//             homeStat.innerHTML = '';
//             homeTeamPlayer.innerHTML = '';
//         }

//         statAndTime.appendChild(homeStat);
//         statAndTime.appendChild(time);
//         statAndTime.appendChild(awayStat);
//         matchDetails.appendChild(row);
//         modalBody.appendChild(matchDetails);
//     }
// }

// Sort matches by date
const matchDates = {};
document.querySelectorAll('.match-date').forEach(matchDate => {
    const date = matchDate.textContent;
    if (matchDates[date]) {
        matchDate.style.visibility = 'collapse';
    } else {
        matchDates[date] = true;
    }
});

// Function to align the score and time vertically
function verticalAlignOfTheScoreTime() {
    // get all the div.team elements
    const teamDivs = document.querySelectorAll('.teams-score div.team');

    // loop through the divs and find the widest img
    let maxWidth = 0;
    teamDivs.forEach((teamDiv) => {
        const imgs = teamDiv.getElementsByTagName('img');
        if (imgs.length > 0) {
            const imgWidth = imgs[0].offsetWidth;
            if (imgWidth > maxWidth) {
                maxWidth = imgWidth;
            }
        }
    });

    // set the width of all the div.team elements to the widest img width
    teamDivs.forEach((teamDiv) => {
        teamDiv.style.width = `${maxWidth}px`;
    });
}

verticalAlignOfTheScoreTime();

// Remove the margin-bottom and the border-bottom from the last match shown in schedule
if (window.location.pathname != '/Local-League/main-page') {
    const matches = document.querySelectorAll('.schedule-container .matches-container .match');
    const adminScheduleOptions = matches[matches.length - 1].querySelector('.admin-schedule-options');
    adminScheduleOptions.style.marginBottom = '0';
    adminScheduleOptions.style.borderBottom = 'none';
}

if (window.location.pathname === '/Local-League/schedule') {
    // Remove the margin-bottom and the border-bottom from the last stat shown in stats
    const stats = document.querySelectorAll('.match-details .stat-row');
    const adminStatsOptions = stats[stats.length - 1].querySelector('.admin-stats-options');
    adminStatsOptions.style.marginBottom = '0';
    adminStatsOptions.style.borderBottom = 'none';
}

// // Get the select element
// let select = document.getElementById('select-team');
// let matches = document.querySelectorAll('.match');

// // Add event listener for 'change' event
// select.addEventListener('change', function() {
//     let selectedValue = select.value;
//     matches.forEach(match => {
//         let homeTeam = match.querySelector('.home-team-name');
//         let awayTeam = match.querySelector('.away-team-name');
//         if (homeTeam.textContent === formatName(selectedValue) || awayTeam.textContent === formatName(selectedValue)) {
//             match.style.visibility = 'visible';
//             match.previousElementSibling.style.visibility = 'visible';
//         } else {
//             match.style.visibility = 'collapse';
//             match.previousElementSibling.style.visibility = 'collapse';
//         }
//     });
// });

// function formatName(string) {
//     if (string.length > 4) {
//         // if uppercase letters are morw than 1, then keep the uppercase letters joined by a dot
//         if (string.match(/[A-Z]/g).length > 1) {
//             return string.match(/[A-Z]/g).join('')
//         } else {
//             // return the first 3 letters in uppercase
//             return string.slice(0, 3).toUpperCase()
//         }
//     } else {
//         return string
//     }
// }