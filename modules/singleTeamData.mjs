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
    {name: "AEK", lineup: "aek-lineup.png", fieldName: "OPAP Arena Αγιά Σοφιά", fieldLink: "aek-opap-arena.jpg"},
    {name: "Panathinaikos", lineup: "pao-lineup.png", fieldName: "Γήπεδο Λεοφώρου Αλεξάνδρας", fieldLink: "paoLeof.jpg" }
];

const playerData = [
    { name: "Γιώργος Αθανασιάδης", number: "30", age: 30, position: "GK", nationality: "Greek", team: "AEK" },
    { name: "Άρολντ Μουκουντί", number: "2", age: 26, position: "DF", nationality: "French", team: "AEK" },
    { name: "Λάζαρος Ρότα", number: "12", age: 26, position: "DF", nationality: "Greek", team: "AEK" },
    { name: "Γεράσιμος Μήτογλου", number: "24", age: 24, position: "DF", nationality: "Greek", team: "AEK" },
    { name: "Έχσαν Χατζισαφί", number: "28", age: 33, position: "DF", nationality: "Iranian", team: "AEK" },
    { name: "Ντάμιαν Σιμάνσκι", number: "4", age: 28, position: "MF", nationality: "Polish", team: "AEK" },
    { name: "Όρμπελιν Πινέδα", number: "13", age: 27, position: "MF", nationality: "Mexican", team: "AEK" },
    { name: "Μιγιάτ Γκατσίνοβιτς", number: "8", age: 28, position: "MF", nationality: "Serbian", team: "AEK" },
    { name: "Νίκλας Ελίασον", number: "19", age: 28, position: "MF", nationality: "Swedish", team: "AEK" },
    { name: "Σέρχιο Αραούχο", number: "11", age: 31, position: "FW", nationality: "Argentinean", team: "AEK" },
    { name: "Λιβάι Γκαρσία", number: "7", age: 26, position: "FW", nationality: "Trinidadian", team: "AEK" },
    { name: "Πέτρος Μάνταλος", number: "20", age: 32, position: "MF", nationality: "Greek", team: "AEK" },
    { name: "Στίβεν Τσούμπερ", number: "10", age: 32, position: "FW", nationality: "Swiss", team: "AEK" },
    { name: "Γενς Γιόνσον", number: "6", age: 30, position: "MF", nationality: "Danish", team: "AEK" },
    { name: "Ντομαγκοϊ Βίντα", number: "21", age: 34, position: "DF", nationality: "Croatian", team: "AEK" },
    { name: "Γιώργος Αθανασιάδης", number: "30", age: 30, position: "GK", nationality: "Greek", team: "Panathinaikos" },
    { name: "Άρολντ Μουκουντί", number: "2", age: 26, position: "DF", nationality: "French", team: "Panathinaikos" },
    { name: "Λάζαρος Ρότα", number: "12", age: 26, position: "DF", nationality: "Greek", team: "Panathinaikos" },
    { name: "Γεράσιμος Μήτογλου", number: "24", age: 24, position: "DF", nationality: "Greek", team: "Panathinaikos" },
    { name: "Έχσαν Χατζισαφί", number: "28", age: 33, position: "DF", nationality: "Iranian", team: "Panathinaikos" },
    { name: "Ντάμιαν Σιμάνσκι", number: "4", age: 28, position: "MF", nationality: "Polish", team: "Panathinaikos" },
    { name: "Όρμπελιν Πινέδα", number: "13", age: 27, position: "MF", nationality: "Mexican", team: "Panathinaikos" },
    { name: "Μιγιάτ Γκατσίνοβιτς", number: "8", age: 28, position: "MF", nationality: "Serbian", team: "Panathinaikos" },
    { name: "Νίκλας Ελίασον", number: "19", age: 28, position: "MF", nationality: "Swedish", team: "Panathinaikos" },
    { name: "Σέρχιο Αραούχο", number: "11", age: 31, position: "FW", nationality: "Argentinean", team: "Panathinaikos" },
    { name: "Λιβάι Γκαρσία", number: "7", age: 26, position: "FW", nationality: "Trinidadian", team: "Panathinaikos" },
    { name: "Πέτρος Μάνταλος", number: "20", age: 32, position: "MF", nationality: "Greek", team: "Panathinaikos" },
    { name: "Στίβεν Τσούμπερ", number: "10", age: 32, position: "FW", nationality: "Swiss", team: "Panathinaikos" },
    { name: "Γενς Γιόνσον", number: "6", age: 30, position: "MF", nationality: "Danish", team: "Panathinaikos" },
    { name: "Ντομαγκοϊ Βίντα", number: "21", age: 34, position: "DF", nationality: "Croatian", team: "Panathinaikos" }
];

singleTeam.deleteMany({})
  .then(() => {
    console.log('All existing items deleted');

    const newItems = lineupFieldData.map(data => new singleTeam({
        name: data.name,
        lineup: data.lineup,
        fieldName: data.fieldName,
        fieldLink: data.fieldLink,
        players: playerData.filter(player => player.team === data.name)
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