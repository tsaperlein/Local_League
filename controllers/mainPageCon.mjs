import team_obj from '../modules/teamData.mjs'
import match_obj from '../modules/matchData.mjs'

const { Match } = match_obj;
const { Team } = team_obj;

const mainPageStandings = (req, res) => {
    Match.find().lean().then(result => {
        Team.find().sort({ rank: 1 }).limit(5).lean().then(result2 => {
            Team.find().lean().then(result3 => {
                res.render('main-page', { match: result, team: result2, teams: result3, username: req.session.username })
            })
        })
    })
    .catch(err => console.log(err))
}

export default {
    mainPageStandings
  }