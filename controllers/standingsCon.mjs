import obj from '../modules/teamData.mjs'
import user_obj from '../modules/userData.mjs'

const { Team } = obj;
const { User } = user_obj;

const teamRanking = (req, res) => {
  if(req.session.username == undefined) res.redirect('/Local-League/main-page');
  else{
    Team.find().sort({ rank: 1 }).lean().then(result => {
      User.findOne({ username: req.session.username }).lean().then(result2 => {
        res.render('standings', { team: result, teams: result, username: req.session.username, role: result2.role })
      })
    })
    .catch(err => console.log(err))
  }
}

export default {
    teamRanking
  }