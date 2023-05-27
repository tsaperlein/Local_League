import userObj from '../modules/userData.mjs'
import bcrypt from 'bcrypt'
import session from 'express-session';

const { User } = userObj;

const createUser = (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    User.findOne({ username: req.body.username }).lean().then((user) => {
        if (user != null) {
            req.session.errorMessage = "An account with this username already exists";
            redirectToMainPage(req, res);
        }
        else if (user == null) {
            User.findOne({ email: req.body.email }).lean().then((result) => {
                if (result != null) {
                    req.session.errorMessage = "An account with this email already exists";
                    redirectToMainPage(req, res);
                }
                else {
                    const newUser = new User(req.body);
                    newUser.save()
                        .then((result) => {
                            req.session.mainPageRole = "user";
                            req.session.username = req.body.username;
                            redirectToMainPage(req, res);
                        })
                        .catch((err) => console.log(err));
                }
            })
                .catch((err) => console.log(err));
        }
    })
        .catch((err) => console.log(err));
}

const authenticateUser = (req, res) => {
    if (req.body.usernameSignIn != undefined) {
        User.findOne({ username: req.body.usernameSignIn }, { username: 1, password: 1 }).lean().then((user) => {
            if (user != null) {
                if (user.username == req.body.usernameSignIn && bcrypt.compareSync(req.body.passwordSignIn, user.password)) {
                    req.session.username = req.body.usernameSignIn;
                    // Find the role of the user
                    User.findOne({ username: req.body.usernameSignIn }).lean().then((result) => {
                        req.session.mainPageRole = result.role;
                        redirectToMainPage(req, res);
                    })
                        .catch((err) => console.log(err))
                }
                else if (user.username == req.body.usernameSignIn && !bcrypt.compareSync(req.body.passwordSignIn, user.password)) {
                    req.session.errorMessage = "Incorrect password";
                    redirectToMainPage(req, res);
                }
            }
            else {
                req.session.errorMessage = "User not found";
                redirectToMainPage(req, res);
            }
        })
            .catch((err) => console.log(err));
    }
    else if (req.body.username != undefined) {
        createUser(req, res);
    }
    else {
        redirectToMainPage(req, res);
    }
}

const logoutUser = (req, res) => {
    req.session.destroy();
    redirectToMainPage(req, res);
}

const redirectToMainPage = (req, res) => {
    res.redirect('/Local-League/main-page');
}

export default {
    authenticateUser,
    logoutUser
}