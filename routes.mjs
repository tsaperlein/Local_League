import express from 'express'
import obj from './models/teamData.mjs'

const { Team } = obj;


const router = express.Router()

router.get('/main-page', (req, res) => res.render('main-page'))

router.get('/schedule', (req, res) => res.render('schedule'))

router.get('/standings', (req, res) => {
    Team.find().sort({ rank: 1 }).then(result =>{
        result.forEach(element => {
            res.render('standings', { team: element })
        });
    });
})

// router.get('/teams/team/:team', (req, res) => res.render('teams', { team: req.params.team }))



export { router }