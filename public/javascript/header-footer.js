const nav = document.querySelector('.header-options');
let modal;
let modalOn = 0;

function createModal() {
    // When the user clicks the Sign In/Register button, create a modal
    // Create a modal
    modal = document.createElement('div');
    modal.classList.add('modal', 'd-flex', 'justify-content-center', 'align-items-center');
    modal.setAttribute('id', 'signin-signup-modal');
    modal.innerHTML = `
        <div class="modal-content container row">
            <div class="modal-side col-lg-6 col-sm-6 col-12 sign-in d-flex flex-column">
                <div class="form-group">
                    <div class="col-xs-8 col-xs-offset-4">
                        <h2>Sign In</h2>
                    </div>
                </div>
                <form id="signinForm" action="/Local-League/main-page" method="POST" class="form-horizontal">
                    <div class="form-group">
                        <label class="col-xs-4 control-label">Username</label>
                        <div class="col-xs-8">
                            <input type="text" class="form-control" name="usernameSignIn">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-4 control-label">Password</label>
                        <div class="col-xs-8">
                            <input type="password" class="form-control" name="passwordSignIn">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-xs-8 col-xs-offset-4">
                            <button type="submit" class="btn btn-primary signin-btn" name="signin" value="Sign in">Sign in</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-side col-lg-6 col-sm-6 col-12 register d-flex flex-column">
                <div class="form-group">
                    <div class="col-xs-8 col-xs-offset-4">
                        <h2>Register</h2>
                    </div>
                </div>
                <form id="signupForm" action="/Local-League/main-page" method="POST" class="form-horizontal">
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
                            <input type="password" class="form-control" id="confirm-password">
                        </div>
                    </div>
                    <div class="form-group">
                        <div id="signup-btn" class="col-xs-8 col-xs-offset-4">
                            <button type="submit" class="btn btn-primary">Sign Up</button>
                        </div>
                    </div>
                </form>
            </div>
            <span class="close-btn">x</span>
        </div>
    `;

    // If the modal is open, don't allow the user to scroll
    document.body.style.overflow = 'hidden';
    modalOn++;

    document.body.appendChild(modal);
    if (modal) {
        checkInputs();
    }
    // When the user clicks the X button, close the modal
    modal.querySelector('.close-btn').addEventListener('click', () => {
        modal.remove();
        document.body.style.overflow = 'visible';
        modalOn = 0;
    });
    // When the user clicks outside the modal, close the modal
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.remove();
            document.body.style.overflow = 'visible';
            modalOn = 0;
        }
    });
}

// Get the href of the div that is clicked and redirect to that page
let headerTeamDivs = document.querySelectorAll('.header-team');
headerTeamDivs.forEach(div => {
    div.addEventListener('click', () => {
        window.location.href = div.getAttribute('href');
    });
});

// Modal
if (window.location.pathname === "/Local-League/main-page") headerEl = document.querySelector('.header-options ul').lastElementChild.querySelector('a').textContent;
if (window.location.pathname === "/Local-League/main-page" && headerEl === "Sign In / Register") {
    createModal();
}
else if (headerEl !== "Sign In / Register") {
    // If the user clicks on the last li element, create a dropdown menu
    let lastLi = document.querySelector('.header-options ul').lastElementChild;
    lastLi.removeEventListener('click', () => {
        createModal();
    });
}

// fixMainContentHeight();

nav.querySelector('ul').lastElementChild.addEventListener('click', () => {
    if (modalOn === 1) {
        modal.remove();
        document.body.style.overflow = 'visible';
        modalOn = 0;
    }
    else {
        createModal();
    }
});

// Validate input fields
function checkInputs() {
    // Input fields
    const emailField = document.getElementById("email");
    const usernameField = document.getElementById("username");
    const passwordField = document.getElementById("password");
    const passwordConfirmField = document.getElementById("confirm-password");

    // Regular expressions for email, username and password
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+[a-zA-Z]{1,}$/;                                               // πχ. yourname@gmail.com
    const usernameRegex = /^[a-zA-Z0-9]/;                                                               // only letters and numbers
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#:])[A-Za-z\d$@$!%*?&#:]{8,15}/;    // at least one lowercase, one uppercase, one number, one special character and 8-15 characters long

    const inputNameFieldRegex = [
        { name: "email", field: emailField, regex: emailRegex },
        { name: "username", field: usernameField, regex: usernameRegex },
        { name: "password", field: passwordField, regex: passwordRegex },
        { name: "password-confirm", field: passwordConfirmField, regex: passwordRegex }
    ];

    // Function that adds event listeners to the input fields (keyup and blur)
    function keyUpAndBlurEventListener(name, field, regex) {
        field.addEventListener("keyup", function () {
            isValid(field, regex);
        });
        blurEventListener(name, field, regex);
    }

    // Function that sets the font color to black when the user clicks outside the input field, and only if the input is valid
    function blurEventListener(name, field, regex) {
        field.addEventListener("blur", function () {
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
            //console.log('red');
            return false;
        }
        else if (!regex.test(field.value.trim())) {
            //console.log('red');
            field.style.color = "red";
            return false;
        }
        else if (field === passwordConfirmField) {
            if (passwordField.value !== passwordConfirmField.value) {
                field.style.color = "red";
                return false;
            }
            else {
                field.style.color = "green";
                return true;
            }
        }
        else {
            //console.log('green');
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
        else if (name === "password") {
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
    const signupBtn = document.querySelector('div#signup-btn .btn-primary');
    setInterval(() => {
        for (item of inputNameFieldRegex) {
            if (isValid(item.field, item.regex)) {
                //console.log(isValid(item.field, item.regex));
                signupBtn.disabled = false;
            } else {
                //console.log('invalid');
                signupBtn.disabled = true;
                break;
            }
        }
    }, 100);
}