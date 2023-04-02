const lineupFieldData = [
    {icon: "aek.png", lineup: "aek-lineup.png", fieldName: "Arena Αγιά Σοφιά", fieldLink: "aek-arena.jpg"},
    { icon: "osfp.png", lineup: "osfp-lineup.png", fieldName: "Arena Αγιά Σοφιά", fieldLink: "osfp-arena.jpg" },
    { icon: "pao.png", lineup: "pao-lineup.png", fieldName: "Arena Αγιά Σοφιά", fieldLink: "pao-arena.jpg" },
    { icon: "paok.png", lineup: "paok-lineup.png", fieldName: "Arena Αγιά Σοφιά", fieldLink: "paok-arena.jpg" },
    { icon: "home-team.png", lineup: "home-team-lineup.png", fieldName: "Arena Αγιά Σοφιά", fieldLink: "home-team-arena.jpg" },
    { icon: "away-team.png", lineup: "away-team-lineup.png", fieldName: "Arena Αγιά Σοφιά", fieldLink: "away-team-arena.jpg" },
    { icon: "team7.png", lineup: "team7-lineup.png", fieldName: "Arena Αγιά Σοφιά", fieldLink: "team7-arena.jpg" },
    { icon: "napoli.png", lineup: "napoli-lineup.png", fieldName: "Arena Αγιά Σοφιά", fieldLink: "napoli-arena.jpg" },
    { icon: "barc.png", lineup: "barc-lineup.png", fieldName: "Arena Αγιά Σοφιά", fieldLink: "barc-arena.jpg" },
    { icon: "juve.png", lineup: "juve-lineup.png", fieldName: "Arena Αγιά Σοφιά", fieldLink: "juve-arena.jpg" },
    { icon: "psg.png", lineup: "psg-lineup.png", fieldName: "Arena Αγιά Σοφιά", fieldLink: "psg-arena.jpg" },
    { icon: "arsenal.png", lineup: "arsenal-lineup.png", fieldName: "Arena Αγιά Σοφιά", fieldLink: "arsenal-arena.jpg" },
    { icon: "fener.png", lineup: "fener-lineup.png", fieldName: "Arena Αγιά Σοφιά", fieldLink: "fener-arena.jpg" },
    { icon: "live.png", lineup: "live-lineup.png", fieldName: "Arena Αγιά Σοφιά", fieldLink: "live-arena.jpg" },
    { icon: "porto.png", lineup: "porto-lineup.png", fieldName: "Arena Αγιά Σοφιά", fieldLink: "porto-arena.jpg" },
];

// Create a complete team lineup array for system 4-1-3-2
const playerData = [
    { name: "Αντώνης Παπαδόπουλος", number: "1", age: 23, position: "GK", nationality: "Greek", team: "aek" },
    { name: "Γιώργος Παπαδόπουλος", number: "2", age: 23, position: "DF", nationality: "Greek", team: "aek" },
    { name: "Γιώργος Παπαδόπουλος", number: "3", age: 23, position: "DF", nationality: "Greek", team: "aek" },
    { name: "Γιώργος Παπαδόπουλος", number: "4", age: 23, position: "DF", nationality: "Greek", team: "aek" },
    { name: "Γιώργος Παπαδόπουλος", number: "5", age: 23, position: "DF", nationality: "Greek", team: "aek" },
    { name: "Γιώργος Παπαδόπουλος", number: "6", age: 23, position: "DF", nationality: "Greek", team: "aek" },
    { name: "Γιώργος Παπαδόπουλος", number: "7", age: 23, position: "MF", nationality: "Greek", team: "aek" },
    { name: "Γιώργος Παπαδόπουλος", number: "8", age: 23, position: "MF", nationality: "Greek", team: "aek" },
    { name: "Γιώργος Παπαδόπουλος", number: "9", age: 23, position: "MF", nationality: "Greek", team: "aek" },
    { name: "Γιώργος Παπαδόπουλος", number: "10", age: 23, position: "MF", nationality: "Greek", team: "aek" },
    { name: "Γιώργος Παπαδόπουλος", number: "11", age: 23, position: "MF", nationality: "Greek", team: "aek" },
    { name: "Γιώργος Παπαδόπουλος", number: "12", age: 23, position: "FW", nationality: "Greek", team: "aek" },
    { name: "Γιώργος Παπαδόπουλος", number: "13", age: 23, position: "FW", nationality: "Greek", team: "aek" },
    { name: "Γιώργος Παπαδόπουλος", number: "14", age: 23, position: "FW", nationality: "Greek", team: "aek" },
    { name: "Γιώργος Παπαδόπουλος", number: "15", age: 23, position: "FW", nationality: "Greek", team: "aek" }
];

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