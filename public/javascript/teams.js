// Function that creates the table header row
function createHeaderRow() {
    const headerRow = document.createElement("tr");
    const nameHeader = document.createElement("th");
    const jerseyNumberHeader = document.createElement("th");
    const ageHeader = document.createElement("th");
    const positionHeader = document.createElement("th");
    const nationalityHeader = document.createElement("th");
    nameHeader.classList.add("name-header");
    jerseyNumberHeader.classList.add("jn-header");
    ageHeader.classList.add("age-header");
    positionHeader.classList.add("pos-header");
    nationalityHeader.classList.add("nation-header");

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

// Get the table element and its head and body
const table = document.querySelector(".players-table");
const tableHead = table.querySelector("thead");

// create table header and append it to the table head
const headerRow = createHeaderRow();
tableHead.appendChild(headerRow);

// Add event listener to .name-sticky
const player = document.querySelectorAll('.name-sticky')
player.forEach((player) => {
    player.addEventListener('click', () => {
        const playerJNumber = player.parentElement.querySelector('.player-number').innerHTML;
        // Search for the modal depending on the player's jersey number
        const modal = document.getElementById(`${playerJNumber}-info-modal`);

        modal.style.visibility = 'visible';
        document.body.style.overflow = 'hidden';

        const closeBtn = modal.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            modal.style.visibility = 'hidden';
            document.body.style.overflow = 'visible';
        });
        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.style.visibility = 'hidden';
                document.body.style.overflow = 'visible';
            }
        });
    });
});