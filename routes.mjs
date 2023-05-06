import express from 'express'

const router = express.Router()

router.get('/main-page', (req, res) => res.render('main-page'))

router.get('/schedule', (req, res) => res.render('schedule'))

router.get('/standings', (req, res) => res.render('standings'))

router.get('/teams', (req, res) => res.render('teams'))

export { router }