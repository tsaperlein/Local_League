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
        name: {
            type: String,
            required: true
        },
        logo: {
            type: String,
            required: true
        },
        score: {
            type: Number,
            required: true
        }
    },
    awayTeam: {
        name: {
            type: String,
            required: true
        },
        logo: {
            type: String,
            required: true
        },
        score: {
            type: Number,
            required: true
        }
    },
    startTime: {
        type: String,
        required: false
    },
    field: {
        type: String,
        required: true
    },
    referees: {
        main: {
            type: String,
            required: true
        },
        assistant: {
            type: String,
            required: true
        }
    }
}, {timestamps: true});

const Match = mongoose.model('Match', matchSchema);

const matchesData = [];

// Generate new matches with random data
const teams = ['AEK', 'Panathinaikos', 'Olympiacos', 'PAOK', 'Arsenal', 'Barcelona', 'Fenerbahçe', 'Juventus', 'Liverpool', 'Manchester United', 'Manchester City', 'Milan', 'Real Madrid', 'Paris Saint Germain'];
const icons = ['/team-icons/aek.png', '/team-icons/pao.png', '/team-icons/osfp.png', '/team-icons/paok.png', '/team-icons/arsenal.png', '/team-icons/barcelona.png', '/team-icons/fenerbahce.png', '/team-icons/juventus.png', '/team-icons/liverpool.png', '/team-icons/manchester-united.png', '/team-icons/manchester-city.png', '/team-icons/milan.png', '/team-icons/real-madrid.png', '/team-icons/paris-saint-germain.png'];
const fields = ['Γήπεδο Αγιά Σοφιά', 'Γήπεδο Απόστολος Νικολαΐδης', 'Στάδιο Γεώργιος Καραϊσκάκης', 'Γήπεδο Τούμπας', 'Emirates Stadium', 'Spotify Camp Nou', 'Şükrü Saracoğlu Stadium', 'Allianz Stadium', 'Anfield', 'Old Trafford', 'Etihad Stadium', 'San Siro', 'Santiago Bernabéu Stadium', 'Parc des Princes'];
const referees = ['Thanasis Athanasiou', 'Panos Panopoulos', 'Giorgos Giorgopoulos', 'Nikos Nikolopoulos', 'Kostas Kostopoulos', 'John Smith', 'William Williams', 'Edward Phoenix', 'Michael Johnson', 'James Brown', 'Robert Jones', 'David Miller', 'Richard Davis', 'Joseph Garcia', 'Charles Rodriguez', 'Thomas Wilson', 'Christopher Martinez', 'Daniel Anderson', 'Matthew Taylor', 'Anthony Thomas', 'Donald Hernandez', 'Mark Moore', 'Paul Martin', 'Steven Jackson', 'Andrew Thompson', 'Kenneth White', 'Joshua Lopez', 'Kevin Lee', 'Brian Clark', 'George King', 'Edward Baker', 'Ronald Adams', 'Anthony Nelson', 'Kevin Hill', 'Jason Ramirez', 'Jeffrey Campbell', 'Gary Mitchell', 'Jacob Roberts', 'Nicholas Carter', 'Eric Phillips', 'Stephen Evans', 'Frank Collins', 'Jonathan Stewart', 'Justin Sanchez', 'Scott Morris', 'Brandon Rogers', 'Raymond Reed', 'Gregory Cook', 'Benjamin Morgan', 'Samuel Bell', 'Patrick Murphy', 'Alexander Bailey', 'Jack Rivera', 'Dennis Cooper', 'Jerry Richardson', 'Tyler Cox', 'Zachary Howard', 'Jose Ward', 'Henry Torres', 'Douglas Peterson', 'Larry Gray', 'Mary Ramirez', 'Jennifer James', 'Lisa Watson', 'Sandra Brooks', 'Kimberly Kelly', 'Donna Sanders', 'Michelle Price', 'Laura Bennett', 'Sarah Wood', 'Sharon Barnes', 'Cynthia Parker', 'Angela Stewart', 'Melissa Jenkins', 'Brenda Perry', 'Amy Powell', 'Anna Long', 'Rebecca Patterson', 'Virginia Hughes', 'Kathleen Flores', 'Pamela Washington', 'Martha Butler', 'Debra Simmons', 'Amanda Foster', 'Stephanie Gonzales', 'Carolyn Bryant', 'Christine Alexander', 'Marie Russell', 'Janet Griffin', 'Catherine Diaz', 'Frances Hayes', 'Ann Myers', 'Joyce Henderson', 'Diane Henry', 'Alice Kelly', 'Julie Sanders', 'Heather Price', 'Teresa Murphy', 'Doris Rivera', 'Gloria Cook', 'Evelyn Bell', 'Jean Howard', 'Cheryl Torres', 'Mildred Peterson', 'Katherine Gray', 'Joan James', 'Ashley Watson', 'Judith Brooks', 'Rose Parker', 'Janice Stewart', 'Kelly Jenkins', 'Nicole Perry', 'Judy Long', 'Christina Washington', 'Kathy Butler', 'Theresa Simmons', 'Beverly Foster'];
const startTimes = ['16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00'];

// Generate 154 different names for players
const playerNames


// Create some final matches and some upcoming matches
for (let i = 0; i < 24; i++) {
    const randomDate = new Date(2021, 2, 22 + i + Math.floor(Math.random() * 1));
    const randomState = i < 12 ? 'Final' : 'Upcoming';
    const randomHomeTeam = teams[Math.floor(Math.random() * teams.length)];
    const randomHomeTeamLogo = icons[teams.indexOf(randomHomeTeam)];
    const randomHomeTeamScore = Math.floor(Math.random() * 5);
    let randomAwayTeam = teams[Math.floor(Math.random() * teams.length)];
    while (randomHomeTeam === randomAwayTeam) {
        randomAwayTeam = teams[Math.floor(Math.random() * teams.length)];
    }
    const randomAwayTeamLogo = icons[teams.indexOf(randomAwayTeam)];
    const randomAwayTeamScore = Math.floor(Math.random() * 5);
    const randomStartTime = randomState === 'Upcoming' ? startTimes[Math.floor(Math.random() * startTimes.length)] : '';
    // Select either the homeTeam field or the awayTeam field
    const randomFieldIndex = [teams.indexOf(randomHomeTeam), teams.indexOf(randomAwayTeam)][Math.floor(Math.random() * 2)];
    const randomField = fields[randomFieldIndex];
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

// // Delete all matches from the database and add the new ones
// Match.deleteMany({})
//     .then(() => Match.insertMany(newMatches))
//     .then(() => {
//         console.log('Database seeded successfully');
//         mongoose.connection.close();
//     }
// )
//     .catch((err) => console.log(err));

export default { Match }