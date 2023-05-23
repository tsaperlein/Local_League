import express from 'express'
import standingsFunc from './controllers/standingsCon.mjs'
import mainPageFunc from './controllers/mainPageCon.mjs'
import teamFunc from './controllers/teamsCon.mjs'
import scheduleFunc from './controllers/schedulePageCon.mjs'
import authFunc from './controllers/authenticationCon.mjs'
import { Handlebars } from './controllers/handlebarsHelpers.mjs'

const router = express.Router()

router.get('/main-page', mainPageFunc.mainPageStandings);

router.get('/schedule/:week', scheduleFunc.matchFilling);

router.get('/standings', standingsFunc.teamRanking);

router.get('/standings/homewins', standingsFunc.rankByHomeWins);

router.get('/standings/guestwins', standingsFunc.rankByAwayWins);

router.get('/teams/:name', teamFunc.teamDisplay);

router.post('/main-page', authFunc.authenticateUser);

router.post('/standings', teamFunc.addTeam);

export { router }