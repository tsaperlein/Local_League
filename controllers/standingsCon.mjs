import obj from '../modules/teamData.mjs'

const { Team } = obj;

const teamRanking = (req, res) => {
  Team.find().sort({ rank: 1 }).lean().then(result =>{
    res.render('standings', { team: result })
  })
  .catch(err => console.log(err))
}

export default {
    teamRanking
  }