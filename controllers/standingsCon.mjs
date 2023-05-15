import obj from '../modules/teamData.mjs'

const { Team } = obj;

const teamRanking = (req, res) => {
  if(req.session.username == undefined) res.redirect('/Local-League/main-page');
  else{
    Team.find().sort({ rank: 1 }).lean().then(result =>{
      res.render('standings', { team: result, teams: result, username: req.session.username })
    })
    .catch(err => console.log(err))
  }
}

export default {
    teamRanking
  }