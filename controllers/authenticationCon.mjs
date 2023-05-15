import userObj from '../modules/userData.mjs'
import bcrypt from 'bcrypt'

const { User } = userObj;

const createUser = (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = new User(req.body);

    user.save()
        .then((result) => {
            res.redirect('/Local-League/main-page');
        })
        .catch((err) => {
            console.log(err);
        })
}

const authenticateUser = (req, res) => {
    if (req.body.usernameSignIn != undefined) {
        User.findOne({ username: req.body.usernameSignIn }, { username: 1, password:1 }).lean().then((user) => {
            if(user.username == req.body.usernameSignIn && bcrypt.compareSync(req.body.passwordSignIn, user.password)) {
                req.session.username = req.body.usernameSignIn;
                res.redirect('/Local-League/main-page');
            }
            else {
                res.redirect('/Local-League/main-page');
            }
        })
        .catch((err) => {
            console.log(err);
        })
    } else if (req.body.username != undefined) {
        createUser(req, res);
        req.session.username = req.body.username;
    }
    else {
        res.redirect('/Local-League/main-page');
    }
}

export default {
    authenticateUser
}