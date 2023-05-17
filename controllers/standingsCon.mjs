import obj from '../modules/teamData.mjs'

const { Team } = obj;
const startDate = new Date();
const endDate = new Date();
startDate.setDate(startDate.getDate() - 3);
endDate.setDate(startDate.getDate() + 7);
const thisWeek = startDate.toLocaleString('en-US', { month: 'short', day: 'numeric' }) + " - " + endDate.toLocaleString('en-US', { month: 'short', day: 'numeric' });

const teamRanking = (req, res) => {
  if(req.session.username == undefined) res.redirect('/Local-League/main-page');
  else{
    Team.find().sort({ rank: 1 }).lean().then(result =>{
      res.render('standings', { team: result, teams: result, username: req.session.username, thisWeek: thisWeek })
    })
    .catch(err => console.log(err))
  }
}

export default {
    teamRanking
  }