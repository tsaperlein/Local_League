import express from 'express'
import standingsFunc from './controllers/standingsCon.mjs'
import mainPageFunc from './controllers/mainPageCon.mjs'
import teamFunc from './controllers/teamsCon.mjs'
import scheduleFunc from './controllers/schedulePageCon.mjs'

import { Handlebars } from './controllers/handlebarsHelpers.mjs'

// Team.find().sort({ rank: 1 }).lean().then(result =>{
//     teamsData = {teams: result};
// })
// .catch(err => console.log(err))

const router = express.Router()

// router.get('/', (req, res) => {
//     Team.find().lean().then(result => {
//         res.render('home', { layout: 'main', team: result })
//     })
// })

router.get('/main-page', mainPageFunc.mainPageStandings);

router.get('/schedule', scheduleFunc.matchFilling);

router.get('/standings', standingsFunc.teamRanking);

router.get('/teams/:name', teamFunc.teamDisplay);

export { router }