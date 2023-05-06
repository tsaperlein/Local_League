const teamsIconsData = [
    {name: "AEK", icon: "aek.png", lineup: "aek-lineup.png"},
    {name: "Olympiakos", icon: "osfp.png", lineup: "osfp-lineup.png"},
    {name: "Panathinaikos", icon: "pao.png", lineup: "pao-lineup.png"},
    {name: "PAOK", icon: "paok.png", lineup: "paok-lineup.png"},
    {name: "Team5", icon: "home-team.png", lineup: "home-team-lineup.png"},
    {name: "Team6", icon: "away-team.png", lineup: "away-team-lineup.png"},
    {name: "Team7", icon: "team7.png", lineup: "team7-lineup.png"},
    {name: "Napoli", icon: "napoli.png", lineup: "napoli-lineup.png"},
    {name: "Barcelona", icon: "barc.png", lineup: "barc-lineup.png"},
    {name: "Juventus", icon: "juve.png", lineup: "juve-lineup.png"},
    {name: "PSG", icon: "psg.png", lineup: "psg-lineup.png"},
    {name: "Arsenal", icon: "arsenal.png", lineup: "arsenal-lineup.png"},
    {name: "Fenerbache", icon: "fener.png", lineup: "fener-lineup.png"},
    {name: "Liverpool", icon: "live.png", lineup: "live-lineup.png"},
    {name: "Porto", icon: "porto.png", lineup: "porto-lineup.png"},
];

const nav = document.querySelector('.header-options');

