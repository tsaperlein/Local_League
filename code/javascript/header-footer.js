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
        modal.innerHTML = `
            <div class="modal-content d-flex flex-row">
                <div class="modal-side sign-in d-flex flex-column">
                    <h2>Sign In</h2>
                    <form>
                        <div class="form-element">
                            <label for="username">Username</label>
                            <input type="text" name="username" class="username" required>
                        </div>
                        <div class="form-element">
                            <label for="password">Password</label>
                            <input type="password" name="password" class="password" required>
                        </div>
                        <div class="submit">
                            <input type="submit" id="submitButton" value="Sign In">
                        </div>
                    </form>
                </div>
                <div class="modal-side register d-flex flex-column">
                    <h2>Register</h2>
                    <form>
                        <div class="form-element">
                            <label for="email">Email</label>
                            <input type="text" name="email" id="email" placeholder = "yourname@gmail.com" required>
                        </div>
                        <div class="form-element">
                            <label for="username">Username</label>
                            <input type="text" name="username" id="username" required>
                        </div>
                        <div class="form-element">
                            <label for="password">Password</label>
                            <input type="password" name="password" id="password" required>
                        </div>
                        <div class="form-element">
                            <label for="passwordConfirm">Confirm Password</label>
                            <input type="password" name="passwordConfirm" id="passwordConfirm" required>
                        </div>
                        <div class="submit">
                            <input type="submit" id="submitButton" class="register-btn" value="Register">
                        </div>
                    </form>
                </div>
                <span class="close-btn">x</span>
            </div>
        `;

        // If the modal is open, don't allow the user to scroll
        document.body.style.overflow = 'hidden';

        document.body.appendChild(modal);
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

        // Regular expressions for email, phone and password
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;    // πχ. yourname@gmail.com
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;

        // Check all the time if the user has filled the form correctly
        const submitButton = modal.getElementsByClassName('register-btn')[0];
        submitButton.disabled = true;
        modalSideRegister.querySelectorAll('input').forEach(input => {
            input.addEventListener('keyup', () => {
                if (emailRegex.test(emailField.value) && passwordRegex.test(passwordField.value) && passwordField.value === passwordConfirmField.value) {
                    submitButton.disabled = false;
                } else {
                    submitButton.disabled = true;
                    alert('Please fill the form correctly');
                }
            });
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


let header = document.querySelector('header');
let footer = document.querySelector('footer');

const emailField = document.getElementById("email");
const usernameField = document.getElementById("username");
const passwordField = document.getElementById("password");
const passwordConfirmField = document.getElementById("passwordConfirm");
const modalSideRegister = document.querySelector(".register");

document.addEventListener('DOMContentLoaded', () => {
    header = createHeader();
    footer = createFooter();
    fixMainContentHeight();
});