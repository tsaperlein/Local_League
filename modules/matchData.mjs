import mongoose, { get } from 'mongoose';

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
    stats: {
        team: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        moment: {
            type: Number,
            required: true
        }
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
            required: false
        },
        possecion: {
            type: Number,
            required: false
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
            required: false
        },
        possecion: {
            type: Number,
            required: false
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

let playersData = [
    {team: "AEK", players: ["Stankovic", "Sidibe", "Mitoglou", "Moukoudi", "Hajisafi", "Szymanski", "Pineda", "Gacinovic", "Elliason", "Araoujo", "Garcia"]},
    {team: "Panathinaikos", players: ["Brignoli", "Johansson", "Villafanez", "Santos", "Insua", "Kourbelis", "Mavrias", "Kolovetsios", "Chatzigiovannis", "Kampetsis", "Kolovos"]},
    {team: "Olympiacos", players: ["Paschalakis", "Sokratis", "Ba", "Cisse", "Reabciuk", "M'Vila", "Camara", "Masouras", "Fortounis", "Bruma", "El Arabi"]},
    {team: "PAOK", players: ["Zivkovic", "Varela", "Ingason", "Crespo", "Giannoulis", "Esiti", "El Kaddouri", "Tzolis", "Pelkas", "Zivkovic", "Swiderski"]},
    {team: "Arsenal", players: ["Leno", "Bellerin", "Gabriel", "Mari", "Tierney", "Partey", "Xhaka", "Saka", "Odegaard", "Smith Rowe", "Aubameyang"]},
    {team: "Barcelona", players: ["Ter Stegen", "Dest", "Pique", "Lenglet", "Alba", "Busquets", "De Jong", "Pedri", "Messi", "Griezmann", "Dembele"]},
    {team: "Fenerbahçe", players: ["Bayindir", "Sangare", "Szalai", "Aziz", "Gonul", "Gustavo", "Tufan", "Valencia", "Pelkas", "Thiam", "Samatta"]},
    {team: "Juventus", players: ["Szczesny", "Danilo", "De Ligt", "Chiellini", "Alex Sandro", "Bentancur", "Arthur", "McKennie", "Chiesa", "Morata", "Ronaldo"]},
    {team: "Liverpool", players: ["Alisson", "Alexander-Arnold", "Phillips", "Fabinho", "Robertson", "Wijnaldum", "Thiago", "Jones", "Salah", "Firmino", "Mane"]},
    {team: "Manchester United", players: ["De Gea", "Wan-Bissaka", "Lindelof", "Maguire", "Shaw", "Fred", "McTominay", "Greenwood", "Fernandes", "Rashford", "Cavani"]},
    {team: "Manchester City", players: ["Ederson", "Walker", "Stones", "Dias", "Cancelo", "Rodri", "Gundogan", "De Bruyne", "Halland", "Sterling", "Jesus"]},
    {team: "Milan", players: ["Donnarumma", "Calabria", "Kjaer", "Romagnoli", "Hernandez", "Kessie", "Tonali", "Saelemaekers", "Calhanoglu", "Rebic", "Ibrahimovic"]},
    {team: "Real Madrid", players: ["Courtois", "Carvajal", "Varane", "Ramos", "Mendy", "Casemiro", "Kroos", "Modric", "Asensio", "Benzema", "Vinicius"]},
    {team: "Paris Saint Germain", players: ["Navas", "Florenzi", "Marquinhos", "Kimpembe", "Kurzawa", "Paredes", "Gueye", "Di Maria", "Neymar", "Mbappe", "Icardi"]}
]

let matchesData = [];

// //Generate new matches with random data
// const teams = ['AEK', 'Panathinaikos', 'Olympiacos', 'PAOK', 'Arsenal', 'Barcelona', 'Fenerbahçe', 'Juventus', 'Liverpool', 'Manchester United', 'Manchester City', 'Milan', 'Real Madrid', 'Paris Saint Germain'];
// const icons = ['/team-icons/aek.png', '/team-icons/pao.png', '/team-icons/osfp.png', '/team-icons/paok.png', '/team-icons/arsenal.png', '/team-icons/barcelona.png', '/team-icons/fenerbahce.png', '/team-icons/juventus.png', '/team-icons/liverpool.png', '/team-icons/manchester-united.png', '/team-icons/manchester-city.png', '/team-icons/milan.png', '/team-icons/real-madrid.png', '/team-icons/paris-saint-germain.png'];
// const fields = ['Γήπεδο Αγιά Σοφιά', 'Γήπεδο Απόστολος Νικολαΐδης', 'Στάδιο Γεώργιος Καραϊσκάκης', 'Γήπεδο Τούμπας', 'Emirates Stadium', 'Spotify Camp Nou', 'Şükrü Saracoğlu Stadium', 'Allianz Stadium', 'Anfield', 'Old Trafford', 'Etihad Stadium', 'San Siro', 'Santiago Bernabéu Stadium', 'Parc des Princes'];
const referees = ['Thanasis Athanasiou', 'Panos Panopoulos', 'Giorgos Giorgopoulos', 'Nikos Nikolopoulos', 'Kostas Kostopoulos', 'John Smith', 'William Williams', 'Edward Phoenix', 'Michael Johnson', 'James Brown', 'Robert Jones', 'David Miller', 'Richard Davis', 'Joseph Garcia', 'Charles Rodriguez', 'Thomas Wilson', 'Christopher Martinez', 'Daniel Anderson', 'Matthew Taylor', 'Anthony Thomas', 'Donald Hernandez', 'Mark Moore', 'Paul Martin', 'Steven Jackson', 'Andrew Thompson', 'Kenneth White', 'Joshua Lopez', 'Kevin Lee', 'Brian Clark', 'George King', 'Edward Baker', 'Ronald Adams', 'Anthony Nelson', 'Kevin Hill', 'Jason Ramirez', 'Jeffrey Campbell', 'Gary Mitchell', 'Jacob Roberts', 'Nicholas Carter', 'Eric Phillips', 'Stephen Evans', 'Frank Collins', 'Jonathan Stewart', 'Justin Sanchez', 'Scott Morris', 'Brandon Rogers', 'Raymond Reed', 'Gregory Cook', 'Benjamin Morgan', 'Samuel Bell', 'Patrick Murphy', 'Alexander Bailey', 'Jack Rivera', 'Dennis Cooper', 'Jerry Richardson', 'Tyler Cox', 'Zachary Howard', 'Jose Ward', 'Henry Torres', 'Douglas Peterson', 'Larry Gray', 'Mary Ramirez', 'Jennifer James', 'Lisa Watson', 'Sandra Brooks', 'Kimberly Kelly', 'Donna Sanders', 'Michelle Price', 'Laura Bennett', 'Sarah Wood', 'Sharon Barnes', 'Cynthia Parker', 'Angela Stewart', 'Melissa Jenkins', 'Brenda Perry', 'Amy Powell', 'Anna Long', 'Rebecca Patterson', 'Virginia Hughes', 'Kathleen Flores', 'Pamela Washington', 'Martha Butler', 'Debra Simmons', 'Amanda Foster', 'Stephanie Gonzales', 'Carolyn Bryant', 'Christine Alexander', 'Marie Russell', 'Janet Griffin', 'Catherine Diaz', 'Frances Hayes', 'Ann Myers', 'Joyce Henderson', 'Diane Henry', 'Alice Kelly', 'Julie Sanders', 'Heather Price', 'Teresa Murphy', 'Doris Rivera', 'Gloria Cook', 'Evelyn Bell', 'Jean Howard', 'Cheryl Torres', 'Mildred Peterson', 'Katherine Gray', 'Joan James', 'Ashley Watson', 'Judith Brooks', 'Rose Parker', 'Janice Stewart', 'Kelly Jenkins', 'Nicole Perry', 'Judy Long', 'Christina Washington', 'Kathy Butler', 'Theresa Simmons', 'Beverly Foster'];
const startTimes = ['16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00'];

let teamsData = [
    { name: "AEK", logo: "/team-icons/aek.png", matches: 27, wins: 19, draws: 3, losses: 5, points: 60 },
    { name: "Panathinaikos", logo: "/team-icons/pao.png", matches: 27, wins: 16, draws: 8, losses: 2, points: 59 },
    { name: "Olympiakos", logo: "/team-icons/osfp.png", matches: 27, wins: 14, draws: 9, losses: 2, points: 57 },
    { name: "PAOK", logo: "/team-icons/paok.png", matches: 27, wins: 14, draws: 8, losses: 2, points: 59 },
    { name: "Arsenal", logo: "/team-icons/arsenal.png", matches: 27, wins: 14, draws: 8, losses: 2, points: 59 },
    { name: "Barcelona", logo: "/team-icons/barcelona.png", matches: 27, wins: 14, draws: 8, losses: 2, points: 59 },
    { name: "Fenerbahçe", logo: "/team-icons/fenerbahce.png", matches: 27, wins: 14, draws: 8, losses: 2, points: 59 },
    { name: "Juventus", logo: "/team-icons/juventus.png", matches: 27, wins: 14, draws: 8, losses: 2, points: 59 },
    { name: "Liverpool", logo: "/team-icons/liverpool.png", matches: 27, wins: 14, draws: 8, losses: 2, points: 59 },
    { name: "Manchester United", logo: "/team-icons/manchester-united.png", matches: 27, wins: 14, draws: 8, losses: 2, points: 59 },
    { name: "Manchester City", logo: "/team-icons/manchester-city.png", matches: 27, wins: 14, draws: 8, losses: 2, points: 59 },
    { name: "Milan", logo: "/team-icons/milan.png", matches: 27, wins: 14, draws: 8, losses: 2, points: 59 },
    { name: "Real Madrid", logo: "/team-icons/real-madrid.png", matches: 27, wins: 14, draws: 8, losses: 2, points: 59 },
    { name: "Paris Saint Germain", logo: "/team-icons/paris-saint-germain.png", matches: 27, wins: 14, draws: 8, losses: 2, points: 59 }
];

const lineupFieldData = [
    { name: "AEK", lineup: "aek-lineup.png", fieldName: "OPAP Arena Αγιά Σοφιά", fieldLink: "aek.png" },
    { name: "Panathinaikos", lineup: "pao-lineup.png", fieldName: "Γήπεδο Λεοφώρου Αλεξάνδρας", fieldLink: "pao.png" },
    { name: "Olympiakos", lineup: "pao-lineup.png", fieldName: "Στάδιο Γεώργιος Καραϊσκάκης", fieldLink: "osfp.png" },
    { name: "PAOK", lineup: "pao-lineup.png", fieldName: "Γήπεδο Τούμπας", fieldLink: "paok.png" },
    { name: "Arsenal", lineup: "pao-lineup.png", fieldName: "Emirates Stadium", fieldLink: "arsenal.png" },
    { name: "Barcelona", lineup: "pao-lineup.png", fieldName: "Spotify Camp Nou", fieldLink: "barcelona.png" },
    { name: "Fenerbahçe", lineup: "pao-lineup.png", fieldName: "Şükrü Saracoğlu Stadium", fieldLink: "fenerbahce.png" },
    { name: "Juventus", lineup: "pao-lineup.png", fieldName: "Allianz Stadium", fieldLink: "juventus.png" },
    { name: "Liverpool", lineup: "pao-lineup.png", fieldName: "Anfield", fieldLink: "liverpool.png" },
    { name: "Manchester United", lineup: "pao-lineup.png", fieldName: "Old Trafford", fieldLink: "manchester-united.png" },
    { name: "Manchester City", lineup: "pao-lineup.png", fieldName: "Etihad Stadium", fieldLink: "manchester-city.png" },
    { name: "Milan", lineup: "pao-lineup.png", fieldName: "San Siro", fieldLink: "milan.png" },
    { name: "Real Madrid", lineup: "pao-lineup.png", fieldName: "Santiago Bernabéu  Stadium", fieldLink: "real-madrid.png" },
    { name: "Paris Saint Germain", lineup: "pao-lineup.png", fieldName: "Parc des Princes", fieldLink: "paris-saint-germain.png" },
];

function getRandomInt(max) {
    return Math.floor(Math.random() * (max - 1)) + 1;
}

for (let i = 0; i < teamsData.length; i++) {
    for(let j = 0; j < teamsData.length; j++) {
        if(i==j) continue;
        else{
            matchesData.push({
                date: '',
                state: '',
                homeTeam: {
                    name: teamsData[i].name,
                    logo: teamsData[i].logo,
                    score: '',
                    possecion: '',
                },
                awayTeam: {
                    name: teamsData[j].name,
                    logo: teamsData[j].logo,
                    score: '',
                    possecion: '',
                },
                startTime: startTimes[Math.floor(Math.random() * startTimes.length)],
                field: lineupFieldData[i].fieldName,
                referees: {
                    main: referees[Math.floor(Math.random() * referees.length)],
                    assistant: referees[Math.floor(Math.random() * referees.length)]
                } 
            });
        }
    }
}

// shuffle the matchesData
for (let i = matchesData.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [matchesData[i], matchesData[j]] = [matchesData[j], matchesData[i]];
}

let today = new Date();
let matchDate = new Date('2023-03-26');
for(let i = 0; i < matchesData.length; i++) {
    matchDate.setDate(matchDate.getDate() + Math.round(Math.random())*Math.floor(Math.random() * 5));
    const matchState = matchDate < today ? 'Final' : 'Upcoming';
    const matchHomeScore = matchState == 'Final' ? Math.floor(Math.random() * 5) : null;
    const matchGuestScore = matchState == 'Final' ? Math.floor(Math.random() * 5) : null;
    const matchPossecion = matchState == 'Final' ? Math.floor(Math.random() * 100) : null;
    matchesData[i].date = matchDate.toISOString().slice(0,10);
    matchesData[i].state = matchState;
    matchesData[i].homeTeam.score = matchHomeScore;
    matchesData[i].awayTeam.score = matchGuestScore;
    matchesData[i].homeTeam.possecion = matchPossecion;
    matchesData[i].awayTeam.possecion = 100 - matchPossecion;
}

for(let i = 0; i < matchesData.length; i++) {
    matchesData[i].stats = [];
}

function generatePlayerGoals(){
    for(let i = 0; i < matchesData.length; i++){
        for(let j = 0; j < playersData.length; j++){
            if(matchesData[i].homeTeam.name == playersData[j].team){
                for( let k = 0; k < matchesData[i].homeTeam.score; k++){
                    matchesData[i].stats.push({
                        team: playersData[j].team,
                        name: playersData[j].players[getRandomInt(playersData[j].players.length)],
                        type: 'goal',
                        minute: getRandomInt(90)
                    })
                }
            }
            else if(matchesData[i].awayTeam.name == playersData[j].team){
                for( let k = 0; k < matchesData[i].awayTeam.score; k++){
                    matchesData[i].stats.push({
                        team: playersData[j].team,
                        name: playersData[j].players[getRandomInt(playersData[j].players.length)],
                        type: 'goal',
                        minute: getRandomInt(90)
                    })
                }
            }
        }
    }
}
generatePlayerGoals();
console.log(matchesData);

// //Delete all matches from the database and add the new ones
// Match.deleteMany({})
//     .then(() => {
//         console.log('Deleted all matches');

//         const newMatches = matchesData.map((match) => new Match({
//             date: match.date,
//             state: match.state,
//             homeTeam: match.homeTeam,
//             awayTeam: match.awayTeam,
//             startTime: match.startTime,
//             field: match.field,
//             referees: match.referees
//         }));
//         return Match.insertMany(newMatches);
//     })
//     .then((result) => {
//         console.log('Added all matches');
//     })
//     .catch((err) => {
//         console.log(err);
//     });

export default { Match }