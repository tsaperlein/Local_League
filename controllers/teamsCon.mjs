import single_team_obj from '../modules/singleTeamData.mjs'
import team_obj from '../modules/teamData.mjs'
import user_obj from '../modules/userData.mjs'

const { singleTeam } = single_team_obj;
const { Team } = team_obj;
const { User } = user_obj;

const teamDisplay = (req, res) => {
    if(req.session.username == undefined) res.redirect('/Local-League/main-page');
    else{
        const teamName = req.params.name;
        singleTeam.find({ name: teamName }).lean().then(result => {
            Team.find().lean().then(result2 => {
                User.findOne({ username: req.session.username }).lean().then(result3 => {
                    res.render('teams', { team: result, players: result[0].players, teams: result2, username: req.session.username, role: result3.role })
                })
            })
        })
        .catch(err => console.log(err))
    }
}

export default {
    teamDisplay
}