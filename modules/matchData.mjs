import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const matchSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    homeTeam: {
        type: Array,
        required: true
    },
    awayTeam: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    field: {
        type: String,
        required: true
    },
    referees: {
        type: Array,
        required: true
    }
}, {timestamps: true});

const Match = mongoose.model('Match', matchSchema);

const matchesData = [
];

// Generate new matches with random data
const teams = ['AEK', 'PAO', 'Olympiacos', 'Panathinaikos', 'PAOK', 'Aris', 'Atromitos', 'Asteras Tripolis', 'Panetolikos', 'Apollon Smyrnis', 'Xanthi', 'Volos NFC'];
const icons = ['/team-icons/aek.png', '/team-icons/pao.png', '/team-icons/olympiacos.png', '/team-icons/panathinaikos.png', '/team-icons/paok.png', '/team-icons/aris.png', '/team-icons/atromitos.png', '/team-icons/asteras.png', '/team-icons/panetolikos.png', '/team-icons/apollon.png', '/team-icons/xanthi.png', '/team-icons/volos.png'];
const fields = ['Γήπεδο Αγιά Σοφιά', 'Γήπεδο Ολυμπιακού', 'Γήπεδο Παναθηναϊκού', 'Γήπεδο ΠΑΟΚ', 'Γήπεδο Αρη', 'Γήπεδο Ατρόμητου', 'Γήπεδο Αστέρα Τρίπολης', 'Γήπεδο Παναιτωλικού', 'Γήπεδο Απόλλωνα Σμύρνης', 'Γήπεδο Ξάνθης', 'Γήπεδο Βόλου'];
const referees = ['Thanasis Athanasiou', 'Panos Panopoulos', 'Giorgos Giorgopoulos', 'Nikos Nikolopoulos', 'Kostas Kostopoulos', 'Dimitris Dimitropoulos', 'Giannis Giannopoulos', 'Giorgos Georgopoulos', 'Nikos Nikolaou', 'Kostas Kostas', 'Dimitris Dimitris', 'Giannis Giannis', 'Giorgos Giorgos', 'Nikos Nikos', 'Kostas Kostas', 'Dimitris Dimitris', 'Giannis Giannis', 'Giorgos Giorgos', 'Nikos Nikos', 'Kostas Kostas', 'Dimitris Dimitris', 'Giannis Giannis', 'Giorgos Giorgos', 'Nikos Nikos', 'Kostas Kostas', 'Dimitris Dimitris', 'Giannis Giannis', 'Giorgos Giorgos', 'Nikos Nikos', 'Kostas Kostas', 'Dimitris Dimitris', 'Giannis Giannis', 'Giorgos Giorgos', 'Nikos Nikos', 'Kostas Kostas', 'Dimitris Dimitris', 'Giannis Giannis', 'Giorgos Giorgos', 'Nikos Nikos', 'Kostas Kostas', 'Dimitris Dimitris', 'Giannis Giannis', 'Giorgos Giorgos', 'Nikos Nikos', 'Kostas Kostas', 'Dimitris Dimitris', 'Giannis Giannis'];

// Create some final matches and some upcoming matches
for (let i = 0; i < 24; i++) {
    const randomDate = new Date(2021, 2, 22 + i);
    const randomState = i < 6 ? 'Final' : 'Upcoming';
    const randomHomeTeam = teams[Math.floor(Math.random() * teams.length)];
    const randomHomeTeamLogo = icons[teams.indexOf(randomHomeTeam)];
    const randomHomeTeamScore = Math.floor(Math.random() * 5);
    let randomAwayTeam = teams[Math.floor(Math.random() * teams.length)];
    while (randomHomeTeam === randomAwayTeam) {
        randomAwayTeam = teams[Math.floor(Math.random() * teams.length)];
    }
    const randomAwayTeamLogo = icons[teams.indexOf(randomAwayTeam)];
    const randomAwayTeamScore = Math.floor(Math.random() * 5);
    const randomStartTime = randomState === 'Upcoming' ? '20:00' : null;
    const randomField = fields[Math.floor(Math.random() * fields.length)];
    const randomMainReferee = referees[Math.floor(Math.random() * referees.length)];
    const randomAssistantReferee = referees[Math.floor(Math.random() * referees.length)];
    const randomReferees = { main: randomMainReferee, assistant: randomAssistantReferee };
    matchesData.push({ date: randomDate, state: randomState, homeTeam: { name: randomHomeTeam, logo: randomHomeTeamLogo, score: randomHomeTeamScore }, awayTeam: { name: randomAwayTeam, logo: randomAwayTeamLogo, score: randomAwayTeamScore }, startTime: randomStartTime, field: randomField, referees: randomReferees });
}

const newMatches = matchesData.map((match) => new Match({
    date: match.date,
    state: match.state,
    homeTeam: match.homeTeam,
    awayTeam: match.awayTeam,
    startTime: match.startTime,
    field: match.field,
    referees: match.referees
}));

// Insert new matches into the database
Match.insertMany(newMatches)
    .then(() => console.log('New matches added to the database'))
    .catch((err) => console.log(err));
    
// Export the Match model
export default { Match }