import single_team_obj from '../modules/singleTeamData.mjs'
import team_obj from '../modules/teamData.mjs'
import user_obj from '../modules/userData.mjs'

const { singleTeam } = single_team_obj;
const { Team } = team_obj;
const { User } = user_obj;

const startDate = new Date();
const endDate = new Date();
startDate.setDate(startDate.getDate() - 3);
endDate.setDate(startDate.getDate() + 7);
const thisWeek = startDate.toLocaleString('en-US', { month: 'short', day: 'numeric' }) + " - " + endDate.toLocaleString('en-US', { month: 'short', day: 'numeric' });

const teamDisplay = (req, res) => {
    if(req.session.username == undefined) res.redirect('/Local-League/main-page');
    else{
        const teamName = req.params.name;
        singleTeam.find({ name: teamName }).lean().then(result => {
            Team.find().lean().then(result2 => {
                User.find().lean().then(result3 => {
                    let role = "user";
                    for (let i = 0; i < result3.length; i++) {
                        if (result3[i].username == req.session.username) {
                            if (result3[i].role == "admin") role = "admin";
                        }
                    }
                    let teamPLayers = result[0];
                    if (teamPLayers == undefined) teamPLayers = [];
                    else teamPLayers = teamPLayers.players;
                    res.render('teams', { team: result, players: teamPLayers, teams: result2, username: req.session.username, thisWeek: thisWeek, role: role })
                })
            })
        })
        .catch(err => console.log(err))
    }
}

const addTeam = (req, res) => {
    //console.log(req.body);
    Team.findOne({ name: req.body.name }).lean().then((team) => {
        if(team != null){
            res.render('standings', { errorMessage: "This team already exists", ...req.session.previousStandingsRender })
        }
        else{
            const newTeam = new Team({
                name: req.body.name,
                logo: req.body.teamIcon,
            });
            const newSingleTeam = new singleTeam({
                name: req.body.name,
                lineup: req.body.lineupImage,
                fieldName: req.body.fieldName,
                fieldLink: req.body.fieldImage
            });
            newTeam.save().then((result) => {
                newSingleTeam.save().then((result2) => {
                    res.redirect('/Local-League/teams/' + req.body.name);
                })
                .catch((err) => {
                    console.log(err);
                })
            })
            .catch((err) => {
                console.log(err);
            })
        }
    })
}

const deleteTeam = (req, res) => {
    const teamName = req.params.name;
    singleTeam.findOneAndDelete({ name: teamName }).lean().then((result) => {
        Team.findOneAndDelete({ name: teamName }).lean().then((result2) => {
            res.json({ redirect: '/Local-League/standings' });
        })
        .catch((err) => {
            console.log(err);
        })
    })
    .catch((err) => {
        console.log(err);
    })
}

const deletePlayer = (req, res) => {
    const teamName = req.params.teamName;
    const playerName = req.params.playerName;
    // Find the player in the team and delete it
    singleTeam.findOneAndUpdate({ name: teamName }, { $pull: { players: { name: playerName } } }).lean().then((result) => {
        res.json({ redirect: '/Local-League/teams/' + teamName });
    })
}

export default {
    teamDisplay,
    addTeam,
    deleteTeam,
    deletePlayer
}