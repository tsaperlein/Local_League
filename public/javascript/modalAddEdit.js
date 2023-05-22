// Function the creates a modal that takes as input html code for form wiht method POST
const createFormModal = (pageOfReturn, labels, option, modalId) => {
    const modal = document.createElement("div");
    modal.classList.add('modal', 'option-modal', 'd-flex', 'justify-content-center', 'align-items-center');
    modal.setAttribute("id", modalId);
    // Modal content
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content", "column");
    // Close button
    const closeButton = document.createElement("span");
    closeButton.classList.add("close-btn");
    closeButton.textContent = "x";

    const form = document.createElement("form");
    form.action = '/Local-League/' + pageOfReturn;
    form.method = "POST";
    form.classList.add("form");
    // Form groups
    for (let i = 0; i < labels.length; i++) {
        let formGroup = document.createElement("div");
        formGroup.classList.add("form-group");

        let label = document.createElement("label");
        label.for = labels[i];
        label.textContent = labels[i];
        label.classList.add("control-label", "col-xs-4");

        let inputDiv = document.createElement("div");
        inputDiv.classList.add("col-xs-8");

        let input = document.createElement("input");
        input.type = "text";
        input.name = labels[i];
        input.id = labels[i];
        // If the label consists the word 'score' then the input is a number
        if (labels[i].includes("Score") || labels[i].includes("Number")) {
            input.type = "number";
            input.placeholder = "0";
        } else if (labels[i].includes("Date")) {
            input.type = "date";
        } else if (labels[i].includes("Time")) {
            input.type = "time";
        } else if (labels[i].includes("Image")) {
            input.type = "file";
            input.accept = "image/*";
        } else if (labels[i].includes("Position")) {
            input.type = "text";
            input.maxLength = 3;
            // turn the letters to uppercase
            input.addEventListener("keyup", () => {
                input.value = input.value.toUpperCase();
            });
        }
        else input.type = "text";

        input.classList.add("form-control");

        inputDiv.appendChild(input);
        formGroup.appendChild(label);
        formGroup.appendChild(inputDiv);
        form.appendChild(formGroup);
    }
    // Submit button
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.classList.add("btn", "btn-primary");
    submitButton.innerHTML = option.charAt(0).toUpperCase() + option.slice(1);
    
    form.appendChild(submitButton);
    modalContent.appendChild(closeButton);
    modalContent.appendChild(form);
    modal.appendChild(modalContent);

    // When the user clicks the X button, close the modal
    modal.querySelector('span.close-btn').addEventListener('click', () => {
        modal.remove();
        document.body.style.overflow = 'visible';
    });
    // When the user clicks outside the modal, close the modal
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.remove();
            document.body.style.overflow = 'visible';
        }
    });

    return modal;
}

const addMatchButton = document.getElementById("add-match");
const addTeamButton = document.getElementById("add-team");
const addPlayerButton = document.getElementById("add-player");

// Add match modal
// if path is /Local-League/schedule run this
if (window.location.pathname.includes("schedule")) {
    addMatchButton.addEventListener("click", () => {
        document.body.style.overflow = 'hidden';
        console.log("add match");
        let formModal = createFormModal("'schedule'", ["Date", "Time", "Home Team", "Away Team", "Main Referee", "Assistant Referee"], "add", "add-match-modal");
        document.body.appendChild(formModal);
    });
}

// Add team modal
if (window.location.pathname.includes("standings")) {
    addTeamButton.addEventListener("click", () => {
        document.body.style.overflow = 'hidden';
        console.log("add team");
        let formModal = createFormModal("'standings'", ["Name", "Team Image", "Lineup Image", "Field Image", "Field Name"], "add", "add-team-modal");
        document.body.appendChild(formModal);
    });
}

// Add player modal
if (window.location.pathname.includes("teams")) {
    addPlayerButton.addEventListener("click", () => {
        document.body.style.overflow = 'hidden';
        console.log("add player");
        let formModal = createFormModal("'players'", ["Name", "Team", "Jersey Number", "Position", "Nationality"], "add", "add-player-modal");
        document.body.appendChild(formModal);
    });
}