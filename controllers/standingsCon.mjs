import team_obj from '../modules/teamData.mjs'
import user_obj from '../modules/userData.mjs'

const { Team } = team_obj;
const { User } = user_obj;

const startDate = new Date();
const endDate = new Date();
startDate.setDate(startDate.getDate() - 3);
endDate.setDate(startDate.getDate() + 7);
const thisWeek = startDate.toLocaleString('en-US', { month: 'short', day: 'numeric' }) + " - " + endDate.toLocaleString('en-US', { month: 'short', day: 'numeric' });

const teamRanking = (req, res) => {
  if (req.session.username == undefined) res.redirect('/Local-League/main-page');
  else {
    Team.find().sort({ rank: 1 }).lean().then(result => {
      User.find().lean().then(result2 => {
        let role = "user";
        for (let i = 0; i < result2.length; i++) {
          if (result2[i].username == req.session.username) {
            if (result2[i].role == "admin") role = "admin";
          }
        }
        res.render('standings', { team: result, teams: result, username: req.session.username, thisWeek: thisWeek, role: role, overall: 'picked', home: 'non-picked', guest: 'non-picked' })
      })
    })
      .catch(err => console.log(err))
  }
}

const rankByHomeWins = (req, res) => {
  if (req.session.username == undefined) res.redirect('/Local-League/main-page');
  else {
    Team.find().sort({ homeWins: -1 }).select({ wins: 0 }).lean().then(result => {
      User.find().lean().then(result2 => {
        let role = "user";
        for (let i = 0; i < result2.length; i++) {
          if (result2[i].username == req.session.username) {
            if (result2[i].role == "admin") role = "admin";
          }
        }
        res.render('standings', { team: result, teams: result, username: req.session.username, thisWeek: thisWeek, role: role, overall: 'non-picked', home: 'picked', guest: 'non-picked' })
      })
    })
      .catch(err => console.log(err))
  }
}

const rankByAwayWins = (req, res) => {
  if (req.session.username == undefined) res.redirect('/Local-League/main-page');
  else {
    Team.find().sort({ awayWins: -1 }).select({ wins: 0, homeWins: 0 }).lean().then(result => {
      User.find().lean().then(result2 => {
        let role = "user";
        for (let i = 0; i < result2.length; i++) {
          if (result2[i].username == req.session.username) {
            if (result2[i].role == "admin") role = "admin";
          }
        }
        res.render('standings', { team: result, teams: result, username: req.session.username, thisWeek: thisWeek, role: role, overall: 'non-picked', home: 'non-picked', guest: 'picked' })
      })
    })
      .catch(err => console.log(err))
  }
}

export default {
  teamRanking,
  rankByHomeWins,
  rankByAwayWins
}