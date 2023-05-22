import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Player = mongoose.model('Player', playerSchema);

let playerData = [
    {team: "AEK", players: ["Stankovic", "Sidibe", "Mitoglou", "Moukoudi", "Hajisafi", "Szymanski", "Pineda", "Gacinovic", "Elliason", "Araoujo", "Garcia"]},
    {team: "Panathinaikos", players: ["Brignoli", "Johansson", "Villafanez", "Santos", "Insua", "Kourbelis", "Mavrias", "Kolovetsios", "Chatzigiovannis", "Kampetsis", "Kolovos"]},
    {team: "Olympiakos", players: ["Paschalakis", "Sokratis", "Ba", "Cisse", "Reabciuk", "M'Vila", "Camara", "Masouras", "Fortounis", "Bruma", "El Arabi"]},
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

let player = [];
const pos = ["GK", "DF", "MF", "FW"];
const nationality = ["Greek", "French", "Italian", "Spanish", "German", "English", "Portuguese", "Argentinian", "Brazilian", "Dutch", "Belgian", "Turkish"];

for (let i = 0; i < playerData.length; i++) {
    for (let j = 0; j < playerData[i].players.length; j++) {
        player.push({
            name: playerData[i].players[j],
            team: playerData[i].team,
            number: Math.floor(Math.random() * 99) + 1,
            age: Math.floor(Math.random() * 10) + 20,
            position: '',
            nationality: nationality[Math.floor(Math.random()*nationality.length)]
        })
        if(j === 0) player[j + (11 * i)].position = pos[0];
        else if(j > 0 && j < 5) player[j + (11 * i)].position = pos[1];
        else if(j > 4 && j < 9) player[j + (11 * i)].position = pos[2];
        else player[j + (11 * i)].position = pos[3];
    }
}

// Player.deleteMany({})
//     .then(() => {
//         console.log('Players deleted');

//         const newPlayer = player.map(p => new Player(p));
//         return Player.insertMany(newPlayer);
//     })
//     .then(() => {
//         console.log('Players inserted');
//     })
//     .catch(err => {
//         console.log(err);
//     });

export default { Player };