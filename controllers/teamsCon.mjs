import single_team_obj from '../models/singleTeamData.mjs'
import team_obj from '../models/teamData.mjs'
import user_obj from '../models/userData.mjs'
import player_obj from '../models/playerData.mjs'
import match_obj from '../models/matchData.mjs'

const { singleTeam } = single_team_obj;
const { Team } = team_obj;
const { User } = user_obj;
const { Player } = player_obj;
const { Match } = match_obj;

const startDate = new Date();
const endDate = new Date();
startDate.setDate(startDate.getDate() - 3);
endDate.setDate(startDate.getDate() + 7);
const thisWeek = startDate.toLocaleString('en-US', { month: 'short', day: 'numeric' }) + " - " + endDate.toLocaleString('en-US', { month: 'short', day: 'numeric' });

const calculatePlayersStats = async (req, res) => {
    try {
        const teamName = req.params.name;
        const players = await Player.find({ team: teamName }).lean();
        
        const playersStats = {};
        const matches = await Match.find({ $or: [{ 'homeTeam.name': teamName }, { 'awayTeam.name': teamName }] }).lean();
        
        for (let i = 0; i < players.length; i++) {
            const player = players[i];
            let goals = 0;
            let yellowCards = 0;
            let redCards = 0;

            for (let j = 0; j < matches.length; j++) {
                const match = matches[j];
                for (let k = 0; k < match.stats.length; k++) {
                const stat = match.stats[k];
                    if (stat.name === player.name) {
                        if (stat.type === "goal") goals++;
                        else if (stat.type === "yellow card") yellowCards++;
                        else if (stat.type === "red card") redCards++;
                    }
                }
            }
            
            playersStats[player.name] = {
                goals: goals,
                yellowCards: yellowCards,
                redCards: redCards
            };
        }

        return playersStats;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const teamDisplay = (req, res) => {
    if(req.session.username == undefined) res.redirect('/Local-League/main-page');
    else{
        const teamName = req.params.name;
        singleTeam.find({ name: teamName }).lean().then(result => {
            Player.find({ team: teamName }).lean().then(result1 => {
                Team.find().lean().then(result2 => {
                    User.find().lean().then(result3 => {
                        let role = "user";
                        for (let i = 0; i < result3.length; i++) {
                            if (result3[i].username == req.session.username) {
                                if (result3[i].role == "admin") role = "admin";
                            }
                        }
                        let teamPlayers = result1;
                        if (teamPlayers == undefined) teamPlayers = [];
                        else teamPlayers = teamPlayers;
                        req.session.team = req.params.name;

                        // Get the stats for each player from the dictionary that returns calculatePlayersStats, by using the player name as key
                        calculatePlayersStats(req, res)
                            .then(playersStats => {
                                // Add the stats to the players array
                                for (let i = 0; i < teamPlayers.length; i++) {
                                    const player = teamPlayers[i];
                                    player.stats = playersStats[player.name];
                                }
                                res.render('teams', { team: result, players: teamPlayers, teams: result2, username: req.session.username, thisWeek: thisWeek, role: role, errorMessage: req.session.errorMessage })
                                req.session.errorMessage = "";
                            })
                            .catch(err => console.log(err))
                    })
                        .catch(err => console.log(err))
                })
                    .catch(err => console.log(err))
            })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }
}

const addTeam = (req, res) => {
    let error = false;
    Team.findOne({ name: req.body.name }).lean().then((team) => {
        if (team != null) {
            error = true;
            req.session.errorMessage = "This team already exists";
            res.redirect('/Local-League/standings');
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
            if (!error) {
                newTeam.save().then((result) => {
                    newSingleTeam.save().then((result2) => {
                        req.session.team = req.body.name;
                        redirectToTeams(req, res);
                    })
                        .catch((err) => {
                            console.log(err);
                        })
                })
                    .catch((err) => {
                        console.log(err);
                    })
            }
            else {
                req.session.team = req.body.name;
                redirectToTeams(req, res);
            }
        }
    })
}

const addPlayer = (req, res) => {
    let error = false;
    Player.findOne({ name: req.body.name }).lean().then((player) => {
        if(player != null){
            error = true;
            req.session.errorMessage = "This player already exists";
            req.session.team = req.body.team;
            redirectToTeams(req, res);
        }
        else{
            const newPlayer = new Player({
                name: req.body.name,
                team: req.body.team,
                number: req.body.jerseyNumber,
                age: req.body.age,
                position: req.body.position,
                nationality: req.body.nationality
            });
            if (!error) {
                newPlayer.save().then((result) => {
                    singleTeam.findOneAndUpdate({ name: req.body.team }, { $push: { players: result } }).lean().then((result2) => {
                        req.session.team = req.body.team;
                        redirectToTeams(req, res);
                    })
                        .catch((err) => {
                            console.log(err);
                        })
                })
                    .catch((err) => {
                        console.log(err);
                    })
            }
            else {
                req.session.team = req.body.team;
                redirectToTeams(req, res);
            }
        }
    });
}

const editTeam = (req, res) => {
    let error = false;
    if (req.body.name != req.body.previousName) {
        // Check if the new team name is the same as another team
        singleTeam.findOne({ name: req.body.name }).lean().then((result) => {
            if (result != null) {
                error = true;
                req.session.errorMessage = "This team already exists";
                req.session.team = req.body.previousName;
                redirectToTeams(req, res);
            }
            else {
                if (!error) {
                    // Update the team and the single team
                    Team.findOneAndUpdate({ name: req.body.previousName }, { name: req.body.name, logo: req.body.teamImage }).lean().then((result2) => {
                        singleTeam.findOneAndUpdate({ name: req.body.previousName }, { name: req.body.name }).lean().then((result3) => {
                            // Find all the matches from the previous team and change the team name
                            Match.find({ $or: [{ 'homeTeam.name': req.body.previousName }, { 'awayTeam.name': req.body.previousName }] }).lean().then((result4) => {
                                for (let i = 0; i < result4.length; i++) {
                                    if (result4[i].homeTeam.name == req.body.previousName) {
                                        Match.findOneAndUpdate({ _id: result4[i]._id }, { homeTeam: { name: req.body.name, logo: '/team-icons/' + req.body.teamImage, score: result4[i].homeTeam.score, possession: result4[i].homeTeam.possession } }).lean().then((result5) => {
                                            req.session.team = req.body.name;
                                        })
                                            .catch((err) => console.log(err));
                                    }
                                    else if (result4[i].awayTeam.name == req.body.previousName) {
                                        Match.findOneAndUpdate({ _id: result4[i]._id }, { awayTeam: { name: req.body.name, logo: '/team-icons/' + req.body.teamImage, score: result4[i].awayTeam.score, possession: result4[i].awayTeam.possession } }).lean().then((result5) => {
                                            req.session.team = req.body.name;
                                        })
                                            .catch((err) => console.log(err));
                                    }
                                }
                                // Change the team attribute in all players of the previous team
                                Player.find({ team: req.body.previousName }).lean().then((result4) => {
                                    for (let i = 0; i < result4.length; i++) {
                                        Player.findOneAndUpdate({ name: result4[i].name }, { team: req.body.name }).lean().then((result5) => {
                                            req.session.team = req.body.name;
                                            redirectToTeams(req, res);
                                        })
                                        .catch((err) => console.log(err));
                                    }
                                })
                                    .catch((err) => console.log(err));
                            })
                                .catch((err) => console.log(err));
                        })
                            .catch((err) => console.log(err));
                    })
                        .catch((err) => console.log(err));
                }
                else {
                    req.session.team = req.body.previousName;
                    redirectToTeams(req, res);
                }
            }
        })
        .catch((err) => console.log(err));
    }
    else {
        if (!error) {
            Team.findOneAndUpdate({ name: req.body.name }, { logo: req.body.teamImage }).lean().then((result) => {
                req.session.team = req.body.name;
                redirectToTeams(req, res);
            })
            .catch((err) => console.log(err));
        }
    }
}

const editLineup = (req, res) => {
    //console.log(req.body);
    singleTeam.findOneAndUpdate({ name: req.params.team }, { lineup: req.body.lineupImage }).lean().then((result) => {
        req.session.team = req.params.team;
        redirectToTeams(req, res);
    })
    .catch((err) => console.log(err));
}

const editFieldImg = (req, res) => {
    //console.log(req.body);
    singleTeam.findOneAndUpdate({ name: req.params.team }, { fieldLink: req.body.fieldImage }).lean().then((result) => {
        req.session.team = req.params.team;
        redirectToTeams(req, res);
    })
    .catch((err) => console.log(err));
}

const editFieldName = (req, res) => {
    //console.log(req.body);
    singleTeam.findOneAndUpdate({ name: req.params.team }, { fieldName: req.body.fieldName }).lean().then((result) => {
        req.session.team = req.params.team;
        redirectToTeams(req, res);
    })
    .catch((err) => console.log(err));
}

const editPlayer = (req, res) => {
    let error = false;
    // Check if the jersey number changed
    Player.find({ name: req.body.name }).lean().then((result) => {
        //console.log(result);
        if (result[0].number != req.body.jerseyNumber) {
            // Search all players to see if the jersey number is already taken
            Player.find({team: req.body.team}).lean().then((result) => {
                // Check all jersey numbers to see if the new number is already taken
                for (let i = 0; i < result.length; i++) {
                    if (result[i].number == req.body.jerseyNumber && result[i].name != req.body.name) {
                        error = true;
                        req.session.errorMessage = "This jersey number is already taken";
                        req.session.team = req.body.previousTeam;
                        redirectToTeams(req, res);
                    }
                }
            })
            .catch((err) => console.log(err));
        }
        // Update the player
        if (!error) {
            // Find if the new team exists
            singleTeam.findOne({ name: req.body.team }).lean().then((result) => {
                if (result == null) {
                    error = true;
                    req.session.errorMessage = "This team does not exist";
                    req.session.team = req.body.previousTeam;
                    redirectToTeams(req, res);
                }
                else {
                    if (!error) {
                        // Update the player and the single team
                        console.log(req.body);
                        Player.findOneAndUpdate({ name: req.body.name }, { team: req.body.team, number: req.body.jerseyNumber, age: req.body.age, position: req.body.position, nationality: req.body.nationality }).lean().then((result) => {
                            // If the team changed, update the single team
                            if (req.body.team != req.body.previousTeam) {
                                // Previous Team
                                singleTeam.findOneAndUpdate({ name: req.body.previousTeam }, { $pull: { players: result.name } }).lean().then((result2) => {
                                    // New Team
                                    singleTeam.findOneAndUpdate({ name: req.body.team }, { $push: { players: result.name } }).lean().then((result3) => {
                                        req.session.team = req.body.team;
                                        redirectToTeams(req, res);
                                    })
                                    .catch((err) => console.log(err));
                                })
                                .catch((err) => console.log(err));
                            }
                            else {
                                req.session.team = req.body.team;
                                redirectToTeams(req, res);
                            }
                        })
                        .catch((err) => console.log(err));
                    }
                    else redirectToTeams(req, res);
                }
            })
                .catch((err) => console.log(err));
        }
    })  
        .catch((err) => console.log(err));
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
    const playerName = req.params.playerName;
    // Find the player in the team and delete it
    Player.findOneAndDelete({ name: playerName }).lean().then((result) => {
        // Find the team and delete the player from the team
        singleTeam.findOne({ name: req.params.teamName }).lean().then((result2) => {
            let players = result2.players;
            for (let i = 0; i < players.length; i++) {
                if (players[i].name == playerName) {
                    players.splice(i, 1);
                    break;
                }
            }
            singleTeam.findOneAndUpdate({ name: req.params.teamName }, { players: players }).lean().then((result3) => {
                res.json({ redirect: '/Local-League/teams/' + req.params.teamName });
            })
            .catch((err) => {
                console.log(err);
            })
        })
        .catch((err) => {
            console.log(err);
        })
    })
}

const redirectToTeams = (req, res) => {
    res.redirect('/Local-League/teams/' + req.session.team);
};

export default {
    teamDisplay,
    addTeam,
    addPlayer,
    editTeam,
    editPlayer,
    deleteTeam,
    deletePlayer,
    editLineup,
    editFieldImg,
    editFieldName
}