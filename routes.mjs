import express from 'express'
<<<<<<< Updated upstream
import team_obj from './models/teamData.mjs'
import match_obj from './models/matchData.mjs'

const { Team } = team_obj;
const { Match } = match_obj;
let teamsData = {}
// Team.find().sort({ rank: 1 }).lean().then(result =>{
//     teamsData = {teams: result};
// })
// .catch(err => console.log(err))
=======
import standingsFunc from './controllers/standingsCon.mjs'
import mainPageFunc from './controllers/mainPageCon.mjs'
import obj from './modules/singleTeamData.mjs'

const { singleTeam } = obj;
>>>>>>> Stashed changes

const router = express.Router()

router.get('/main-page', mainPageFunc.mainPageStandings);

<<<<<<< Updated upstream
router.get('/schedule', (req, res) => {
    Match.find().lean().then(result =>{
        console.log(result)
        res.render('schedule', { match: result })
    })
    .catch(err => console.log(err))
})
=======
router.get('/schedule', (req, res) => res.render('schedule'));
>>>>>>> Stashed changes

router.get('/standings', standingsFunc.teamRanking);

router.get('/teams/:name', (req, res) => {
    const teamName = req.params.name;
    singleTeam.find({ name: teamName }).lean().then(result => {
        console.log(result['players'])
        res.render('teams', { team: result })
    })
    .catch(err => console.log(err))
});

export { router }