const lineupFieldData = [
    {name: "AEK", icon: "aek.png", lineup: "aek-lineup.png", fieldName: "Arena Αγιά Σοφιά", fieldLink: "aek-opap-arena.jpg"},
    {name: "Olympiakos", icon: "osfp.png", lineup: "osfp-lineup.png", fieldName: "Arena Αγιά Σοφιά", fieldLink: "osfp-arena.jpg" },
    {name: "Panathinaikos", icon: "pao.png", lineup: "pao-lineup.png", fieldName: "Γήπεδο Λεοφώρου Αλεξάνδρας", fieldLink: "paoLeof.jpg" },
    {name: "PAOK", icon: "paok.png", lineup: "paok-lineup.png", fieldName: "Arena Αγιά Σοφιά", fieldLink: "paok-arena.jpg" },
    {name: "Team5", icon: "home-team.png", lineup: "home-team-lineup.png", fieldName: "Arena Αγιά Σοφιά", fieldLink: "home-team-arena.jpg" },
    {name: "Team6", icon: "away-team.png", lineup: "away-team-lineup.png", fieldName: "Arena Αγιά Σοφιά", fieldLink: "away-team-arena.jpg" },
    {name: "Team7", icon: "team7.png", lineup: "team7-lineup.png", fieldName: "Arena Αγιά Σοφιά", fieldLink: "team7-arena.jpg" },
    {name: "Napoli", icon: "napoli.png", lineup: "napoli-lineup.png", fieldName: "Arena Αγιά Σοφιά", fieldLink: "napoli-arena.jpg" },
    {name: "Barcelona", icon: "barc.png", lineup: "barc-lineup.png", fieldName: "Arena Αγιά Σοφιά", fieldLink: "barc-arena.jpg" },
    {name: "Juventus", icon: "juve.png", lineup: "juve-lineup.png", fieldName: "Arena Αγιά Σοφιά", fieldLink: "juve-arena.jpg" },
    {name: "PSG", icon: "psg.png", lineup: "psg-lineup.png", fieldName: "Arena Αγιά Σοφιά", fieldLink: "psg-arena.jpg" },
    {name: "Arsenal", icon: "arsenal.png", lineup: "arsenal-lineup.png", fieldName: "Arena Αγιά Σοφιά", fieldLink: "arsenal-arena.jpg" },
    {name: "Fenerbache", icon: "fener.png", lineup: "fener-lineup.png", fieldName: "Arena Αγιά Σοφιά", fieldLink: "fener-arena.jpg" },
    {name: "Liverpool", icon: "live.png", lineup: "live-lineup.png", fieldName: "Arena Αγιά Σοφιά", fieldLink: "live-arena.jpg" },
    {name: "Porto", icon: "porto.png", lineup: "porto-lineup.png", fieldName: "Arena Αγιά Σοφιά", fieldLink: "porto-arena.jpg" },
];

// Create a complete team lineup array for system 4-1-3-2
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
    { name: "Ντομαγκοϊ Βίντα", number: "21", age: 34, position: "DF", nationality: "Croatian", team: "AEK" }
];

// Function that creates the lineup
function createLineup() {
    const lineup = document.querySelector(".team-lineup");
    let lineupImg = document.createElement("img");
    lineupImg.src = "../../lineups/" + lineupFieldData[0].lineup;
    lineupImg.alt = "Lineup of the players";
    lineupImg.classList.add("team-lineup-img");
    lineup.appendChild(lineupImg);
}

// Function that creates the team field
function createField() {
    const field = document.querySelector(".field-info");
    let fieldImg = document.createElement("img");
    fieldImg.src = "../../fields/" + lineupFieldData[0].fieldLink;
    fieldImg.alt = "Field of AEK";
    fieldImg.classList.add("field-img");
    field.appendChild(fieldImg);
    let fieldA = document.createElement("a");
    fieldA.href = "https://www.google.com/maps/place/%CE%93%CE%AE%CF%80%CE%B5%CE%B4%CE%BF+%CE%91%CE%95%CE%9A+%CE%9F%CE%A0%CE%91%CE%A0+%CE%91%CF%81%CE%AD%CE%BD%CE%B1/@38.0371755,23.7247421,15z/data=!3m1!4b1!4m6!3m5!1s0x14a1a3c320ca2e4f:0x74149d3e47aa9534!8m2!3d38.0371598!4d23.7416294!16s%2Fm%2F0zdkkpv";
    fieldA.innerText = lineupFieldData[0].fieldName;
    field.appendChild(fieldA);
}

// Function that creates the table header row
function createHeaderRow() {
    const headerRow = document.createElement("tr");
    const nameHeader = document.createElement("th");
    const jerseyNumberHeader = document.createElement("th");
    const ageHeader = document.createElement("th");
    const positionHeader = document.createElement("th");
    const nationalityHeader = document.createElement("th");

    nameHeader.innerHTML = "<a class='header-button name-btn'>Name &nbsp;<i class='fa fa-sort'></i></a>";
    jerseyNumberHeader.innerHTML = "<a class='header-button jn-btn'>Jersey Number&nbsp;<i class='fa fa-sort'></i></a>";
    ageHeader.innerHTML = "<a class='header-button age-btn'>Age &nbsp;<i class='fa fa-sort'></i></a>";
    positionHeader.innerHTML = "<a class='header-button pos-btn'>Position &nbsp;<i class='fa fa-sort'></i></a>";
    nationalityHeader.innerHTML = "<a class='header-button nation-btn'>Nationality &nbsp;<i class='fa fa-sort'></i></a>";

    headerRow.appendChild(nameHeader);
    headerRow.appendChild(jerseyNumberHeader);
    headerRow.appendChild(ageHeader);
    headerRow.appendChild(positionHeader);
    headerRow.appendChild(nationalityHeader);

    nameHeader.classList.add("name-btn");

    return headerRow;
}

// Function that creates the table rows for each team
function createTableRows(playerData) {
    let tableRows = [];

    playerData.forEach((playerData) => {
        const playerRow = document.createElement("tr");
        const nameCell = document.createElement("td");
        const jerseyNumberCell = document.createElement("td");
        const ageCell = document.createElement("td");
        const positionCell = document.createElement("td");
        const nationalityCell = document.createElement("td");

        const name = playerData.name;
        const jerseyNumber = playerData.number;
        const age = playerData.age;
        const position = playerData.position;
        const nationality = playerData.nationality;

        nameCell.textContent = name;
        jerseyNumberCell.textContent = jerseyNumber;
        ageCell.textContent = age;
        positionCell.textContent = position;
        nationalityCell.textContent = nationality;

        playerRow.appendChild(nameCell);
        playerRow.appendChild(jerseyNumberCell);
        playerRow.appendChild(ageCell);
        playerRow.appendChild(positionCell);
        playerRow.appendChild(nationalityCell);

        nameCell.classList.add("name-sticky");

        tableRows.push(playerRow.innerHTML);
    });
    return tableRows;
}

// Get the table element and its head and body
const table = document.getElementById("players-table");
const tableHead = table.querySelector("thead");
const tableBody = table.querySelector("tbody");

// create table header and append it to the table head
const headerRow = createHeaderRow();
tableHead.appendChild(headerRow);

// create table rows and append them to the table body
const rows = createTableRows(playerData);
rows.forEach((rowHTML) => {
    const row = document.createElement('tr');
    row.innerHTML = rowHTML;
    tableBody.appendChild(row);
});

createLineup();
createField();