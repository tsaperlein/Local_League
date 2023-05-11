import obj from '../modules/teamData.mjs'

const { Team } = obj;

const mainPageStandings = (req, res) => {
    Team.find().sort({ rank: 1 }).limit(5).lean().then(result =>{
        res.render('main-page', { team: result })
    })
    .catch(err => console.log(err))
}

export default {
    mainPageStandings
  }