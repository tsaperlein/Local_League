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

// Function that creates the header
function createHeader() {
    const logo = document.createElement('div');
    logo.classList.add('header-logo', 'd-flex', 'justify-content-center', 'align-items-center');
    logo.innerHTML = `
        <div class="header-image">
            <img src="../../images/header.png" alt="">
        </div>
    `;

    const nav = document.createElement('nav');
    nav.classList.add('header-options', 'd-flex', 'justify-content-center');
    nav.innerHTML = `
        <ul class="d-flex justify-content-around">
            <li>
                <a class="d-flex flex-wrap" href="main-page.html">Main Page</a>
            </li>
            <li>
                <a href="schedule.html">Schedule</a>
            </li>
            <li>
                <a href="standings.html">Standings</a>
            </li>
            <li>
                <a href="#">Sign In/Register</a>
            </li>
        </ul>
    `;

    // When the user clicks the Sign In/Register button, create a modal
    nav.querySelector('ul').lastElementChild.addEventListener('click', () => {
        // Create a modal
        const modal = document.createElement('div');
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

    // Create a scrollable div for the team selector
    const teamSelector = document.createElement('div');
    teamSelector.classList.add('header-team-selector', 'd-flex', 'justify-content-center', 'align-items-center');
    // Create a div element for each team in the league
    for (let i = 0; i < teamsIconsData.length; i++) {
        const team = document.createElement('div');
        team.classList.add('header-team', 'd-flex', 'justify-content-center', 'align-items-center');
        team.innerHTML = `
            <img src="../../team-icons/${teamsIconsData[i].icon}" alt="${teamsIconsData[i].name}">
        `;
        teamSelector.appendChild(team);
        // Add an event listener to each team div
        team.addEventListener('click', () => {
            // Go to the team's page of the team that was clicked
            window.location.href = `teams.html?team=${teamsIconsData[i].name}`;
        });
    }

    header.appendChild(logo);
    header.appendChild(nav);
    header.appendChild(teamSelector);

    return header;
}
    
// Function that creates the footer
function createFooter() {
    footer.classList.add('d-flex', 'flex-row', 'justify-content-around', 'align-items-center');

    const pageIcon = document.createElement('div');
    pageIcon.classList.add('footer-page-icon', 'd-flex', 'justify-content-start', 'align-items-center');
    pageIcon.innerHTML = `
        <img src="../../images/icon-local-league.png" alt="">
    `;

    const links = document.createElement('div');
    links.classList.add('footer-links', 'd-flex', 'justify-content-center', 'align-items-start');
    links.innerHTML = `
        <nav class="footer-links-options d-flex flex-column justify-content-center align-items-start">
            <label for="footer-options">LINKS</label>
            <ul class="footer-options d-flex flex-column">
                <li>
                    <a href="main-page.html">Main Page</a>
                </li>
                <li>
                    <a href="schedule.html">Schedule</a>
                </li>
                <li>
                    <a href="standings.html">Standings</a>
                </li>
                <li>
                    <a href="account.html">Account</a>
                </li>
            </ul>
        </nav>
    `;

    const contactInfo = document.createElement('div');
    contactInfo.classList.add('footer-contact-info', 'd-flex', 'justify-content-center', 'align-items-start');
    contactInfo.innerHTML = `
        <nav class="footer-contact-info-options d-flex flex-column justify-content-center align-items-start">
            <label for="footer-options">CONTACT INFO</label>
            <ul class="footer-options d-flex flex-column">
                <li>
                    <a href="https://www.google.com/maps/place/%CE%A4%CE%BC%CE%AE%CE%BC%CE%B1+%CE%97%CE%BB%CE%B5%CE%BA%CF%84%CF%81%CE%BF%CE%BB%CF%8C%CE%B3%CF%89%CE%BD+%CE%9C%CE%B7%CF%87%CE%B1%CE%BD%CE%B9%CE%BA%CF%8E%CE%BD+%CE%BA%CE%B1%CE%B9+%CE%A4%CE%B5%CF%87%CE%BD%CE%BF%CE%BB%CE%BF%CE%B3%CE%AF%CE%B1%CF%82+%CE%A5%CF%80%CE%BF%CE%BB%CE%BF%CE%B3%CE%B9%CF%83%CF%84%CF%8E%CE%BD,+%CE%A0%CE%BF%CE%BB%CF%85%CF%84%CE%B5%CF%87%CE%BD%CE%B9%CE%BA%CE%AE+%CE%A3%CF%87%CE%BF%CE%BB%CE%AE,+%CE%A0%CE%B1%CE%BD%CE%B5%CF%80%CE%B9%CF%83%CF%84%CE%AE%CE%BC%CE%B9%CE%BF+%CE%A0%CE%B1%CF%84%CF%81%CF%8E%CE%BD/@38.288481,21.7881479,18z/data=!3m1!4b1!4m6!3m5!1s0x135e4b2793dd6803:0x52ca8ed18dc0ae06!8m2!3d38.288481!4d21.7892422!16s%2Fg%2F11tryg300w">
                        Electrical and Computer Engineering, University of Patras
                    </a>
                </li>
                <li>
                    <a href="mailto:up1072824@upnet.gr,up1072774@upnet.gr">
                        Send us an email
                    </a>
                </li>
                <li>
                    <a href="tel:+306948753087">
                        Call us
                    </a>
                </li>
            </ul>
        </nav>
    `;

    const connectWithUs = document.createElement('div');
    connectWithUs.classList.add('footer-connect-with-us', 'd-flex', 'flex-column',  'justify-content-start', 'align-items-center');
    connectWithUs.innerHTML = `
        <label for="connection-icons">CONNECT WITH US</label>
        <div class="connection-icons d-flex flex-row justify-content-around align-items-center">
            <div class="info-box">
                <a href="https://www.facebook.com/tsaperlein/">
                    <img src="../../images/facebook-logo.png" alt="">
                </a>
            </div>
            <div class="info-box">
                <a href="https://twitter.com/tsaperlein">
                    <img src="../../images/twitter-logo.png" alt="">
                </a>
            </div>
            <div class="info-box">
                <a href="https://github.com/tsaperlein/Local_League">
                    <img src="../../images/github-logo.png" alt="">
                </a>
            </div>
        </div>
    `;
    footer.appendChild(pageIcon);
    footer.appendChild(links);
    footer.appendChild(contactInfo);
    footer.appendChild(connectWithUs);

    return footer;
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

// Header and Footer
let header = document.querySelector('header');
let footer = document.querySelector('footer');

header = createHeader();
footer = createFooter();
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