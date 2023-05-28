const header = document.querySelector('#header');
let headerChildren = header.children;

const upcomingMatches = document.getElementById('upcoming-matches-container');
const finalMatches = document.getElementById('final-matches-container');
const match = document.querySelectorAll('div.match-information')
match.forEach((match) => {
    match.addEventListener('click', () => {
        // Get the homeTeam and awayTeam names and the date of the match in fomat dd/mm/yyyy
        let homeTeam = match.querySelector('label.home-team-name').innerHTML;
        let awayTeam = match.querySelector('label.away-team-name').innerHTML;
        homeTeam = homeTeam.toLowerCase();
        awayTeam = awayTeam.toLowerCase();

        // Get the date from his sibling without moving back to the parent
        let date = match.parentElement.previousElementSibling;
        date = date.innerHTML;

        // Format the date from dddd MMM D to D-M
        const formattedDate = moment(date).format('DD-MM')

        // Find the modal with id {{homeTeam.name}}-{{awayTeam.name}}-{{formatDate2 date}}-match-details-modal
        const modal = document.getElementById(`${homeTeam}-${awayTeam}-${formattedDate}-match-details-modal`);

        modal.style.visibility = 'visible';
        document.body.style.overflow = 'hidden';
        header.style.pointerEvents = 'none';
        // Set the opacity of the children elements to 0.9
        for (let i = 0; i < headerChildren.length; i++) {
            headerChildren[i].style.opacity = '0.8';
            headerChildren[i].style.transition = 'opacity 0s';
        }

        const closeBtn = modal.querySelector('span.close-btn');
        closeBtn.addEventListener('click', () => {
            modal.style.visibility = 'hidden';
            document.body.style.overflow = 'visible';
            header.style.pointerEvents = '';
            for (let i = 0; i < headerChildren.length; i++) {
                headerChildren[i].style.opacity = '1';
            }
        });
        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.style.visibility = 'hidden';
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

// --- Dropdown menu for the Schedule page ---
if (window.location.pathname.includes('schedule')) {
    document.getElementById('select-team').onchange = function () {
        window.location.href = this.children[this.selectedIndex].getAttribute('href');
        localStorage.setItem('selectedOption', this.children[this.selectedIndex].getAttribute('value'));
    }
    // Set the value of the select element to the value stored in local storage
    const selectedOption = localStorage.getItem('selectedOption');
    console.log(selectedOption);
    if (selectedOption) {
        document.getElementById('select-team').value = selectedOption;
    }
}// ------------------------------------------

// Remove the margin-bottom and the border-bottom from the last match shown in schedule
if (window.location.pathname.includes('schedule')) {
    const matches = document.querySelectorAll('.schedule-container .matches-container .match');
    if (matches.length === 0) {
        console.log('No matches found');
    } else {
        const adminScheduleOptions = matches[matches.length - 1].querySelector('.admin-schedule-options');
        adminScheduleOptions.style.marginBottom = '0';
        adminScheduleOptions.style.borderBottom = 'none';
    }
}

if (window.location.pathname.includes('schedule')) {
    // Remove the margin-bottom and the border-bottom from the last stat shown in stats
    // Find the last .admin-stats-options element
    const adminStatsOptions = document.querySelector('.admin-stats-options:last-child');
    adminStatsOptions.style.marginBottom = '0';
    adminStatsOptions.style.borderBottom = 'none';
}

