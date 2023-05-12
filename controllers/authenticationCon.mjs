import userObj from '../modules/userData.mjs'

const { User } = userObj;

const createUser = (req, res) => {
    const user = new User(req.body);

    user.save()
        .then((result) => {
            res.redirect('/Local-League/main-page');
        })
        .catch((err) => {
            console.log(err);
        })
}

export default {
    createUser
}