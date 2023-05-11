import express from 'express'
import match_obj from './modules/matchData.mjs'
import standingsFunc from './controllers/standingsCon.mjs'
import mainPageFunc from './controllers/mainPageCon.mjs'
import obj from './modules/singleTeamData.mjs'
import { Handlebars } from './controllers/handlebarsHelpers.mjs'

const { Match } = match_obj;
const { singleTeam } = obj;
let teamsData = {}
// Team.find().sort({ rank: 1 }).lean().then(result =>{
//     teamsData = {teams: result};
// })
// .catch(err => console.log(err))

const router = express.Router()

router.get('/main-page', mainPageFunc.mainPageStandings);

router.get('/schedule', (req, res) => {
    Match.find().lean().then(result =>{
        res.render('schedule', { match: result })
    })
    .catch(err => console.log(err))
})

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