const matchesData = [
    { date: 'Wednesday March 22', state: 'Final', homeTeam: 'AEK', homeTeamLogo: '../../team-icons/aek.png', homeScore: 4, awayScore: 2, awayTeam: 'PAO', awayTeamLogo: '../../team-icons/pao.png', field: 'Γήπεδο Αγιά Σοφιά', referees: ['Thanasis Athanasiou (main)', 'Panos Panopoulos (assistant)'] },
    { date: 'Wednesday March 22', state: 'Final', homeTeam: 'AEK', homeTeamLogo: '../../team-icons/aek.png', homeScore: 4, awayScore: 2, awayTeam: 'PAO', awayTeamLogo: '../../team-icons/pao.png', field: 'Γήπεδο Αγιά Σοφιά', referees: ['Thanasis Athanasiou (main)', 'Panos Panopoulos (assistant)'] },
    { date: 'Wednesday March 22', state: 'Final', homeTeam: 'OLY', homeTeamLogo: '../../team-icons/osfp.png', homeScore: 2, awayScore: 1, awayTeam: 'PAO', awayTeamLogo: '../../team-icons/pao.png', field: 'Γήπεδο Αγιά Σοφιά', referees: ['Thanasis Athanasiou (main)', 'Panos Panopoulos (assistant)'] },
    { date: 'Wednesday March 22', state: 'Final', homeTeam: 'OLY', homeTeamLogo: '../../team-icons/osfp.png', homeScore: 2, awayScore: 3, awayTeam: 'PAO', awayTeamLogo: '../../team-icons/pao.png', field: 'Γήπεδο Αγιά Σοφιά', referees: ['Thanasis Athanasiou (main)', 'Panos Panopoulos (assistant)'] },
    { date: 'Wednesday March 22', state: 'Final', homeTeam: 'PAO', homeTeamLogo: '../../team-icons/pao.png', homeScore: 5, awayScore: 1, awayTeam: 'AEK', awayTeamLogo: '../../team-icons/aek.png', field: 'Γήπεδο Αγιά Σοφιά', referees: ['Thanasis Athanasiou (main)', 'Panos Panopoulos (assistant)'] },
    { date: 'Friday March 24', state: 'Final', homeTeam: 'PAO', homeTeamLogo: '../../team-icons/pao.png', homeScore: 3, awayScore: 4, awayTeam: 'AEK', awayTeamLogo: '../../team-icons/aek.png', field: 'Γήπεδο Αγιά Σοφιά', referees: ['Thanasis Athanasiou (main)', 'Panos Panopoulos (assistant)'] },
    { date: 'Saturday March 25', state: 'Final', homeTeam: 'PAO', homeTeamLogo: '../../team-icons/pao.png', homeScore: 3, awayScore: 4, awayTeam: 'AEK', awayTeamLogo: '../../team-icons/aek.png', field: 'Γήπεδο Αγιά Σοφιά', referees: ['Thanasis Athanasiou (main)', 'Panos Panopoulos (assistant)'] },
    { date: 'Sunday March 26', state: 'Upcoming', homeTeam: 'AEK', homeTeamLogo: '../../team-icons/aek.png', awayTeam: 'OLY', awayTeamLogo: '../../team-icons/osfp.png', startTime: '16:00', field: 'Γήπεδο Λεωφόρου', referees: ['John Smith (main)', 'George Brown (assistant)'] },
    { date: 'Sunday March 26', state: 'Upcoming', homeTeam: 'PAO', homeTeamLogo: '../../team-icons/pao.png', awayTeam: 'AEK', awayTeamLogo: '../../team-icons/aek.png', startTime: '18:00', field: 'Γήπεδο Αγιά Σοφιά', referees: ['John Smith (main)', 'George Brown (assistant)'] },
];

const finalMatchesContainer = document.getElementById('final-matches-container');
const upcomingMatchesContainer = document.getElementById('upcoming-matches-container');

