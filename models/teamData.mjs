import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    matches: {
        type: Number,
        required: true
    },
    wins: {
        type: Number,
        required: true
    },
    draws: {
        type: Number,
        required: true
    },
    losses: {
        type: Number,
        required: true
    },
    homeWins: {
        type: Number,
        required: true
    },
    awayWins: {
        type: Number,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    goalsFor: {
        type: Number,
        required: true
    },
    goalsAgainst: {
        type: Number,
        required: true
    },
    goalDifference: {
        type: Number,
        required: true
    },
    rank: {
        type: Number,
        required: true
    }
}, {timestamps: true});

const Team = mongoose.model('Team', teamSchema);

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

// Functon that returns a random integer between min and max (both included)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMatches(teams){
    for(let i = 0; i < teams.length; i++){
        teams[i].matches = 30;
    }
}

function generateResults(teams){
    for(let i = 0; i < teams.length; i++){
        teams[i].wins = getRandomInt(1, 30);
        teams[i].draws = getRandomInt(1, 30 - teams[i].wins);
        teams[i].losses = 30 - teams[i].wins - teams[i].draws;
    }
}

// Function that calculates the points for each team
function calculatePoints(teams) {
    for (let i = 0; i < teams.length; i++) {
        teams[i].points = teams[i].wins * 3 + teams[i].draws;
    }
}
  
// Function that generates random goal data for each team
for (let i = 0; i < teamsData.length; i++) {
    teamsData[i].goalsFor = getRandomInt(30, 80);
    teamsData[i].goalsAgainst = getRandomInt(10, 80);
    teamsData[i].goalDifference = teamsData[i].goalsFor - teamsData[i].goalsAgainst;
}
  
// Function that calculates the rank of each team and sorts them by it
function calculateAndSortRanking(teams) {
    // sort the teams by their rank (in descending order)
    teams.sort((a, b) => b.points - a.points);
    teams.forEach((team, index) => {
      team.rank = index + 1;
    });
}

function handleHomeWins(teams){
    for (let i = 0; i < teams.length; i++) {
      teams[i].homeWins = getRandomInt(1, teams[i].wins);
    }
}
  
function handleGuestWins(teams){
    for (let i = 0; i < teams.length; i++) {
      teams[i].guestWins = teams[i].wins - teams[i].homeWins;
    }
}

generateMatches(teamsData);
generateResults(teamsData);
calculatePoints(teamsData);
calculateAndSortRanking(teamsData);
handleHomeWins(teamsData);
handleGuestWins(teamsData);

Team.deleteMany({})
  .then(() => {
    console.log('All existing teams deleted');
    
    // create new teams from the `teamsData` array
    const newTeams = teamsData.map(teamData => new Team({
      name: teamData.name,
      logo: teamData.logo,
      matches: teamData.matches,
      wins: teamData.wins,
      draws: teamData.draws,
      losses: teamData.losses,
      homeWins: teamData.homeWins,
      awayWins: teamData.guestWins,
      points: teamData.points,
      goalsFor: teamData.goalsFor,
      goalsAgainst: teamData.goalsAgainst,
      goalDifference: teamData.goalDifference,
      rank: teamData.rank,
    }));

    // save the new teams to the database
    return Team.insertMany(newTeams);
  })
  .then(result => {
    console.log(`${result.length} new teams saved`);
  })
  .catch(error => {
    console.error(error);
  });

export default { Team }