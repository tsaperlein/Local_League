import express from 'express'
//import match_obj from './modules/matchData.mjs'
import standingsFunc from './controllers/standingsCon.mjs'
import mainPageFunc from './controllers/mainPageCon.mjs'
import teamFunc from './controllers/teamsCon.mjs'

//const { Match } = match_obj;

const router = express.Router()

router.get('/main-page', mainPageFunc.mainPageStandings);

// router.get('/schedule', (req, res) => {
//     Match.find().lean().then(result =>{
//         console.log(result)
//         res.render('schedule', { match: result })
//     })
//     .catch(err => console.log(err))
// });

router.get('/standings', standingsFunc.teamRanking);

router.get('/teams/:name', teamFunc.teamDisplay);

export { router }