// Group matches by date and state
const matchesByStateAndDate = matchesData.reduce((groups, match) => {
  const state = match.state;
  const date = match.date;
  groups[state] = groups[state] || {};
  groups[state][date] = groups[state][date] || [];
  groups[state][date].push(match);
  return groups;
}, {});

function matchHtml(match) {
    const homeScoreClass = match.homeScore > match.awayScore ? 'winning-score' : 'losing-score';
    const awayScoreClass = match.awayScore > match.homeScore ? 'winning-score' : 'losing-score';

    const matchHtml = `
        <div class="match-information d-flex flex-row align-items-center">
            <div class="current-state">
                <li class="d-flex align-items-center">${match.state}</li>
            </div>
            <div class="teams-score d-flex flex-row justify-content-center justify-items-center">
                <label class="team-name d-flex align-items-center" for="home-team">${match.homeTeam}</label>
                <div class="team d-flex flex-row">
                    <img class="home-team" src="${match.homeTeamLogo}" alt="Home Team">
                </div>
                ${match.state === "Upcoming" ? `
                <div class="match-time d-flex flex-row justify-content-center align-items-center list-unstyled">
                    <li>${match.startTime}</li>
                </div>` : `
                <div class="score d-flex justif-content-center align-items-center">
                    <li class="score ${homeScoreClass}">${match.homeScore}</li>
                    <div class="line"></div>
                    <li class="score ${awayScoreClass}">${match.awayScore}</li>
                </div>
                `}
                <div class="team d-flex flex-row">
                    <img class="away-team" src="${match.awayTeamLogo}" alt="Away Team">
                </div>
                <label class="team-name d-flex align-items-center" for="away-team">${match.awayTeam}</label>
            </div>
            <div class="extra-information">
                <ul class="list-unstyled d-flex flex-column justify-content-center">
                    <li class="field-name">${match.field}</li>
                    ${match.referees.map(referee => `<li class="referee">${referee}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;

    return matchHtml;
}

// Generate HTML code for final matches
if (matchesByStateAndDate['Final']) {
    for (const date in matchesByStateAndDate['Final']) {
        const dateElement = document.createElement('div');
        dateElement.classList.add('match-date');
        dateElement.innerHTML = `<li>${date}</li>`;

        const finalMatches = matchesByStateAndDate['Final'][date];
        const finalMatchesWrapper = document.createElement('div');
        finalMatchesWrapper.classList.add('matches-wrapper');
        finalMatches.forEach((match, index) => {
            const matchElement = document.createElement('div');
            matchElement.classList.add('match');
            if (index < finalMatches.length - 1) {
                matchElement.classList.add('bordered-bottom');
            } else {
                matchElement.classList.add('margin-bottom-none');
            }
            matchElement.innerHTML = matchHtml(match);
            finalMatchesContainer.appendChild(dateElement);
            finalMatchesWrapper.appendChild(matchElement);
        });
        finalMatchesContainer.appendChild(finalMatchesWrapper);
    }
}
// Generate HTML code for upcoming matches
if (matchesByStateAndDate['Upcoming']) {
    for (const date in matchesByStateAndDate['Upcoming']) {
        const dateElement = document.createElement('div');
        dateElement.classList.add('match-date');
        dateElement.innerHTML = `<li>${date}</li>`;

        const upcomingMatches = matchesByStateAndDate['Upcoming'][date];
        const upcomingMatchesWrapper = document.createElement('div');
        upcomingMatchesWrapper.classList.add('matches-wrapper');
        upcomingMatches.forEach((match, index) => {
            const matchElement = document.createElement('div');
            matchElement.classList.add('match');
            if (index < upcomingMatches.length - 1) {
                matchElement.classList.add('bordered-bottom');
            } else {
                matchElement.classList.add('margin-bottom-none');
            }
            matchElement.innerHTML = matchHtml(match);
            upcomingMatchesContainer.appendChild(dateElement);
            upcomingMatchesWrapper.appendChild(matchElement);
        });
        upcomingMatchesContainer.appendChild(upcomingMatchesWrapper);
    }
}