// Function that creates the header
function createModal() {
    // When the user clicks the Sign In/Register button, create a modal
    nav.querySelector('ul').lastElementChild.addEventListener('click', () => {
        // Create a modal
        let modal = document.createElement('div');
        modal.classList.add('modal', 'd-flex', 'justify-content-center', 'align-items-center');
        modal.setAttribute('id', 'signin-signup-modal');
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-side sign-in d-flex flex-column">
                    <div class="form-group">
                        <div class="col-xs-8 col-xs-offset-4">
                            <h2>Sign In</h2>
                        </div>
                    </div>
                    <form id="signinForm" method="post" class="form-horizontal">
                        <div class="form-group">
                            <label class="col-xs-4 control-label">Username</label>
                            <div class="col-xs-8">
                                <input type="text" class="form-control" name="username">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-4 control-label">Password</label>
                            <div class="col-xs-8">
                                <input type="password" class="form-control" name="password">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-8 col-xs-offset-4">
                                <button type="submit" class="btn btn-primary signin-btn" name="signin" value="Sign in">Sign in</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-side register d-flex flex-column">
                    <div class="form-group">
                        <div class="col-xs-8 col-xs-offset-4">
                            <h2>Register</h2>
                        </div>
                    </div>
                    <form id="signupForm" method="post" class="form-horizontal">
                        <div class="form-group">
                            <label class="col-xs-4 control-label">Full name</label>
                            <div class="col-xs-4">
                                <input type="text" class="form-control" name="firstName" placeholder="First name">
                            </div>
                            <div class="col-xs-4">
                                <input type="text" class="form-control" name="lastName" placeholder="Last name">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-4 control-label">Username</label>
                            <div class="col-xs-8">
                                <input type="text" class="form-control" id="username" name="username">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-4 control-label">Email address</label>
                            <div class="col-xs-8">
                                <input type="text" class="form-control" id="email" name="email" placeholder="example@gmail.com">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-4 control-label">Password</label>
                            <div class="col-xs-8">
                                <input type="password" class="form-control" id="password" name="password">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-4 control-label">Confirm password</label>
                            <div class="col-xs-8 confirm-password">
                                <input type="password" class="form-control" id="confirm-password" name="confirmPassword">
                            </div>
                        </div>
                        <div class="form-group">
                            <div id="signup-btn" class="col-xs-8 col-xs-offset-4">
                                <button type="submit" class="btn btn-primary" name="signup">Sign Up</button>
                            </div>
                        </div>
                    </form>
                </div>
                <span class="close-btn">x</span>
            </div>
        `;

        // If the modal is open, don't allow the user to scroll
        document.body.style.overflow = 'hidden';

        document.body.appendChild(modal);
        if (modal) {
            checkInputs();
        }
        // When the user clicks the X button, close the modal
        modal.querySelector('.close-btn').addEventListener('click', () => {
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
    });
}

function teamsForHeader() {
    // Create a div for the team selector
    const teamSelector = document.querySelector('.header-team-selector');
    // Create a div element for each team in the league
    for (let i = 0; i < teamsIconsData.length; i++) {
        const team = document.createElement('div');
        team.classList.add('header-team', 'd-flex', 'justify-content-center', 'align-items-center');
        team.innerHTML = `
            <img src="/team-icons/${teamsIconsData[i].icon}" alt="${teamsIconsData[i].name}">
        `;
        teamSelector.appendChild(team);
        // Add an event listener to each team div
        team.addEventListener('click', () => {
            // Go to the team's page of the team that was clicked
            window.location.href = `teams.html?team=${teamsIconsData[i].name}`;
        });
    }
}

function fixMainContentHeight() {
    main = document.querySelector('main');
    header = document.querySelector('header');
    headerHeight = header.offsetHeight;

    main.style.paddingTop = `${headerHeight}px`;
    main.style.transition = 'padding-top 0.5s ease-in-out';
    // Check always if the header height has changed
    setInterval(() => {
        if (headerHeight != header.offsetHeight) {
            headerHeight = header.offsetHeight;
            main.style.paddingTop = `${headerHeight}px`;
        }
    }
    , 200);
}

// Modal
createModal();
teamsForHeader();
fixMainContentHeight();

// Validate input fields
function checkInputs() {
    // Input fields
    const emailField = document.getElementById("email");
    const usernameField = document.getElementById("username");
    const passwordField = document.getElementById("password");
    const passwordConfirmField = document.getElementById("confirm-password");

    // Regular expressions for email, username and password
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;                                                    // πχ. yourname@gmail.com
    const usernameRegex = /^[a-zA-Z0-9]/;                                                               // only letters and numbers
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;    // at least one lowercase, one uppercase, one number, one special character and 8-15 characters long

    const inputNameFieldRegex = [
        { name: "email", field: emailField, regex: emailRegex },
        { name: "username", field: usernameField, regex: usernameRegex },
        { name: "password", field: passwordField, regex: passwordRegex },
        { name: "password-confirm", field: passwordConfirmField, regex: passwordRegex }
    ];

    // Function that adds event listeners to the input fields (keyup and blur)
    function keyUpAndBlurEventListener(name, field, regex) {
        field.addEventListener("keyup", function () {
            if (field === passwordConfirmField) {
                if (passwordField.value !== passwordConfirmField.value) {
                    field.style.color = "red";
                } else {
                    if (regex.test(field.value)) {
                        field.style.color = "green";
                    }
                }
            } else isValid(field, regex);
        });
        blurEventListener(name, field, regex);
    }

    // Function that sets the font color to black when the user clicks outside the input field, and only if the input is valid
    function blurEventListener(name, field, regex) {
        field.addEventListener("blur", function() {
            if (regex.test(field.value)) {
                field.style.color = "black";
                removeErrorMessage(field);
            } else {
                // For the specific field, if an error message is already displayed, don't create another one
                if (!field.nextElementSibling) {
                    createErrorMessage(field, name);
                }
                field.style.color = "red";
            }
        });
    }

    // Call in a for loop the function keyUpAndBlurEventListener for every input field
    for (item of inputNameFieldRegex) {
        keyUpAndBlurEventListener(item.name, item.field, item.regex);
    }

    function isValid(field, regex) {
        if (field.value.trim() === '') {
            field.style.color = "red";
            return false;
        }
        else if (!regex.test(field.value.trim())) {
            field.style.color = "red";
            return false;
        }
        else {
            removeErrorMessage(field);
            field.style.color = "green";
            return true;
        }
    }

    // Function that creates a div element for the error message below the given input field
    function createErrorMessage(field, name) {
        let errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        if (name === "password-confirm") {
            errorMessage.textContent = `Passwords do not match`;
        }
        else if (name === "password"){
            errorMessage.textContent = '8-15 characters (at least one lowercase, one uppercase, one number and one special character)'
        }
        else {
            errorMessage.textContent = `Invalid ${name}`;
        }
        field.insertAdjacentElement('afterend', errorMessage);
    }
    // Function that removes the error message below the given input field
    function removeErrorMessage(field) {
        let errorMessage = field.nextElementSibling;
        // Remove the error message from the given input field, only if it exists
        if (errorMessage && errorMessage.classList.contains('error-message')) {
            errorMessage.remove();
        }
    }
    const signupBtn = document.getElementById("signup-btn");
    for (item of inputNameFieldRegex) {
        if (isValid(item.field, item.regex)) {
            signupBtn.disabled = false;
            break;
        }
        signupBtn.disabled = true;
    }
}