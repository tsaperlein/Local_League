import team_obj from '../modules/teamData.mjs'
import user_obj from '../modules/userData.mjs'
import player_obj from '../modules/playerData.mjs'
import match_obj from '../modules/matchData.mjs'

const Team = team_obj.Team;
const { User } = user_obj;
const { Player } = player_obj;
const { Match } = match_obj;

const startDate = new Date();
const endDate = new Date();
startDate.setDate(startDate.getDate() - 3);
endDate.setDate(startDate.getDate() + 7);
const thisWeek = startDate.toLocaleString('en-US', { month: 'short', day: 'numeric' }) + " - " + endDate.toLocaleString('en-US', { month: 'short', day: 'numeric' });

const teamRanking = (req, res) => {
  if (req.session.username == undefined) res.redirect('/Local-League/main-page');
  else {
    team_obj.updateData();
    Team.find().sort({ rank: 1 }).select({ homeWins: 0, awayWins: 0 }).lean().then(result => {
      Team.find().lean().then(result2 => {
        User.find().lean().then(result3 => {
          let role = "user";
          for (let i = 0; i < result3.length; i++) {
            if (result3[i].username == req.session.username) {
              if (result3[i].role == "admin") role = "admin";
            }
          }
          req.session.previousStandingsRender = {
            team: result,
            teams: result,
            username: req.session.username,
            thisWeek: thisWeek,
            role: role,
            overall: 'picked',
            home: 'non-picked',
            guest: 'non-picked',
            players: 'non-picked',
          }
          res.render('standings', { team: result, teams: result2, username: req.session.username, thisWeek: thisWeek, role: role, overall: 'picked', home: 'non-picked', guest: 'non-picked', players: 'non-picked', errorMessage: req.session.errorMessage })
          req.session.errorMessage = "";
        })
          .catch(err => console.log(err))
      })
        .catch(err => console.log(err))
    })
      .catch(err => console.log(err))
  }
}

const rankByHomeWins = async (req, res) => {
  if (req.session.username == undefined) res.redirect('/Local-League/main-page');
  else {
    team_obj.updateData();
    //team_obj.updateRank();
    await Team.find().sort({ homeWins: -1 }).select({ wins: 0, awayWins: 0 }).lean().then(result => {
      User.find().lean().then(result2 => {
        let role = "user";
        for (let i = 0; i < result2.length; i++) {
          if (result2[i].username == req.session.username) {
            if (result2[i].role == "admin") role = "admin";
          }
        }
        res.render('standings', { team: result, teams: result, username: req.session.username, thisWeek: thisWeek, role: role, overall: 'non-picked', home: 'picked', guest: 'non-picked', players: 'non-picked', errorMessage: req.session.errorMessage })
        req.session.errorMessage = "";
      })
    })
      .catch(err => console.log(err))
  }
}

const rankByAwayWins = async (req, res) => {
  if (req.session.username == undefined) res.redirect('/Local-League/main-page');
  else {
    team_obj.updateData();
    //team_obj.updateRank();
    await Team.find().sort({ awayWins: -1 }).select({ wins: 0, homeWins: 0 }).lean().then(result => {
      User.find().lean().then(result2 => {
        let role = "user";
        for (let i = 0; i < result2.length; i++) {
          if (result2[i].username == req.session.username) {
            if (result2[i].role == "admin") role = "admin";
          }
        }
        res.render('standings', { team: result, teams: result, username: req.session.username, thisWeek: thisWeek, role: role, overall: 'non-picked', home: 'non-picked', guest: 'picked', players: 'non-picked', errorMessage: req.session.errorMessage })
        req.session.errorMessage = "";
      })
    })
      .catch(err => console.log(err))
  }
}

const calculateStats = async (req, res) => {
  try {
      const teamName = await Team.find().select({ name: 1, _id: 0 }).lean();
      const playersStats = {};
      //console.log(teamName);
      for(let z = 0; z < teamName.length; z++){
        const players = await Player.find({ team: teamName[z].name }).lean();
        
        const matches = await Match.find({ $or: [{ 'homeTeam.name': teamName[z].name }, { 'awayTeam.name': teamName[z].name }] }).lean();
        
        for (let i = 0; i < players.length; i++) {
          const player = players[i];
          let goals = 0;
          let yellowCards = 0;
          let redCards = 0;

          for (let j = 0; j < matches.length; j++) {
            const match = matches[j];
            for (let k = 0; k < match.stats.length; k++) {
              const stat = match.stats[k];
              if (stat.name === player.name) {
                  if (stat.type === "goal") goals++;
                  else if (stat.type === "yellow card") yellowCards++;
                  else if (stat.type === "red card") redCards++;
              }
            }
          }
          
          playersStats[player.name] = {
              goals: goals,
              yellowCards: yellowCards,
              redCards: redCards
          };
        }
      }

      return playersStats;
  } catch (err) {
      console.error(err);
      throw err;
  }
};

const playerRanking = (req, res) => {
  if (req.session.username == undefined) res.redirect('/Local-League/main-page');
  else {
    Player.find().limit().lean().then(result => {
      Team.find().lean().then(result2 => {
        User.find().lean().then(result3 => {
          let role = "user";
          for (let i = 0; i < result3.length; i++) {
            if (result3[i].username == req.session.username) {
              if (result3[i].role == "admin") role = "admin";
            }
          }
          calculateStats(req, res).then(playerStats => {
            for(let j = 0; j < result.length; j++){
              result[j].stats = playerStats[result[j].name];
            }
            result.sort((a, b) => {
              if (a.stats.goals > b.stats.goals) return -1;
              else if (a.stats.goals < b.stats.goals) return 1;
            });
            for(let j = 0; j < result.length; j++){
              result[j].rank = j+1;
            }
            //console.log(result);
            res.render('standings', { player: result.slice(0, 10), teams: result2, username: req.session.username, thisWeek: thisWeek, role: role, overall: 'non-picked', home: 'non-picked', guest: 'non-picked', players: 'picked', errorMessage: req.session.errorMessage })
            req.session.errorMessage = "";
          })
          .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
  }
}

export default {
  teamRanking,
  rankByHomeWins,
  rankByAwayWins,
  playerRanking
}