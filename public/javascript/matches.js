const header = document.querySelector('#header');
let headerChildren = header.children;

const upcomingMatches = document.getElementById('upcoming-matches-container');
const finalMatches = document.getElementById('final-matches-container');
const match = document.querySelectorAll('div.matches-container div.match');
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

// // ----- Function to show the matches of the selected team in the schedule page -----
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
// // ---------------------------------------------------------------------------------

// --- Dropdown menu for the Schedule page ---
// If the path is schedule
if (window.location.pathname.includes('schedule')) {
    const dropdownSelect = document.getElementById('select-team');
    console.log(dropdownSelect);
    dropdownSelect.onchange = function () {
        window.location.href = this.value;
        console.log(this.value);
    };
    // Alternative method
    /* document.getElementById('select-team').onchange = function() {
        window.location.href = this.children[this.selectedIndex].getAttribute('href');
    } */
}
// -------------------------------------------