const matchesData = [{ date: 'Wednesday March 22', state: 'Final', homeTeam: 'AEK', homeTeamLogo: '../../images/aek.png', homeScore: 4, awayScore: 2, awayTeam: 'PAO', awayTeamLogo: '../../images/pao.png', field: 'Γήπεδο Αγιά Σοφιά', referees: ['Thanasis Athanasiou (main)', 'Panos Panopoulos (assistant)'] },
    { date: 'Wednesday March 22', state: 'Final', homeTeam: 'OLY', homeTeamLogo: '../../images/osfp.png', homeScore: 2, awayScore: 1, awayTeam: 'PAO', awayTeamLogo: '../../images/pao.png', field: 'Γήπεδο Αγιά Σοφιά', referees: ['Thanasis Athanasiou (main)', 'Panos Panopoulos (assistant)'] },
    { date: 'Wednesday March 22', state: 'Final', homeTeam: 'OLY', homeTeamLogo: '../../images/osfp.png', homeScore: 2, awayScore: 3, awayTeam: 'PAO', awayTeamLogo: '../../images/pao.png', field: 'Γήπεδο Αγιά Σοφιά', referees: ['Thanasis Athanasiou (main)', 'Panos Panopoulos (assistant)'] },
    { date: 'Wednesday March 22', state: 'Final', homeTeam: 'PAO', homeTeamLogo: '../../images/pao.png', homeScore: 5, awayScore: 1, awayTeam: 'AEK', awayTeamLogo: '../../images/aek.png', field: 'Γήπεδο Αγιά Σοφιά', referees: ['Thanasis Athanasiou (main)', 'Panos Panopoulos (assistant)'] },
    { date: 'Friday March 24', state: 'Final', homeTeam: 'PAO', homeTeamLogo: '../../images/pao.png', homeScore: 3, awayScore: 4, awayTeam: 'AEK', awayTeamLogo: '../../images/aek.png', field: 'Γήπεδο Αγιά Σοφιά', referees: ['Thanasis Athanasiou (main)', 'Panos Panopoulos (assistant)'] },
    { date: 'Saturday March 25', state: 'Final', homeTeam: 'PAO', homeTeamLogo: '../../images/pao.png', homeScore: 3, awayScore: 4, awayTeam: 'AEK', awayTeamLogo: '../../images/aek.png', field: 'Γήπεδο Αγιά Σοφιά', referees: ['Thanasis Athanasiou (main)', 'Panos Panopoulos (assistant)'] },
    { date: 'Sunday March 26', state: 'Upcoming', homeTeam: 'AEK', homeTeamLogo: '../../images/aek.png', awayTeam: 'OLY', awayTeamLogo: '../../images/osfp.png', startTime: '16:00', field: 'Γήπεδο Λεωφόρου', referees: ['John Smith (main)', 'George Brown (assistant)'] },
    { date: 'Sunday March 26', state: 'Upcoming', homeTeam: 'PAO', homeTeamLogo: '../../images/pao.png', awayTeam: 'AEK', awayTeamLogo: '../../images/aek.png', startTime: '18:00', field: 'Γήπεδο Αγιά Σοφιά', referees: ['John Smith (main)', 'George Brown (assistant)'] },
];

const upcomingMatchesContainer = document.getElementById('upcoming-matches-container');
const matchesContainer = document.getElementById('matches-container');

// Group matches by date and state
const matchesByState = matchesData.reduce((groups, match) => {
  const state = match.state;
  groups[state] = groups[state] || [];
  groups[state].push(match);
  return groups;
}, {});

// Group matches by date
const matchesByDate = matchesData.reduce((groups, match) => {
  const date = match.date;
  groups[date] = groups[date] || [];
  groups[date].push(match);
  return groups;
}, {});

// Loop through each date group and generate HTML code for each match
Object.entries(matchesByDate).forEach(([date, matches]) => {
    const dateElement = document.createElement('div');
    dateElement.classList.add('match-date');
    dateElement.innerHTML = `<li>${date}</li>`;

    const matchesWrapper = document.createElement('div');
    matchesWrapper.classList.add('matches-wrapper');
    matches.forEach((match, index) => {
        const matchElement = document.createElement('div');
        matchElement.classList.add('match');
        if (index < matches.length - 1) {
            matchElement.classList.add('bordered-bottom'); // Add border-bottom to all match elements except the last one
        } else {
            matchElement.classList.add('margin-bottom'); // Add margin-bottom to the last match element
        }
        // Check which team won the game and set the color of the score accordingly
        const homeScoreClass = match.homeScore > match.awayScore ? 'winning-score' : 'losing-score';
        const awayScoreClass = match.awayScore > match.homeScore ? 'winning-score' : 'losing-score';
        matchElement.innerHTML = `
            <div class="match-information d-flex flex-row justify-content-between align-items-center">
                <div class="current-state align-content-center">
                    <li class="d-flex align-items-center">${match.state}</li>
                </div>
                <div class="teams-score d-flex flex-row justify-content-center">
                    <label class="d-flex align-self-center" for="home-team">${match.homeTeam}</label>
                    <div class="team d-flex flex-row">
                        <img class="home-team" src="${match.homeTeamLogo}" alt="Home Team">
                    </div>
                    ${match.state === "Upcoming" ? `
                    <div class="match-time d-flex flex-row justify-content-center align-self-center align-items-center list-unstyled">
                        <li>${match.startTime}</li>
                    </div>` : `
                    <div class="score d-flex flex-row justify-content-center align-self-center align-items-center list-unstyled">
                        <li class="score ${homeScoreClass}">${match.homeScore}</li>
                        <div class="line"></div>
                        <li class="score ${awayScoreClass}">${match.awayScore}</li>
                    </div>
                    `}
                    <div class="team d-flex flex-row">
                        <img class="away-team" src="${match.awayTeamLogo}" alt="Away Team">
                    </div>
                    <label class="d-flex align-self-center" for="away-team">${match.awayTeam}</label>
                </div>
                <div class="extra-information">
                    <ul class="list-unstyled d-flex flex-column justify-content-center">
                        <li class="field-name">${match.field}</li>
                        ${match.referees.map(referee => `<li class="referee">${referee}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `; 
        matchesWrapper.appendChild(matchElement);
    });
  
    // Generate HTML code for both upcoming and final matches
    const groupElement = document.createElement('div');
    groupElement.classList.add('match-group');
    groupElement.appendChild(dateElement);
    groupElement.appendChild(matchesWrapper);
    if (matchesByState.hasOwnProperty('Upcoming') && matchesByState['Upcoming'].includes(matches[0])) {
        upcomingMatchesContainer.appendChild(groupElement);
    } else {
        matchesContainer.appendChild(groupElement);
    }
});