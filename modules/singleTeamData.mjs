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

// const playerData = [
//     { name: "Γιώργος Αθανασιάδης", number: "30", age: 30, position: "GK", nationality: "Greek", team: "AEK" },
//     { name: "Άρολντ Μουκουντί", number: "2", age: 26, position: "DF", nationality: "French", team: "AEK" },
//     { name: "Λάζαρος Ρότα", number: "12", age: 26, position: "DF", nationality: "Greek", team: "AEK" },
//     { name: "Γεράσιμος Μήτογλου", number: "24", age: 24, position: "DF", nationality: "Greek", team: "AEK" },
//     { name: "Έχσαν Χατζισαφί", number: "28", age: 33, position: "DF", nationality: "Iranian", team: "AEK" },
//     { name: "Ντάμιαν Σιμάνσκι", number: "4", age: 28, position: "MF", nationality: "Polish", team: "AEK" },
//     { name: "Όρμπελιν Πινέδα", number: "13", age: 27, position: "MF", nationality: "Mexican", team: "AEK" },
//     { name: "Μιγιάτ Γκατσίνοβιτς", number: "8", age: 28, position: "MF", nationality: "Serbian", team: "AEK" },
//     { name: "Νίκλας Ελίασον", number: "19", age: 28, position: "MF", nationality: "Swedish", team: "AEK" },
//     { name: "Σέρχιο Αραούχο", number: "11", age: 31, position: "FW", nationality: "Argentinean", team: "AEK" },
//     { name: "Λιβάι Γκαρσία", number: "7", age: 26, position: "FW", nationality: "Trinidadian", team: "AEK" },
//     { name: "Πέτρος Μάνταλος", number: "20", age: 32, position: "MF", nationality: "Greek", team: "AEK" },
//     { name: "Στίβεν Τσούμπερ", number: "10", age: 32, position: "FW", nationality: "Swiss", team: "AEK" },
//     { name: "Γενς Γιόνσον", number: "6", age: 30, position: "MF", nationality: "Danish", team: "AEK" },
//     { name: "Ντομαγκοϊ Βίντα", number: "21", age: 34, position: "DF", nationality: "Croatian", team: "AEK" },
//     { name: "Γιώργος Αθανασιάδης", number: "30", age: 30, position: "GK", nationality: "Greek", team: "Panathinaikos" },
//     { name: "Άρολντ Μουκουντί", number: "2", age: 26, position: "DF", nationality: "French", team: "Panathinaikos" },
//     { name: "Λάζαρος Ρότα", number: "12", age: 26, position: "DF", nationality: "Greek", team: "Panathinaikos" },
//     { name: "Γεράσιμος Μήτογλου", number: "24", age: 24, position: "DF", nationality: "Greek", team: "Panathinaikos" },
//     { name: "Έχσαν Χατζισαφί", number: "28", age: 33, position: "DF", nationality: "Iranian", team: "Panathinaikos" },
//     { name: "Ντάμιαν Σιμάνσκι", number: "4", age: 28, position: "MF", nationality: "Polish", team: "Panathinaikos" },
//     { name: "Όρμπελιν Πινέδα", number: "13", age: 27, position: "MF", nationality: "Mexican", team: "Panathinaikos" },
//     { name: "Μιγιάτ Γκατσίνοβιτς", number: "8", age: 28, position: "MF", nationality: "Serbian", team: "Panathinaikos" },
//     { name: "Νίκλας Ελίασον", number: "19", age: 28, position: "MF", nationality: "Swedish", team: "Panathinaikos" },
//     { name: "Σέρχιο Αραούχο", number: "11", age: 31, position: "FW", nationality: "Argentinean", team: "Panathinaikos" },
//     { name: "Λιβάι Γκαρσία", number: "7", age: 26, position: "FW", nationality: "Trinidadian", team: "Panathinaikos" },
//     { name: "Πέτρος Μάνταλος", number: "20", age: 32, position: "MF", nationality: "Greek", team: "Panathinaikos" },
//     { name: "Στίβεν Τσούμπερ", number: "10", age: 32, position: "FW", nationality: "Swiss", team: "Panathinaikos" },
//     { name: "Γενς Γιόνσον", number: "6", age: 30, position: "MF", nationality: "Danish", team: "Panathinaikos" },
//     { name: "Ντομαγκοϊ Βίντα", number: "21", age: 34, position: "DF", nationality: "Croatian", team: "Panathinaikos" }
// ];

const player = [];

let playersData = [
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

const pos = ["GK", "DF", "MF", "FW"];

for (let i = 0; i < playersData.length; i++) {
    for (let j = 0; j < playersData[i].players.length; j++) {
        player.push({
            name: playersData[i].players[j],
            team: playersData[i].team,
            // generate data for each player
            number: Math.floor(Math.random() * 99) + 1,
            age: Math.floor(Math.random() * 10) + 20,
            position: '',
            nationality: ["Greek", "Swiss", "Danish", "Croatian", "Albanian", "French", "Spanish", "Italian", "German", "English", "Portuguese", "Brazilian", "Argentinian", "Uruguayan", "Belgian", "Dutch", "Turkish", "Egyptian"][Math.floor(Math.random() * 18)]
        })
    }
}

for (let i = 0; i < player.length; i++) {
    if(i = 0){
        player[i].position = "GK";
    }
    else if(i > 0 && i < 5){
        player[i].position = "DF";
    }
    else if(i > 4 && i < 9){
        player[i].position = "MF";
    }
    else if(i > 8 && i < 11){
        player[i].position = "FW";
    }
}

console.log(player);

// singleTeam.deleteMany({})
//   .then(() => {
//     console.log('All existing items deleted');

//     const newItems = lineupFieldData.map(data => new singleTeam({
//         name: data.name,
//         lineup: data.lineup,
//         fieldName: data.fieldName,
//         fieldLink: data.fieldLink,
//         players: playerData.filter(player => player.team === "AEK")
//     }));

//     // save the new teams to the database
//     return singleTeam.insertMany(newItems);
//   })
//   .then(result => {
//     console.log(`${result.length} new items saved`);
//   })
//   .catch(error => {
//     console.error(error);
//   });

  export default { singleTeam }