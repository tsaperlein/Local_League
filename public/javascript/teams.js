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
const table = document.querySelector("#players-table");
const tableHead = table.querySelector("thead");

// create table header and append it to the table head
const headerRow = createHeaderRow();
tableHead.appendChild(headerRow);

// Add event listener to .name-sticky
const player = document.querySelectorAll('.name-sticky');
player.forEach((player) => {
    player.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.classList.add('modal', 'd-flex', 'justify-content-center', 'align-items-center');
        modal.setAttribute('id', 'player-info-modal');
        modal.innerHTML = `
            <div class="modal-content custom-container">
                <div class="modal-header d-flex flex-row">
                    <div class="player-name"></div>
                    <div class="close-btn">x</div>
                </div>
                <div class="modal-body">
                    <p class="player-goals"></p>
                    <p class="player-yellow-cards"></p>
                    <p class="player-red-cards"></p>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const playerName = player.textContent;
        const playerGoals = player.parentElement.querySelector('.goals');
        const playerYellowCards = player.parentElement.querySelector('.yellow-cards');
        const playerRedCards = player.parentElement.querySelector('.red-cards');

        const modalName = modal.querySelector('.player-name');
        const modalGoals = modal.querySelector('.player-goals');
        const modalYellowCards = modal.querySelector('.player-yellow-cards');
        const modalRedCards = modal.querySelector('.player-red-cards');

        modalName.textContent = playerName;
        modalGoals.textContent = `Goals: ${playerGoals.textContent}`;
        modalYellowCards.textContent = `Yellow Cards: ${playerYellowCards.textContent}`;
        modalRedCards.textContent = `Red Cards: ${playerRedCards.textContent}`;

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        const closeBtn = modal.querySelector('#player-info-modal .close-btn');
        closeBtn.addEventListener('click', () => {
            modal.remove();
            document.body.style.overflow = 'visible';
        });
        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.remove();
                document.body.style.overflow = 'visible';
            }
        });
    });
});