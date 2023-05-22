import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const teamInfoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lineup: {
        type: String,
        required: true
    },
    fieldName: {
        type: String,
        required: true
    },
    fieldLink: {
        type: String,
        required: true
    },
    players: {
        type: Array,
        required: true
    }
}, {timestamps: true});

const singleTeam = mongoose.model('singleTeam', teamInfoSchema);

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
    { name: "Manchester City", lineup: "pao-lineup.png", fieldName: "Etihad Stadium", fieldLink: "manchester-city.png" },
    { name: "Manchester United", lineup: "pao-lineup.png", fieldName: "Old Trafford", fieldLink: "manchester-united.png" },
    { name: "Milan", lineup: "pao-lineup.png", fieldName: "San Siro", fieldLink: "milan.png" },
    { name: "Real Madrid", lineup: "pao-lineup.png", fieldName: "Santiago Bernabéu  Stadium", fieldLink: "real-madrid.png" },
    { name: "Paris Saint Germain", lineup: "pao-lineup.png", fieldName: "Parc des Princes", fieldLink: "paris-saint-germain.png" },
];

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
const nationality = [];

for (let i = 0; i < playerData.length; i++) {
    for (let j = 0; j < playerData[i].players.length; j++) {
        player.push({
            name: playerData[i].players[j],
            team: playerData[i].team,
            number: Math.floor(Math.random() * 99) + 1,
            age: Math.floor(Math.random() * 10) + 20,
            position: '',
            nationality: 'Greek'
        })
        if(j === 0) player[j + (11 * i)].position = pos[0];
        else if(j > 0 && j < 5) player[j + (11 * i)].position = pos[1];
        else if(j > 4 && j < 9) player[j + (11 * i)].position = pos[2];
        else player[j + (11 * i)].position = pos[3];
    }
}

console.log(player);

singleTeam.deleteMany({})
  .then(() => {
    console.log('All existing items deleted');

    const newItems = lineupFieldData.map(data => new singleTeam({
        name: data.name,
        lineup: data.lineup,
        fieldName: data.fieldName,
        fieldLink: data.fieldLink,
        players: player.filter(player => player.team === data.name)
    }));

    // save the new teams to the database
    return singleTeam.insertMany(newItems);
  })
  .then(result => {
    console.log(`${result.length} new items saved`);
  })
  .catch(error => {
    console.error(error);
  });

  export default { singleTeam }