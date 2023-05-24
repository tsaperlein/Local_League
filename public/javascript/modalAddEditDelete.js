// Function the creates a modal that takes as input html code for form wiht method POST
const createFormModal = (pageOfReturn, labels, option, modalId, button) => {
    if (option === "delete") {
        // Create a form with method POST, but send it without the user clicking the submit button
        const form = document.createElement("form");
        form.action = '/Local-League/' + pageOfReturn;
        form.method = "POST";
        form.classList.add("form");
        // Create a hidden input with the name of the id of the element to delete
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = (modalId.split("-")[1] + "Information").replace(/ /g, '');
        input.value = button.id.split("-").slice(2).join("-");

        form.appendChild(input);
        form.submit();
    } else {
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

            if (option === "edit") {
                if (modalId === "edit-match-modal") {
                    if (labels[i] === "date") {
                        value = findTheDate(matchDateElement.textContent);
                    }
                    else if (labels[i].includes('referee')) {
                        value = matchElement.querySelector(".get-" + labels[i]).textContent.split(":")[1].trim();
                    }
                    else {
                        if (labels[i] === "time" && matchElement.querySelector(".get-" + labels[i]) === null) continue;
                        value = matchElement.querySelector(".get-" + labels[i]).textContent;
                    }
                }
                else if (modalId === "edit-stat-modal") {
                    if (labels[i].includes('team')) {
                        // Check wether the team is home or away depending on if the textContent of the elements is empty or not
                        if (statElement.querySelector(".home-team-player").firstElementChild !== null) {
                            value = statModalElement.querySelector(".get-home-" + labels[i]).textContent;
                        } else {
                            value = statModalElement.querySelector(".get-away-" + labels[i]).textContent;
                        }
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
                        if (button.id.split("-")[5] !== undefined) value = button.id.split("-")[4] + " " + button.id.split("-")[5];
                        else value = button.id.split("-")[4];
                    }
                    else if (labels[i].includes('minute')) {
                        value = button.id.split("-")[3];
                    }
                }
                else if (modalId === "edit-player-modal") {
                    if (labels[i].includes('team')) {
                        value = teamPlayersTableElement.id.split("-")[2];
                    }
                    else {
                        console.log(".get-" + labels[i]);
                        console.log(playerTrElement.querySelector(".get-" + labels[i]));
                        value = playerTrElement.querySelector(".get-" + labels[i]).textContent;
                    }
                }
                else if (modalId === "edit-team-modal") {
                    if (labels[i] === "name") {
                        value = button.id.split("-")[2];
                    }
                    else if (labels[i].includes('team-image')) {
                        // The value is the name of the team in lowercase and the words connected with '-' and .png
                        let teamName = button.id.split("-")[2];
                        teamName = teamName.toLowerCase();
                        value = teamName.replace(/ /g, "-") + ".png";
                    }
                    else if (labels[i].includes('lineup')) {
                        value = teamLineupElement.querySelector(".get-" + labels[i]).textContent;
                    }
                    else if (labels[i].includes('field-name')) {
                        value = fieldInfoElement.querySelector(".get-" + labels[i]).textContent;
                    }
                    else if (labels[i].includes('field-image')) {
                        // The value is the name of the field in lowercase and the words connected with '-' and .png
                        let fieldName = fieldInfoElement.querySelector(".get-" + labels[i]).src;
                        fieldName = fieldName.split("/")[fieldName.split("/").length - 1];
                    }
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
                input.required = true;
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
                input.placeholder = "max 120th minute";
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
            else if (labels[i].includes("name")) {
                input.type = "text";
                input.required = true;
            }
            // ------------- Stat Type -------------
            else if (labels[i].includes("type")) {
                input.type = "text";
                input.addEventListener("keyup", () => {
                    input.value = input.value.replace(/[0-9]/g, "");
                });
                input.maxLength = 11;
                input.placeholder = "max 11 letters, e.g. yellow card";
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
}

function findTheDate(date) {
    let dateArray = date.split(" ");
    let day = dateArray[2];
    if (day.length === 1) day = '0' + day;

    let month = dateArray[1];
    switch (month) {
        case "Jan":
            month = '01';
            break;
        case "Feb":
            month = '02';
            break;
        case "Mar":
            month = '03';
            break;
        case "Apr":
            month = '04';
            break;
        case "May":
            month = '05';
            break;
        case "Jun":
            month = '06';
            break;
        case "Jul":
            month = '07';
            break;
        case "Aug":
            month = '08';
            break;
        case "Sep":
            month = '09';
            break;
        case "Oct":
            month = '10';
            break;
        case "Nov":
            month = '11';
            break;
        case "Dec":
            month = '12';
            break;
    }

    let year = '2023';

    return year + "-" + month + "-" + day;
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
        let formModal = createFormModal("schedule", ["date", "time", "home-team", "away-team", "field-name", "main-referee", "assistant-referee"], "add", "add-match-modal", '');
        document.body.appendChild(formModal);
    });
    addStatButtons.forEach((button) => {
        button.addEventListener("click", (button) => {
            let id = button.target.id;
            let addStatButton = document.getElementById(id);
            document.body.style.overflow = 'hidden';
            console.log("add stat");
            let formModal = createFormModal("schedule", ["team-name", "player-name", "type", "minute"], "add", "add-stat-modal", addStatButton);
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
            let formModal = createFormModal("schedule", ["date", "time", "home-team", "away-team", "field-name", "main-referee", "assistant-referee"], "edit", "edit-match-modal", editMatchButton);
            document.body.appendChild(formModal);
        });
    });
    editStatButtons.forEach((button) => {
        button.addEventListener("click", (button) => {
            let id = button.target.id;
            let editStatButton = document.getElementById(id);
            document.body.style.overflow = 'hidden';
            console.log("edit stat");
            let formModal = createFormModal("schedule", ["team-name", "player-name", "type", "minute"], "edit", "edit-stat-modal", editStatButton);
            document.body.appendChild(formModal);
        });
    });

    // Delete buttons
    deleteMatchButtons.forEach((button) => {
        button.addEventListener("click", (button) => {
            let id = button.target.id;
            let deleteMatchButton = document.getElementById(id);
            document.body.style.overflow = 'hidden';
            console.log("delete match");
            let result = confirm("Are you sure you want to delete this match?");
            if (result) {
                createFormModal("schedule", [], "delete", "delete-match-modal", deleteMatchButton);
            }
        });
    });
    deleteStatButtons.forEach((button) => {
        button.addEventListener("click", (button) => {
            let id = button.target.id;
            let deleteStatButton = document.getElementById(id);
            document.body.style.overflow = 'hidden';
            console.log("delete stat");
            let result = confirm("Are you sure you want to delete this stat?");
            if (result) {
                createFormModal("schedule", [], "delete", "delete-stat-modal", deleteStatButton);
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
        let formModal = createFormModal("teams", ["name", "team", "jersey-number", "position", "nationality"], "add", "add-player-modal", '');
        document.body.appendChild(formModal);
    });

    // Edit team modal
    editTeamButton.addEventListener("click", () => {
        document.body.style.overflow = 'hidden';
        console.log("edit team");
        let formModal = createFormModal("teams", ["name", "team-image", "lineup-image", "field-image", "field-name"], "edit", "edit-team-modal", editTeamButton);
        document.body.appendChild(formModal);
    });
    // Edit player modal
    editPlayerButtons.forEach((button) => {
        button.addEventListener("click", (button) => {
            let id = button.target.id;
            let editPlayerButton = document.getElementById(id);
            document.body.style.overflow = 'hidden';
            console.log("edit player");
            let formModal = createFormModal("teams", ["name", "team", "jersey-number", "age", "position", "nationality"], "edit", "edit-player-modal", editPlayerButton);
            document.body.appendChild(formModal);
        });
    });

    // Delete team modal
    deleteTeamButton.addEventListener("click", () => {
        //document.body.style.overflow = 'hidden';
        //console.log("delete team");
        let result = confirm("Are you sure you want to delete this team?");
        if (result) {
            //createFormModal("teams", [], "delete", "delete-team-modal", deleteTeamButton);
            //document.body.style.overflow = 'visible';
            const endPoint = `/Local-League/teams/${deleteTeamButton.dataset.doc}`;
            // console.log(endPoint);
            fetch(endPoint, {
                method: "DELETE",
            })
            .then((response) => response.json())
            .then((data) => window.location.href = data.redirect)
            .catch((err) => console.log(err));
            //console.log(deleteTeamButton.dataset.doc);
        }
    });
    // Delete player modal
    deletePlayerButtons.forEach((button) => {
        button.addEventListener("click", (button) => {
            let id = button.target.id;
            let deletePlayerButton = document.getElementById(id);
            document.body.style.overflow = 'hidden';
            console.log("delete player");
            let result = confirm("Are you sure you want to delete this player?");
            if (result) {
                createFormModal("teams", [], "delete", "delete-player-modal", deletePlayerButton);
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

// function matchDeleteConfirmation(){
//     var result = confirm("Are you sure to delete this match?");
//     if(result){
//         console.log("Deleted")
//     }
// }

function teamDeleteConfirmation() {
    var result = confirm("Are you sure to delete this team?");
    if(result){
        console.log("Deleted")
    }
}

function playerDeleteConfirmation() {
    var result = confirm("Are you sure to delete this player?");
    if(result){
        console.log("Deleted")
    }
}

function statDeleteConfirmation() { 
    var result = confirm("Are you sure to delete this stat?");
    if(result){
        console.log("Deleted")
    }
}