// Function the creates a modal that takes as input html code for form wiht method POST
const createFormModal = (pageOfReturn, labels, option, modalId, button) => {
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

    let matchElement, matchDateElement, statElement, statModalElement, teamPlayersTableElement, playerTrElement, teamLineupElement, fieldInfoElement;
    if (option === "edit") {
        if (modalId === 'edit-match-modal') {
            // Get the match element
            matchElement = button.parentElement.parentElement; // div.match
            matchDateElement = matchElement.previousElementSibling; // div.match-date
        } else if (modalId === 'edit-stat-modal') {
            statElement = button.parentElement.previousElementSibling; // div.row for each stat
            statModalElement = statElement.parentElement.parentElement.previousElementSibling; // div.modal-header for each stat
        } else if (modalId === 'edit-team-modal') {
            // Get the id of the button
            const teamId = button.id.split("-")[2];
            teamLineupElement = button.parentElement.parentElement.nextElementSibling.querySelector(`.${teamId}-lineup`); // div.team-lineup
            fieldInfoElement = teamLineupElement.nextElementSibling; // div.field-info
        } else if (modalId === 'edit-player-modal') {
            teamPlayersTableElement = button.parentElement.parentElement.parentElement.parentElement.parentElement; // div.players-table-{{team.name}}
            playerTrElement = button.parentElement.parentElement.parentElement; // tr.player
        }
        else if(modalId === "edit-lineup-modal"){
            const teamId = button.id.split("-")[2];
            teamLineupElement = button.parentElement.parentElement.nextElementSibling.querySelector(`.${teamId}-lineup`); // div.team-lineup
        }
    }

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
        // Change the input name from string to camelCase
        input.name = labels[i].replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
        input.id = labels[i];

        if (option === "add") {
            if (modalId === "add-player-modal") {
                if (labels[i].includes('team')) {
                    value = button.parentElement.previousElementSibling.firstElementChild.id.split("-")[0];
                    input.value = value;
                }
            }
            if (modalId === "add-stat-modal") {
                if (labels[i].includes('date')) {
                    value = button.id.split("-")[2] + "-" + button.id.split("-")[3] + "-" + button.id.split("-")[4];
                    input.value = value;
                    formGroup.style.display = "none";
                }
                else if (labels[i] === 'home-team') {
                    value = button.id.split("-")[5];
                    input.value = value;
                    formGroup.style.display = "none";
                }
                else if (labels[i] === 'away-team') {
                    value = button.id.split("-")[6];
                    input.value = value;
                    formGroup.style.display = "none";
                }
            }
        }

        if (option === "edit") {
            if (modalId === "edit-match-modal") {
                if (labels[i] === "current-match-date") {
                    value = button.id.split("-")[2] + "-" + button.id.split("-")[3] + "-" + button.id.split("-")[4];
                    formGroup.style.display = "none";
                }
                else if (labels[i] === "state") {
                    value = matchElement.querySelector(".get-" + labels[i]).textContent;
                    input.classList.add(value.toLowerCase());
                }
                else if (labels[i] === "date") {
                    value = button.id.split("-")[2] + "-" + button.id.split("-")[3] + "-" + button.id.split("-")[4];
                }
                else if (labels[i].includes('referee')) {
                    value = matchElement.querySelector(".get-" + labels[i]).textContent.split(":")[1].trim();
                }
                else if (labels[i].includes('time')) {
                    if (matchElement.querySelector(".get-" + labels[i]) === null) {
                        value = '';
                    }
                    else {
                        value = matchElement.querySelector(".get-" + labels[i]).textContent;
                    }
                }
                else if (labels[i].includes('team') && !labels[i].includes('previous')) {
                    value = matchElement.querySelector(".get-" + labels[i]).id.split("-")[1];
                }
                else if (labels[i].includes('previous')) {
                    if (labels[i] === "previous-home-team") {
                        value = matchElement.querySelector(".get-home-team").id.split("-")[1];
                    }
                    else if (labels[i] === "previous-away-team") {
                        value = matchElement.querySelector(".get-away-team").id.split("-")[1];
                    }
                    formGroup.style.display = "none";
                }
                else {
                    value = matchElement.querySelector(".get-" + labels[i]).textContent;
                }
            }
            else if (modalId === "edit-stat-modal") {
                if (labels[i].includes('date')) {
                    value = button.id.split("-")[2] + "-" + button.id.split("-")[3] + "-" + button.id.split("-")[4];
                    input.value = value;
                    formGroup.style.display = "none";
                }
                else if (labels[i] === 'home-team') {
                    value = button.id.split("-")[5];
                    input.value = value;
                    formGroup.style.display = "none";
                }
                else if (labels[i] === 'away-team') {
                    value = button.id.split("-")[6];
                    input.value = value;
                    formGroup.style.display = "none";
                }
                else if (labels[i] === 'statId') {
                    value = button.id.split("-")[7];
                    input.value = value;
                    formGroup.style.display = "none";
                }
                else if (labels[i] === 'team-name') {
                    // Check wether the team is home or away depending on if the textContent of the elements is empty or not
                    console.log(statElement.querySelector(".home-team-player"));
                    if (statElement.querySelector(".home-team-player").firstElementChild !== null) {
                        value = button.id.split("-")[5];
                    } else {
                        value = button.id.split("-")[6];
                    }
                    input.readOnly = true;
                }
                else if (labels[i].includes('player')) {
                    // Check wether the team is home or away depending on if the textContent of the elements is empty or not
                    if (statElement.querySelector(".get-" + labels[i]) !== null) {
                        value = statElement.querySelector(".get-" + labels[i]).textContent;
                    } else {
                        value = statElement.querySelector(".get-" + labels[i]).textContent;
                    }
                }
                else if (labels[i].includes('type')) {
                    if (button.id.split("-")[10] !== undefined) value = button.id.split("-")[9] + " " + button.id.split("-")[10];
                    else value = button.id.split("-")[9];
                }
                else if (labels[i].includes('minute')) {
                    value = button.id.split("-")[8];
                }
            }
            else if (modalId === "edit-player-modal") {
                if (labels[i] === 'previous-team') {
                    value = teamPlayersTableElement.id.split("-")[2];
                    formGroup.style.display = "none";
                }
                else if (labels[i].includes('team')) {
                    value = teamPlayersTableElement.id.split("-")[2];
                }
                else if (labels[i] === "name") {
                    value = playerTrElement.querySelector(".get-" + labels[i]).textContent;
                    input.readOnly = true;
                }
                else {
                    value = playerTrElement.querySelector(".get-" + labels[i]).textContent;
                }
            }
            else if (modalId === "edit-team-modal") {
                if (labels[i] === "previous-name") {
                    value = button.id.split("-")[2];
                    formGroup.style.display = "none";
                }
                else if (labels[i] === "name") {
                    value = button.id.split("-")[2];
                }
                else if (labels[i].includes('team-image')) {
                    // The value is the name of the team in lowercase and the words connected with '-' and .png
                    let teamName = button.id.split("-")[2];
                    teamName = teamName.toLowerCase();
                    value = teamName.replace(/ /g, "-") + ".png";
                }
            }
            else if (modalId === "edit-lineup-modal") {
                let teamName = button.id.split("-")[2];
                teamName = teamName.toLowerCase();
                value = teamName.replace(/ /g, "-") + "-lineup" + ".png";
            }
            input.value = value;
        }

        // ------------- Score/Number ----------
        if (labels[i].includes("score") || labels[i].includes("number")) {
            input.type = "number";
            // Dont allow letters
            input.addEventListener("keyup", () => {
                input.value = input.value.replace(/[a-z]/g, "");
            });
            input.min = 0;
            input.maxLength = 2;
            input.placeholder = "max 2 digits";
            input.required = true;
        }
        else if (labels[i] === "state") {
            input.type = "text";
            // The first letter is uppercase and the rest are lowercase
            input.addEventListener("keyup", () => {
                input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1).toLowerCase();
            });
            input.addEventListener("change", () => {
                if (input.value !== "Final" && input.value !== "Upcoming") {
                    input.setCustomValidity("Please choose one of the options: Final, Upcoming");
                }
                else {
                    input.setCustomValidity("");
                }
            });
            // Before the user presses submit, add a class to the input
            input.addEventListener("keyup", () => {
                if (input.value === 'Final') {
                    input.classList.remove("final");
                    input.classList.remove("upcoming");
                    input.classList.add("final");
                } else if (input.value === 'Upcoming'){
                    input.classList.remove("final");
                    input.classList.remove("upcoming");
                    input.classList.add("upcoming");
                }
            });
            input.placeholder = "Final or Upcoming";
        }
        // ------------- Date ------------------
        else if (labels[i].includes("date")) {
            input.type = "date";
            input.required = true;
        }
        // ------------- Time ------------------
        else if (labels[i].includes("time")) {
            input.type = "time";
            // Step is half hour
            input.step = 1800;
            setInterval(() => {
                if (form.querySelector(".final") != null) input.required = false;
                else if (form.querySelector(".upcoming") != null) input.required = true;
            }, 100);
        }
        // ------------- Images ----------------
        else if (labels[i].includes("image") || labels[i].includes("icon")) {
            input.type = "file";
            input.accept = "image/*";
            input.required = true;
        }
        // ------------- Position -------------
        else if (labels[i].includes("position")) {
            input.type = "text";
            // Dont allow numbers and turn the letters to uppercase
            input.addEventListener("keyup", () => {
                input.value = input.value.replace(/[0-9]/g, "");
                input.value = input.value.toUpperCase();
            });
            input.maxLength = 3;
            input.placeholder = "max 3 letters, e.g. GK";
            input.required = true;
        }
        // ------------- Minute --------------
        else if (labels[i].includes("minute")) {
            input.type = "number";
            // Dont allow letters
            input.addEventListener("keyup", () => {
                input.value = input.value.replace(/[a-z]/g, "");
            });
            input.min = 0;
            input.max = 120;
            input.step = 1;
            input.placeholder = "0-120";
            input.required = true;
        }
        // ------------- Referee -------------
        else if (labels[i].includes("referee")) {
            input.type = "text";
            // Dont allow numbers
            input.addEventListener("keyup", () => {
                input.value = input.value.replace(/[0-9]/g, "");
            });
            input.placeholder = "e.g. John Doe";
        }
        // ------------- Name -------------
        else if (labels[i].includes("name") && !labels[i] === "team-name") {
            input.type = "text";
            input.required = true;
        }
        // ------------- Stat Type -------------
        else if (labels[i].includes("type")) {
            input.type = "text";
            input.addEventListener("keyup", () => {
                input.value = input.value.replace(/[0-9]/g, "");
            });
            input.placeholder = "goal, yellow card, red card";
            // If the type is none of the options, the input is invalid
            input.addEventListener("change", () => {
                if (input.value !== "goal" && input.value !== "yellow card" && input.value !== "red card") {
                    input.setCustomValidity("Please choose one of the options: goal, yellow card, red card");
                }
                else {
                    input.setCustomValidity("");
                }
            });
            input.required = true;
        }
        // ------------- Age -------------
        else if (labels[i].includes("age")) {
            input.type = "number";
            // Dont allow letters
            input.addEventListener("keyup", () => {
                input.value = input.value.replace(/[a-z]/g, "");
            });
            input.min = 18;
            input.max = 45;
            input.step = 1;
            input.placeholder = "min 18 years old";
            input.required = true;
        }
        else if (labels[i] === 'team-name') {
            input.type = "text";
            // Don't allow numbers
            input.addEventListener("keyup", () => {
                input.value = input.value.replace(/[0-9]/g, "");
            });
            input.required = true;
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

// Add match, team, player, stat buttons
const addMatchButton = document.getElementById("add-match");
const addTeamButton = document.getElementById("add-team");
const addPlayerButton = document.getElementById("add-player");

const addStatButtons = document.querySelectorAll(".add-stat-btn");

// Edit match, team, player, stat buttons
const editMatchButtons = document.querySelectorAll(".edit-match-btn");
const editTeamButton = document.querySelector(".edit-team-btn");
const editPlayerButtons = document.querySelectorAll(".edit-player-btn");
const editStatButtons = document.querySelectorAll(".edit-stat-btn");
const editLineupButton = document.querySelector(".change-btn");

// Delete match, team, player, stat buttons
const deleteMatchButtons = document.querySelectorAll(".delete-match-btn");
const deleteTeamButton = document.querySelector(".delete-team-btn");
const deletePlayerButtons = document.querySelectorAll(".delete-player-btn");
const deleteStatButtons = document.querySelectorAll(".delete-stat-btn");

if (window.location.pathname.includes("schedule")) {
    // Add buttons
    addMatchButton.addEventListener("click", () => {
        document.body.style.overflow = 'hidden';
        console.log("add match");
        let formModal = createFormModal("schedule/addMatch", ["date", "state", "time", "home-team", "away-team", "field-name", "main-referee", "assistant-referee"], "add", "add-match-modal", '');
        document.body.appendChild(formModal);
    });
    addStatButtons.forEach((button) => {
        button.addEventListener("click", (button) => {
            let id = button.target.id;
            let addStatButton = document.getElementById(id);
            document.body.style.overflow = 'hidden';
            console.log("add stat");
            let formModal = createFormModal("schedule/addStat", ["match-date", "home-team", "away-team", "team-name", "player-name", "type", "minute"], "add", "add-stat-modal", addStatButton);
            document.body.appendChild(formModal);
        });
    });

    // Edit buttons
    editMatchButtons.forEach((button) => {
        button.addEventListener("click", (button) => {
            let id = button.target.id;
            let editMatchButton = document.getElementById(id);
            document.body.style.overflow = 'hidden';
            console.log("edit match");
            let matchState = editMatchButton.parentElement.previousElementSibling.querySelector('.get-state').textContent;
            let formModal;
            if (matchState === "Final") {
                formModal = createFormModal("schedule/editMatch", ["current-match-date", "date", "time", "previous-home-team", "home-team", "previous-away-team", "away-team", "field-name", "main-referee", "assistant-referee"], "edit", "edit-match-modal", editMatchButton);
            }
            else formModal = createFormModal("schedule/editMatch", ["current-match-date", "date", "state", "time", "previous-home-team", "home-team", "previous-away-team", "away-team", "field-name", "main-referee", "assistant-referee"], "edit", "edit-match-modal", editMatchButton);
            document.body.appendChild(formModal);
        });
    });

    editStatButtons.forEach((button) => {
        button.addEventListener("click", (button) => {
            let id = button.target.id;
            let editStatButton = document.getElementById(id);
            document.body.style.overflow = 'hidden';
            console.log("edit stat");
            let formModal = createFormModal("schedule/addStat", ["match-date", "home-team", "away-team", "statId", "team-name", "player-name", "type", "minute"], "edit", "edit-stat-modal", editStatButton);
            document.body.appendChild(formModal);
        });
    });

    // Delete buttons
    deleteMatchButtons.forEach((button) => {
        button.addEventListener("click", (button) => {
            let id = button.target.id;
            let deleteMatchButton = document.getElementById(id);
            let dataDoc = deleteMatchButton.dataset.doc;
            let matchDate = dataDoc.split("-")[0];
            let homeTeam = dataDoc.split("-")[1];
            // Get the week and the team name from the path of the current page
            let week = window.location.pathname.split("/")[3];
            let team = window.location.pathname.split("/")[4];
            console.log("delete match");
            let result = confirm("Are you sure you want to delete this match?");
            if (result) {
                const endPoint = `/Local-League/schedule/${week}/${team}/${matchDate}/${homeTeam}`;
                fetch(endPoint, {
                    method: "DELETE",
                })
                .then((response) => response.json())
                .then((data) => window.location.href = data.redirect)
                .catch((err) => console.log(err));
            }
        });
    });

    deleteStatButtons.forEach((button) => {
        button.addEventListener("click", (button) => {
            let id = button.target.id;
            let deleteStatButton = document.getElementById(id);
            let dataDoc = deleteStatButton.dataset.doc;
            let matchDate = dataDoc.split("-")[0];
            let homeTeam = dataDoc.split("-")[1];
            let statId = dataDoc.split("-")[2];
            // Get the week and the team name from the path of the current page
            let week = window.location.pathname.split("/")[3];
            let team = window.location.pathname.split("/")[4];
            console.log("delete stat");
            let result = confirm("Are you sure you want to delete this stat?");
            if (result) {
                const endPoint = `/Local-League/schedule/${week}/${team}/${matchDate}/${homeTeam}/${statId}`;
                fetch(endPoint, {
                    method: "DELETE",
                })
                .then((response) => response.json())
                .then((data) => window.location.href = data.redirect)
                .catch((err) => console.log(err));
            }
        });
    });
}

if (window.location.pathname.includes("standings")) {
    // Add team modal
    addTeamButton.addEventListener("click", () => {
        document.body.style.overflow = 'hidden';
        console.log("add team");
        let formModal = createFormModal("standings", ["name", "team-icon", "lineup-image", "field-image", "field-name"], "add", "add-team-modal", '');
        document.body.appendChild(formModal);
    });
}

if (window.location.pathname.includes("teams")) {
    // Add player modal
    addPlayerButton.addEventListener("click", () => {
        document.body.style.overflow = 'hidden';
        console.log("add player");
        let formModal = createFormModal("teams/addPlayer", ["name", "team", "jersey-number", "age", "position", "nationality"], "add", "add-player-modal", addPlayerButton);
        document.body.appendChild(formModal);
    });

    // Edit team modal
    editTeamButton.addEventListener("click", () => {
        document.body.style.overflow = 'hidden';
        console.log("edit team");
        let formModal = createFormModal("teams/editTeam", ["previous-name", "name", "team-image"], "edit", "edit-team-modal", editTeamButton);
        document.body.appendChild(formModal);
    });

    editLineupButton.addEventListener("click", () => {
        document.body.style.overflow = 'hidden';
        console.log("edit lineup");
        let team = editLineupButton.id.split("-")[2];
        let formModal = createFormModal(`teams/${team}/editLineup`, ["lineup-image"], "edit", "edit-lineup-modal", editLineupButton);
        document.body.appendChild(formModal);
    });

    // Edit player modal
    editPlayerButtons.forEach((button) => {
        button.addEventListener("click", (button) => {
            let id = button.target.id;
            let editPlayerButton = document.getElementById(id);
            document.body.style.overflow = 'hidden';
            console.log("edit player");
            let formModal = createFormModal("teams/editPlayer", ["name", "previous-team", "team", "jersey-number", "age", "position", "nationality"], "edit", "edit-player-modal", editPlayerButton);
            document.body.appendChild(formModal);
        });
    });

    // Delete team modal
    deleteTeamButton.addEventListener("click", () => {
        console.log("delete team");
        let result = confirm("Are you sure you want to delete this team?");
        if (result) {
            const endPoint = `/Local-League/teams/${deleteTeamButton.dataset.doc}`;
            fetch(endPoint, {
                method: "DELETE",
            })
            .then((response) => response.json())
            .then((data) => window.location.href = data.redirect)
            .catch((err) => console.log(err));
        }
    });
    
    // Delete player modal
    deletePlayerButtons.forEach((button) => {
        button.addEventListener("click", (button) => {
            let id = button.target.id;
            let deletePlayerButton = document.getElementById(id);
            let dataDoc = deletePlayerButton.dataset.doc;
            let teamName = dataDoc.split("-")[0];
            let playerName = dataDoc.split("-")[1];
            console.log("delete player");
            let result = confirm("Are you sure you want to delete this player?");
            if (result) {
                const endPoint = `/Local-League/teams/${teamName}/${playerName}`;
                fetch(endPoint, {
                    method: "DELETE",
                })
                .then((response) => response.json())
                .then((data) => window.location.href = data.redirect)
                .catch((err) => console.log(err));
            }
        });
    });
}

// --------- Resets the Local Storage ---------
const selectedOption = localStorage.getItem('selectedOption');
// If the user goes to the pages which url includes "standings", "teams", "main-page", erase the selectedOption from localStorage
if (window.location.pathname.includes("standings") || window.location.pathname.includes("teams") || window.location.pathname.includes("main-page")) {
    localStorage.removeItem('selectedOption');
}// -------------------------------------------