import team_obj from '../modules/teamData.mjs'
import match_obj from '../modules/matchData.mjs'

const { Match } = match_obj;
const { Team } = team_obj;

// Take data from both collections and fill the schedule page
const matchFilling = (req, res) => {
    Match.find().lean().then(result => {
        Team.find().lean().then(result2 => {
            res.render('schedule', { match: result, team: result2 })
        })
    })
    .catch(err => console.log(err))
}

export default {
    matchFilling
}