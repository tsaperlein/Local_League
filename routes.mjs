import express from 'express'
import standingsFunc from './controllers/standingsCon.mjs'
import mainPageFunc from './controllers/mainPageCon.mjs'
import teamFunc from './controllers/teamsCon.mjs'
import scheduleFunc from './controllers/schedulePageCon.mjs'
import authFunc from './controllers/authenticationCon.mjs'
import { Handlebars } from './controllers/handlebarsHelpers.mjs'

const router = express.Router()

router.get('/main-page', mainPageFunc.mainPageStandings);

router.get('/schedule/:week/All-Teams', scheduleFunc.matchFilling);
router.get('/schedule/:week/:team', scheduleFunc.matchFillingTeam);

router.get('/standings', standingsFunc.teamRanking);
router.get('/standings/homewins', standingsFunc.rankByHomeWins);
router.get('/standings/guestwins', standingsFunc.rankByAwayWins);

router.get('/teams/:name', teamFunc.teamDisplay);

// Authentication Form
router.post('/main-page', authFunc.authenticateUser);

// Add Forms
router.post('/standings', teamFunc.addTeam);

// Delete Forms
router.delete('/teams/:name', teamFunc.deleteTeam);
router.delete('/teams/:teamName/:playerName', teamFunc.deletePlayer);

router.delete('/schedule/:week/:team/:date/:homeTeam/:statId', scheduleFunc.deleteStat);

export { router }