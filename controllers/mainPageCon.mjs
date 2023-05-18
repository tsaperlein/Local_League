import team_obj from '../modules/teamData.mjs'
import match_obj from '../modules/matchData.mjs'

const { Match } = match_obj;
const { Team } = team_obj;

const startDate = new Date();
const endDate = new Date();
startDate.setDate(startDate.getDate() - 3);
endDate.setDate(startDate.getDate() + 7);
const thisWeek = startDate.toLocaleString('en-US', { month: 'short', day: 'numeric' }) + " - " + endDate.toLocaleString('en-US', { month: 'short', day: 'numeric' });

const mainPageStandings = (req, res) => {
     Match.find({ state: 'Final' }).limit(3).lean().then(result => {
        Match.find({ state: 'Upcoming' }).limit(3).lean().then(result1 => {
            Team.find().sort({ rank: 1 }).limit(5).lean().then(result2 => {
                Team.find().lean().then(result3 => {
                    res.render('main-page', { match: result, matchUpc: result1, team: result2, teams: result3, username: req.session.username, thisWeek: thisWeek })
                })
            })
        })
    })
    .catch(err => console.log(err))
}

export default {
    mainPageStandings
  }