import mongoose from 'mongoose';
import player_obj from './playerData.mjs';

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
        required: false
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

const { Player } = player_obj;

//console.log(player);

// singleTeam.deleteMany({})
//     .then(() => {
//         console.log('All existing items deleted');

//         Player.find({}).select({name: 1, team: 1, _id: 0}).lean().then(players => {
//             const newItems = lineupFieldData.map(data => new singleTeam({
//                 name: data.name,
//                 lineup: data.lineup,
//                 fieldName: data.fieldName,
//                 fieldLink: data.fieldLink,
//                 players: players.filter(player => player.team === data.name).map(player => player.name)
//             }));

//             // save the new teams to the database
//             return singleTeam.insertMany(newItems);
//         })
//         .then(result => {
//             console.log(`${result.length} new items saved`);
//         })
//     })
//     .catch(error => {
//         console.error(error);
//     });

export default { singleTeam }