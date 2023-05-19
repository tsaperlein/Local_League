import userObj from '../modules/userData.mjs'
import bcrypt from 'bcrypt'
import session from 'express-session';

const { User } = userObj;

const createUser = (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    User.findOne({ username: req.body.username }).lean().then((user) => {
        if (user != null) {
            res.render('main-page', { errorMessage: "An account with this username already exists", ...req.session.previousRender })
        }
        else if(user == null) {
            User.findOne({ email: req.body.email }).lean().then((result) => {
                if(result != null) {
                    res.render('main-page', { errorMessage: "An account with this email already exists", ...req.session.previousRender })
                }
                else{
                    const newUser = new User(req.body);
                    newUser.save()
                        .then((result) => {
                            res.redirect('/Local-League/main-page');
                            req.session.username = req.body.username;
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }
    })
    .catch((err) => {
        console.log(err);
    })
}

const authenticateUser = (req, res) => {
    if (req.body.usernameSignIn != undefined) {
        User.findOne({ username: req.body.usernameSignIn }, { username: 1, password:1 }).lean().then((user) => {
            if(user != null) {
                if(user.username == req.body.usernameSignIn && bcrypt.compareSync(req.body.passwordSignIn, user.password)) {
                    req.session.username = req.body.usernameSignIn;
                    res.redirect('/Local-League/main-page');
                }
                else {
                    res.render('main-page', { errorMessage: "Wrong username or password", ...req.session.previousRender })
                }
            }
            else {
                res.render('main-page', { errorMessage: "User not found", ...req.session.previousRender })
            }
        })
        .catch((err) => {
            console.log(err);
        })
    } else if (req.body.username != undefined) {
        createUser(req, res);
    }
    else {
        res.redirect('/Local-League/main-page');
    }
}

export default {
    authenticateUser
}