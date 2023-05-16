import team_obj from '../modules/teamData.mjs'
import match_obj from '../modules/matchData.mjs'

const { Match } = match_obj;
const { Team } = team_obj;

const startDate = new Date();
const endDate = new Date();
startDate.setDate(startDate.getDate() - 3);
endDate.setDate(startDate.getDate() + 7);
const dateDisplay = startDate.toLocaleString('en-US', { month: 'short', day: 'numeric' }) + " - " + endDate.toLocaleString('en-US', { month: 'short', day: 'numeric' });


// Take data from both collections and fill the schedule page
const matchFilling = (req, res) => {
    if(req.session.username == undefined) res.redirect('/Local-League/main-page');
    else{
        Match.find({ date: { $gte: startDate, $lt: endDate }}).lean().then(result => {
            Team.find().lean().then(result2 => {
                Team.find().lean().then(result3 => {
                    res.render('schedule', { match: result, team: result2, teams: result3, username: req.session.username, displayDate: dateDisplay })
                })
            })
        })
        .catch(err => console.log(err))
    }
}

export default {
    matchFilling
}