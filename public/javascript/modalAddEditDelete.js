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
        label.textContent = labels[i].replace(/-/g, ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        label.classList.add("control-label", "col-xs-4");

        let inputDiv = document.createElement("div");
        inputDiv.classList.add("col-xs-8");

        let input = document.createElement("input");
        input.type = "text";
        input.name = labels[i];
        input.id = labels[i];

        if (option === "edit") input.value = document.getElementById(labels[i]).textContent;

        // If the label consists the word 'score' then the input is a number
        if (labels[i].includes("score") || labels[i].includes("number")) {
            input.type = "number";
            input.min = 0;
            input.placeholder = "0";
        }
        else if (labels[i].includes("date")) {
            input.type = "date";
        }
        else if (labels[i].includes("time")) {
            input.type = "time";
            input.placeholder = "00:00";
        }
        else if (labels[i].includes("image")) {
            input.type = "file";
            input.accept = "image/*";
        }
        else if (labels[i].includes("position")) {
            input.type = "text";
            input.maxLength = 3;
            // turn the letters to uppercase
            input.addEventListener("keyup", () => {
                input.value = input.value.toUpperCase();
            });
        }
        else if (labels[i].includes("minute")) {
            input.type = "number";
            input.min = 0;
            input.max = 120;
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

// Add match, team, player, stats buttons
const addMatchButton = document.getElementById("add-match");
const addTeamButton = document.getElementById("add-team");
const addPlayerButton = document.getElementById("add-player");
const addStatButton = document.getElementById("add-stat");

// Edit match, team, player, stats buttons
const editMatchButton = document.getElementById("edit-match");
const editTeamButton = document.getElementById("edit-team");
const editPlayerButton = document.getElementById("edit-player");
const editStatButton = document.getElementById("edit-stat");

// Delete match, team, player buttons

if (window.location.pathname.includes("schedule")) {
    // Add buttons
    addMatchButton.addEventListener("click", () => {
        document.body.style.overflow = 'hidden';
        console.log("add match");
        let formModal = createFormModal("'schedule'", ["date", "time", "home-team", "away-team", "main-referee", "assistant-referee"], "add", "add-match-modal");
        document.body.appendChild(formModal);
    });
    addStatButton.addEventListener("click", () => {
        document.body.style.overflow = 'hidden';
        console.log("add stat");
        let formModal = createFormModal("'stats'", ["team-name", "player-name", "type", "minute"], "add", "add-stat-modal");
        document.body.appendChild(formModal);
    });

    // Edit buttons
    editMatchButton.addEventListener("click", () => {
        document.body.style.overflow = 'hidden';
        console.log("edit match");
        let formModal = createFormModal("schedule", ["date", "time", "home-team", "away-team", "main-referee", "assistant-referee"], "edit", "edit-match-modal");
        document.body.appendChild(formModal);
    });
}

// Add team modal
if (window.location.pathname.includes("standings")) {
    addTeamButton.addEventListener("click", () => {
        document.body.style.overflow = 'hidden';
        console.log("add team");
        let formModal = createFormModal("standings", ["name", "team-image", "lineup-image", "field-image", "field-name"], "add", "add-team-modal");
        document.body.appendChild(formModal);
    });
}

// Add player modal
if (window.location.pathname.includes("teams")) {
    addPlayerButton.addEventListener("click", () => {
        document.body.style.overflow = 'hidden';
        // console.log("add player");
        let formModal = createFormModal("'players'", ["name", "team", "jesrey-number", "position", "nationality"], "add", "add-player-modal");
        document.body.appendChild(formModal);
    });
}