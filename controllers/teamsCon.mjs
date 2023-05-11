import obj from '../modules/singleTeamData.mjs'

const { singleTeam } = obj;

const teamDisplay = (req, res) => {
    const teamName = req.params.name;
    singleTeam.find({ name: teamName }).lean().then(result => {
        res.render('teams', { team: result, players: result[0].players })
    })
    .catch(err => console.log(err))
}

export default {
    teamDisplay
}