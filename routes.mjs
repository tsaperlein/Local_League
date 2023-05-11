import express from 'express'
import team_obj from './models/teamData.mjs'
import match_obj from './models/matchData.mjs'

const { Team } = team_obj;
const { Match } = match_obj;
let teamsData = {}
// Team.find().sort({ rank: 1 }).lean().then(result =>{
//     teamsData = {teams: result};
// })
// .catch(err => console.log(err))

const router = express.Router()

router.get('/main-page', (req, res) => res.render('main-page'))

router.get('/schedule', (req, res) => {
    Match.find().lean().then(result =>{
        console.log(result)
        res.render('schedule', { match: result })
    })
    .catch(err => console.log(err))
})

router.get('/standings', (req, res) => {
    Team.find().sort({ rank: 1 }).lean().then(result =>{
        res.render('standings', { team: result })
    })
    .catch(err => console.log(err))
});

// const teamsData = {
//     teams: [
//     {name: 'AEK', rank: 1},
//     {name: 'Aris', rank: 2},
// ]}

// router.get('/standings', (req, res) => {
//     res.render('standings', { team: teamsData.teams })
// })

// router.get('/teams/team/:team', (req, res) => res.render('teams', { team: req.params.team }))



export { router }