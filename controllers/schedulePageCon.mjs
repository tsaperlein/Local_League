import team_obj from '../modules/teamData.mjs'
import match_obj from '../modules/matchData.mjs'
import user_obj from '../modules/userData.mjs'

const { Match } = match_obj;
const { Team } = team_obj;
const { User } = user_obj;

// Take data from both collections and fill the schedule page
const matchFilling = (req, res) => {
    if(req.session.username == undefined) res.redirect('/Local-League/main-page');
    else{
        Match.find().lean().limit(25).then(result => {
            Team.find().lean().then(result2 => {
                Team.find().lean().then(result3 => {
                    // Pass the role of the user to the page
                    User.findOne({ username: req.session.username }).lean().then(result4 => {
                        res.render('schedule', { match: result, team: result2, teams: result3, username: req.session.username, role: result4.role })
                    })
                })
            })
        })
        .catch(err => console.log(err))
    }
}

export default {
    matchFilling
}