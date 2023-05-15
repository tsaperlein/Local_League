import single_team_obj from '../modules/singleTeamData.mjs'
import team_obj from '../modules/teamData.mjs'

const { singleTeam } = single_team_obj;
const { Team } = team_obj;

const teamDisplay = (req, res) => {
    if(req.session.username == undefined) res.redirect('/Local-League/main-page');
    else{
        const teamName = req.params.name;
        singleTeam.find({ name: teamName }).lean().then(result => {
            Team.find().lean().then(result2 => {
                res.render('teams', { team: result, players: result[0].players, teams: result2, username: req.session.username })
            })
        })
        .catch(err => console.log(err))
    }
}

export default {
    teamDisplay
}