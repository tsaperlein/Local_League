import team_obj from '../models/teamData.mjs'
import match_obj from '../models/matchData.mjs'
import user_obj from '../models/userData.mjs'
import player_obj from '../models/playerData.mjs';
import single_team_obj from '../models/singleTeamData.mjs';
import { get } from 'mongoose';

const { Match } = match_obj;
const { Team } = team_obj;
const { User } = user_obj;
const { Player } = player_obj;
const { singleTeam } = single_team_obj;

function getWeekRange(week) {
    const dateComponents = week.split(" - ");
    const startDateString = dateComponents[0];
    const endDateString = dateComponents[1];
    const currentYear = new Date().getFullYear();
    const startDate = new Date(`${startDateString}-${currentYear}`).toISOString().slice(0, 10);
    const endDate = new Date(`${endDateString}-${currentYear}`).toISOString().slice(0, 10);
    return { startDate, endDate };
}

function getNextWeek(week) {
    const weekObj = getWeekRange(week);
    const startObj = new Date(weekObj.endDate);
    const startDateObj = new Date(startObj.setDate(startObj.getDate() + 1)).toLocaleString('en-US', { month: 'short', day: 'numeric' });
    const endDateObj = new Date(startObj.setDate(startObj.getDate() + 7)).toLocaleString('en-US', { month: 'short', day: 'numeric' });
    const nextWeek = startDateObj + " - " + endDateObj;
    return nextWeek;
}

function getPreviousWeek(week) {
    const weekObj = getWeekRange(week);
    const endObj = new Date(weekObj.startDate);
    const endDateObj = new Date(endObj.setDate(endObj.getDate() + 1)).toLocaleString('en-US', { month: 'short', day: 'numeric' });
    const startDateObj = new Date(endObj.setDate(endObj.getDate() - 7)).toLocaleString('en-US', { month: 'short', day: 'numeric' });
    const previousWeek = startDateObj + " - " + endDateObj;
    return previousWeek;
}

// Take data from both collections and fill the schedule page
const matchFilling = (req, res) => {
    if (req.session.username == undefined) res.redirect('/Local-League/main-page');
    else {
        const week = req.params.week;
        Match.find({ date: { $gte: getWeekRange(week).startDate, $lt: getWeekRange(week).endDate } }).sort({ date: 1 }).lean().then(result => {
            Team.find().lean().then(result2 => {
                User.find().lean().then(result3 => {
                    let role = "user";
                    for (let i = 0; i < result3.length; i++) {
                        if (result3[i].username == req.session.username) {
                            if (result3[i].role == "admin") role = "admin";
                        }
                    }
                    req.session.previousScheduleRender = {
                        displayDate: week,
                        teamName: 'All-Teams'
                    }
                    res.render('schedule', { match: result, team: result2, teams: result2, username: req.session.username, displayDate: week, thisWeek: week, displayNextWeek: getNextWeek(week), displayPreviousWeek: getPreviousWeek(week), role: role, allTeams: true, errorMessage: req.session.errorMessage })
                    req.session.errorMessage = "";
                })
            })
        })
            .catch(err => console.log(err))
    }
}

const matchFillingTeam = (req, res) => {
    if (req.session.username == undefined) res.redirect('/Local-League/main-page');
    else {
        const week = req.params.week;
        const team = req.params.team.split("-").join(" ");
        Match.find({ $or: [{ "homeTeam.name": team }, { "awayTeam.name": team }], date: { $gte: getWeekRange(week).startDate, $lt: getWeekRange(week).endDate } }).sort({ date: 1 }).lean().then(result => {
            Team.find().lean().then(result2 => {
                User.find().lean().then(result3 => {
                    let role = "user";
                    for (let i = 0; i < result3.length; i++) {
                        if (result3[i].username == req.session.username) {
                            if (result3[i].role == "admin") role = "admin";
                        }
                    }
                    req.session.previousScheduleRender = {
                        displayDate: week,
                        teamName: team
                    }
                    res.render('schedule', { match: result, team: result2, teams: result2, username: req.session.username, displayDate: week, thisWeek: week, displayNextWeek: getNextWeek(week), displayPreviousWeek: getPreviousWeek(week), role: role, teamName: team, allTeams: false, errorMessage: req.session.errorMessage })
                    req.session.errorMessage = "";
                })
            })
        })
            .catch(err => console.log(err))
    }
}

const addMatch = (req, res) => {
    if (req.session.username == undefined) res.redirect('/Local-League/main-page');
    else {
        let error = false;
        // Check if the home team or the away team has another match at the same day, either as home team or away team
        Match.findOne({ $or: [{ "homeTeam.name": req.body.homeTeam }, { "awayTeam.name": req.body.homeTeam }], date: req.body.date }).then(result => {
            Match.findOne({ $or: [{ "homeTeam.name": req.body.awayTeam }, { "awayTeam.name": req.body.awayTeam }], date: req.body.date }).then(result2 => {
                if (result != null) {
                    error = true;
                    req.session.errorMessage = "Home team has another match at the same day";
                    redirectToSchedule(req, res);
                }
                else if (result2 != null) {
                    error = true;
                    req.session.errorMessage = "Away team has another match at the same day";
                    redirectToSchedule(req, res);
                }
                else if (result == null && result2 == null) {
                    // Find the links for the images of the teams
                    Team.findOne({ name: req.body.homeTeam }).then(result3 => {
                        Team.findOne({ name: req.body.awayTeam }).then(result4 => {
                            if (result4 == null) {
                                error = true;
                                req.session.errorMessage = "Away team not found";
                                redirectToSchedule(req, res);
                            }
                            else if (result3 == null) {
                                error = true;
                                req.session.errorMessage = "Home team not found";
                                redirectToSchedule(req, res);
                            }
                            // If the match doesn't exist, create it and redirect to the schedule page
                            else if (result3 != null && result4 != null) {
                                // If the match is Final
                                if (req.body.state == "Final") {
                                    const match = new Match({
                                        date: req.body.date,
                                        state: req.body.state,
                                        stats: [],
                                        homeTeam: {
                                            name: req.body.homeTeam,
                                            logo: '/team-icons/' + result3.logo,
                                            score: 0,
                                            possession: 0
                                        },
                                        awayTeam: {
                                            name: req.body.awayTeam,
                                            logo: '/team-icons/' + result4.logo,
                                            score: 0,
                                            possession: 0
                                        },
                                        startTime: '',
                                        field: req.body.fieldName,
                                        referees: {
                                            main: req.body.mainReferee,
                                            assistant: req.body.assistantReferee
                                        }
                                    })
                                    if (!error) {
                                        match.save().then(result => {
                                            redirectToSchedule(req, res);
                                        })
                                            .catch(err => console.log(err))
                                    }
                                }
                                // If the match is Upcoming
                                else {
                                    const match = new Match({
                                        date: req.body.date,
                                        state: req.body.state,
                                        stats: [],
                                        homeTeam: {
                                            name: req.body.homeTeam,
                                            logo: '/team-icons/' + result3.logo,
                                            score: '',
                                            possession: ''
                                        },
                                        awayTeam: {
                                            name: req.body.awayTeam,
                                            logo: '/team-icons/' + result4.logo,
                                            score: '',
                                            possession: ''
                                        },
                                        startTime: req.body.time,
                                        field: req.body.fieldName,
                                        referees: {
                                            main: req.body.mainReferee,
                                            assistant: req.body.assistantReferee
                                        }
                                    })
                                    if (!error) {
                                        match.save().then(result => {
                                            redirectToSchedule(req, res);
                                        })
                                            .catch(err => console.log(err))
                                    }
                                }
                            }
                        })
                            .catch(err => console.log(err))
                    })
                        .catch(err => console.log(err))
                }
            })
                .catch(err => console.log(err))
        })
            .catch(err => console.log(err))
    }
}

const editMatch = (req, res) => {
    if (req.session.username == undefined) res.redirect('/Local-League/main-page');
    else {
        let error = false;
        if (req.body.previousHomeTeam != req.body.homeTeam || req.body.previousAwayTeam != req.body.awayTeam) {
            if (req.body.currentMatchDate != req.body.date) {
                // Update the match in the database and add score 0-0 if final
                // if the date is different from the current match date, check if the home team or the away team has another match at the same day, either as home team or away team
                Match.findOne({ $or: [{ "homeTeam.name": req.body.homeTeam }, { "awayTeam.name": req.body.homeTeam }], date: req.body.date }).then(result1 => {
                    Match.findOne({ $or: [{ "homeTeam.name": req.body.awayTeam }, { "awayTeam.name": req.body.awayTeam }], date: req.body.date }).then(result2 => {
                        if (result1 != null) {
                            error = true;
                            req.session.errorMessage = "Home team has another match at the same day";
                            redirectToSchedule(req, res);
                        }
                        else if (result2 != null) {
                            error = true;
                            req.session.errorMessage = "Away team has another match at the same day";
                            redirectToSchedule(req, res);
                        }
                    })
                        .catch(err => console.log(err))
                })
                    .catch(err => console.log(err))
            }
            if (!error) {
                // Find the links for the images of the teams
                Team.findOne({ name: req.body.homeTeam }).then(result3 => {
                    Team.findOne({ name: req.body.awayTeam }).then(result4 => {
                        if (result4 == null) {
                            error = true;
                            req.session.errorMessage = "Away team not found";
                            redirectToSchedule(req, res);
                        }
                        else if (result3 == null) {
                            error = true;
                            req.session.errorMessage = "Home team not found";
                            redirectToSchedule(req, res);
                        }
                        // If the match is Final
                        if (req.body.state == "Final") {
                            if (!error) {
                                Match.updateOne({ date: req.body.currentMatchDate, "homeTeam.name": req.body.previousHomeTeam, "awayTeam.name": req.body.previousAwayTeam }, {
                                    $set: {
                                        "date": req.body.date,
                                        "homeTeam.name": req.body.homeTeam,
                                        "awayTeam.name": req.body.awayTeam,
                                        "homeTeam.logo": '/team-icons/' + result3.logo,
                                        "awayTeam.logo": '/team-icons/' + result4.logo,
                                        "state": req.body.state,
                                        "stats": [],
                                        "homeTeam.score": 0,
                                        "awayTeam.score": 0,
                                        "homeTeam.possession": 0,
                                        "awayTeam.possession": 0,
                                        "field": req.body.fieldName,
                                        "referees.main": req.body.mainReferee,
                                        "referees.assistant": req.body.assistantReferee
                                    }
                                }).then(result => {
                                    redirectToSchedule(req, res);
                                })
                                    .catch(err => console.log(err))
                            }
                            else redirectToSchedule(req, res);
                        }
                        // If the match is Upcoming
                        else {
                            if (!error) {
                                Match.updateOne({ date: req.body.currentMatchDate, "homeTeam.name": req.body.previousHomeTeam, "awayTeam.name": req.body.previousAwayTeam }, {
                                    $set: {
                                        "date": req.body.date,
                                        "homeTeam.name": req.body.homeTeam,
                                        "awayTeam.name": req.body.awayTeam,
                                        "homeTeam.logo": '/team-icons/' + result3.logo,
                                        "awayTeam.logo": '/team-icons/' + result4.logo,
                                        "stats": [],
                                        "state": req.body.state,
                                        "startTime": req.body.time,
                                        "field": req.body.fieldName,
                                        "referees.main": req.body.mainReferee,
                                        "referees.assistant": req.body.assistantReferee
                                    }
                                }).then(result => {
                                    redirectToSchedule(req, res);
                                })
                                    .catch(err => console.log(err))
                            }
                            else redirectToSchedule(req, res);
                        }
                    })
                        .catch(err => console.log(err))
                })
                    .catch(err => console.log(err))
            }
            else redirectToSchedule(req, res);
        }
        else {
            if (!error) {
                if (req.body.currentMatchDate != req.body.date) {
                    // if the date is different from the current match date, check if the home team or the away team has another match at the same day, either as home team or away team
                    Match.findOne({ $or: [{ "homeTeam.name": req.body.homeTeam }, { "awayTeam.name": req.body.homeTeam }], date: req.body.date }).then(result1 => {
                        Match.findOne({ $or: [{ "homeTeam.name": req.body.awayTeam }, { "awayTeam.name": req.body.awayTeam }], date: req.body.date }).then(result2 => {
                            if (result1 != null) {
                                error = true;
                                req.session.errorMessage = "Home team has another match at the same day";
                                redirectToSchedule(req, res);
                            }
                            else if (result2 != null) {
                                error = true;
                                req.session.errorMessage = "Away team has another match at the same day";
                                redirectToSchedule(req, res);
                            }
                        })
                            .catch(err => console.log(err))
                    })
                        .catch(err => console.log(err))
                }
                if (req.body.state == "Final") {
                    if (!error) {
                        Match.updateOne({ date: req.body.currentMatchDate, "homeTeam.name": req.body.previousHomeTeam, "awayTeam.name": req.body.previousAwayTeam }, {
                            $set: {
                                "date": req.body.date,
                                "state": req.body.state,
                                "field": req.body.fieldName,
                                "referees.main": req.body.mainReferee,
                                "referees.assistant": req.body.assistantReferee
                            }
                        }).then(result => {
                            redirectToSchedule(req, res);
                        })
                            .catch(err => console.log(err))
                    }
                    else redirectToSchedule(req, res);
                }
                // If the match is Upcoming
                else {
                    if (!error) {
                        Match.updateOne({ date: req.body.currentMatchDate, "homeTeam.name": req.body.previousHomeTeam, "awayTeam.name": req.body.previousAwayTeam }, {
                            $set: {
                                "date": req.body.date,
                                "state": req.body.state,
                                "stats": [],
                                "startTime": req.body.time,
                                "field": req.body.fieldName,
                                "referees.main": req.body.mainReferee,
                                "referees.assistant": req.body.assistantReferee
                            }
                        }).then(result => {
                            redirectToSchedule(req, res);
                        })
                            .catch(err => console.log(err))
                    }
                    else redirectToSchedule(req, res);
                }
            }
            else redirectToSchedule(req, res);
        }
    }
}

const addStat = (req, res) => {
    if (req.session.username == undefined) res.redirect('/Local-League/main-page');
    else {
        let error = false;
        // Check if the team exists
        singleTeam.findOne({ name: req.body.teamName }).then(result1 => {
            if (result1 == null) {
                error = true;
                req.session.errorMessage = "This team doesn't exist";
                redirectToSchedule(req, res);
            }
            else {
                // Check if the team has this player
                Player.findOne({ name: req.body.playerName, team: req.body.teamName }).then(result2 => {
                    if (result2 == null) {
                        error = true;
                        req.session.errorMessage = "This player doesn't exist in this team";
                        redirectToSchedule(req, res);
                    }
                    else {
                        // Find the match that the stat will be added to
                        Match.findOne({ date: req.body.matchDate, "homeTeam.name": req.body.homeTeam }).then(result => {
                            if (result == null) {
                                error = true;
                                req.session.errorMessage = "This match does not exist";
                                redirectToSchedule(req, res);
                            }
                            else {
                                // Add a new stat that contains the team name, player name, type, minute, but put it in the right order of the stats array
                                let newStat = {
                                    id: '',
                                    team: req.body.teamName,
                                    name: req.body.playerName,
                                    type: req.body.type,
                                    minute: parseInt(req.body.minute)
                                }
                                let stats = [];
                                if (result.stats != null) stats = result.stats;
                                // Put the new stat in the right order, give it an id, and fixed the ids of the other stats
                                if (stats.length == 0) {
                                    newStat.id = 0;
                                    stats.push(newStat);
                                }
                                else {
                                    // Compare the minutes of the new goal with the minutes of a possible red card or two yellow cards, and if the new goal is after the red card or two yellow cards, then the new goal cannot be added
                                    if (newStat.type == "goal") {
                                        for (let i = 0; i < stats.length; i++) {
                                            if (stats[i].type == "red card" && stats[i].name == newStat.name) {
                                                if (stats[i].minute <= newStat.minute) {
                                                    error = true;
                                                    req.session.errorMessage = "This player has a red card, so he cannot score a goal";
                                                }
                                            }
                                            for (let j = i + 1; j < stats.length; j++) {
                                                if (stats[i].type == "yellow card" && stats[j].type == "yellow card" && stats[i].name == newStat.name && stats[j].name == newStat.name) {
                                                    if (stats[j].minute <= newStat.minute) {
                                                        error = true;
                                                        req.session.errorMessage = "This player has two yellow cards, so he cannot score a goal";
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    else if (newStat.type == "red card") {
                                        for (let i = 0; i < stats.length; i++) {
                                            if (stats[i].type == "goal" && stats[i].name == newStat.name) {
                                                if (stats[i].minute >= newStat.minute) {
                                                    error = true;
                                                    req.session.errorMessage = "This player has scored a goal, so he cannot get a red card";
                                                }
                                            }
                                            else if (stats[i].type == "red card" && stats[i].name == newStat.name) {
                                                error = true;
                                                req.session.errorMessage = "This player has a red card, so he cannot get another red card";
                                            }
                                            else if (stats[i].type == "yellow card" && stats[i].name == newStat.name) {
                                                if (stats[i].minute >= newStat.minute) {
                                                    error = true;
                                                    req.session.errorMessage = "This player has a yellow card, so he cannot get a red card before the yellow card";
                                                }
                                            }
                                            for (let j = i + 1; j < stats.length; j++) {
                                                if (stats[i].type == "yellow card" && stats[j].type == "yellow card" && stats[i].name == newStat.name && stats[j].name == newStat.name) {
                                                    error = true;
                                                    req.session.errorMessage = "This player has two yellow cards, so he cannot get a red card";
                                                }
                                            }
                                        }
                                    }
                                    else if (newStat.type == "yellow card") {
                                        // The player cannot get a yellow card if he has a red card before, or if he has two yellow cards before the minut of the yellow card that we want to add
                                        for (let i = 0; i < stats.length; i++) {
                                            if (stats[i].type == "red card" && stats[i].name == newStat.name) {
                                                if (stats[i].minute <= newStat.minute) {
                                                    error = true;
                                                    req.session.errorMessage = "This player has a red card, so he cannot get a yellow card";
                                                }
                                            }
                                            for (let j = i + 1; j < stats.length; j++) {
                                                if (stats[i].type == "yellow card" && stats[j].type == "yellow card" && stats[i].name == newStat.name && stats[j].name == newStat.name) {
                                                    error = true;
                                                    req.session.errorMessage = "This player has two yellow cards, so he cannot get another yellow card";
                                                }
                                                else if (stats[i].type == "yellow card" && stats[j].type == "goal" && stats[i].name == newStat.name && stats[j].name == newStat.name) {
                                                    if (stats[j].minute >= newStat.minute) {
                                                        error = true;
                                                        req.session.errorMessage = "This player has scored a goal, so he cannot get a second yellow card before the goal";
                                                    }
                                                }
                                                else if (stats[i].type == "yellow card" && stats[j].type == "red card" && stats[i].name == newStat.name && stats[j].name == newStat.name) {
                                                    if (stats[j].minute <= newStat.minute) {
                                                        error = true;
                                                        req.session.errorMessage = "This player has a red card, so he cannot get a second yellow card before the red card";
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                // Push the new stat in the stats array
                                if (!error) {
                                    stats.push(newStat);
                                }
                                // Double check that the order of the stats is correct
                                stats.sort((a, b) => {
                                    if (a.minute < b.minute) return -1;
                                    else if (a.minute > b.minute) return 1;
                                    else return 0;
                                });

                                for (let i = 0; i < stats.length; i++) {
                                    stats[i].id = i + 1;
                                }

                                // If the match is upcoming, then change it to final and add the stat and the scores for the teams
                                if (result.state == "Upcoming") {
                                    result.state = "Final";
                                    result.homeTeam.score = 0;
                                    result.awayTeam.score = 0;
                                }
                                // If new stat is a goal, then update the score of the match
                                if (newStat.type == "goal") {
                                    if (newStat.team == result.homeTeam.name) result.homeTeam.score++;
                                    else result.awayTeam.score++;
                                }
                            
                                if (!error) {
                                    if (result.state == "Final") {
                                        Match.updateOne({ date: result.date, "homeTeam.name": result.homeTeam.name }, { $set: { stats: stats, state: result.state, "homeTeam.score": result.homeTeam.score, "awayTeam.score": result.awayTeam.score } })
                                            .then(() => {
                                                redirectToSchedule(req, res);
                                            })
                                            .catch(err => console.log(err));
                                    }
                                }
                                else redirectToSchedule(req, res);
                            }
                        })
                            .catch(err => console.log(err));
                    }
                })
                    .catch(err => console.log(err));
            }
        })
            .catch(err => console.log(err));
    }
}

const editStat = (req, res) => {
    if (req.session.username == undefined) res.redirect('/Local-League/main-page');
    else {
        let error = false;
        // Check if the player is in the team
        Player.findOne({ name: req.body.name, team: req.body.team }).then(player => {
            if (player == null) {
                error = true;
                req.session.errorMessage = "This player does not exist";
                redirectToSchedule(req, res);
            }
            else {
                // Check if the player is in the match
                Match.findOne({ date: req.body.matchDate, "homeTeam.name": req.body.homeTeam }).then(result => {
                    if (result == null) {
                        error = true;
                        req.session.errorMessage = "This match does not exist";
                        redirectToSchedule(req, res);
                    }
                    else {
                        // Update the existing stat
                        let stats = result.stats;
                        let stat = stats.find(stat => stat.id == req.body.id);
                        stat.name = req.body.name;
                        stat.type = req.body.type;
                        stat.minute = parseInt(req.body.minute);

                        if (stat.type == "goal") {
                            for (let i = 0; i < stats.length; i++) {
                                if (stats[i].type == "red card" && stats[i].name == stat.name) {
                                    if (stats[i].minute <= stat.minute) {
                                        error = true;
                                        req.session.errorMessage = "This player has a red card, so he cannot score a goal";
                                    }
                                }
                                for (let j = i + 1; j < stats.length; j++) {
                                    if (stats[i].type == "yellow card" && stats[j].type == "yellow card" && stats[i].name == stat.name && stats[j].name == stat.name) {
                                        if (stats[j].minute <= stat.minute) {
                                            error = true;
                                            req.session.errorMessage = "This player has two yellow cards, so he cannot score a goal";
                                        }
                                    }
                                }
                            }
                        }
                        else if (stat.type == "red card") {
                            for (let i = 0; i < stats.length; i++) {
                                if (stats[i].type == "goal" && stats[i].name == stat.name) {
                                    if (stats[i].minute >= stat.minute) {
                                        error = true;
                                        req.session.errorMessage = "This player has scored a goal, so he cannot get a red card";
                                    }
                                }
                                else if (stats[i].type == "red card" && stats[i].name == stat.name) {
                                    error = true;
                                    req.session.errorMessage = "This player has a red card, so he cannot get another red card";
                                }
                                else if (stats[i].type == "yellow card" && stats[i].name == stat.name) {
                                    if (stats[i].minute >= stat.minute) {
                                        error = true;
                                        req.session.errorMessage = "This player has a yellow card, so he cannot get a red card before the yellow card";
                                    }
                                }
                                for (let j = i + 1; j < stats.length; j++) {
                                    if (stats[i].type == "yellow card" && stats[j].type == "yellow card" && stats[i].name == stat.name && stats[j].name == stat.name) {
                                        error = true;
                                        req.session.errorMessage = "This player has two yellow cards, so he cannot get a red card";
                                    }
                                }
                            }
                        }
                        else if (stat.type == "yellow card") {
                            // The player cannot get a yellow card if he has a red card before, or if he has two yellow cards before the minut of the yellow card that we want to add
                            for (let i = 0; i < stats.length; i++) {
                                if (stats[i].type == "red card" && stats[i].name == stat.name) {
                                    if (stats[i].minute <= stat.minute) {
                                        error = true;
                                        req.session.errorMessage = "This player has a red card, so he cannot get a yellow card";
                                    }
                                }
                                for (let j = i + 1; j < stats.length; j++) {
                                    if (stats[i].type == "yellow card" && stats[j].type == "yellow card" && stats[i].name == stat.name && stats[j].name == stat.name) {
                                        error = true;
                                        req.session.errorMessage = "This player has two yellow cards, so he cannot get another yellow card";
                                    }
                                    // If the player has a yellow card and then a goal, then he cannot get another yellow card before the goal
                                    else if (stats[i].type == "yellow card" && stats[j].type == "goal" && stats[i].name == stat.name && stats[j].name == stat.name) {
                                        if (stats[j].minute >= stat.minute) {
                                            error = true;
                                            req.session.errorMessage = "This player has scored a goal, so he cannot get a second yellow card";
                                        }
                                    }
                                    else if (stats[i].type == "yellow card" && stats[j].type == "goal" && stats[i].name == stat.name && stats[j].name == stat.name) {
                                        if (stats[j].minute <= stat.minute) {
                                            error = true;
                                            req.session.errorMessage = "This player has scored a goal, so he cannot get a second yellow card before the goal";
                                        }
                                    }
                                }   
                            }
                        }
                        stats.sort((a, b) => {
                            if (a.minute < b.minute) return -1;
                            else if (a.minute > b.minute) return 1;
                            else return 0;
                        });

                        for (let i = 0; i < stats.length; i++) {
                            stats[i].id = i;
                        }

                        if (stat.type == "goal") {
                            if (stat.team == result.homeTeam.name) result.homeTeam.score++;
                            else result.awayTeam.score++;
                        }

                        if (!error) {
                            Match.updateOne({ date: req.body.matchDate, "homeTeam.name": req.body.homeTeam }, { stats: stats, "homeTeam.score": result.homeTeam.score, "awayTeam.score": result.awayTeam.score })
                                .then(() => {
                                    redirectToSchedule(req, res);
                                })
                                .catch(err => console.log(err));
                        }
                        else redirectToSchedule(req, res);
                    }
                })
                    .catch(err => console.log(err));
            }
        })
            .catch(err => console.log(err));
    }
}

const deleteMatch = (req, res) => {
    if (req.session.username == undefined) res.redirect('/Local-League/main-page');
    else {
        const week = req.params.week;
        let team;
        if (req.params.team == "All-Teams") team = "All-Teams";
        else team = req.params.team.split("-").join(" ");
        const matchDate = req.params.date;
        const homeTeam = req.params.homeTeam.split("-").join(" ");
        // Delete the match from the database
        Match.deleteOne({ date: matchDate, "homeTeam.name": homeTeam }).then(result => {
            res.json({ redirect: `/Local-League/schedule/${week}/${team}` });
        })
            .catch(err => console.log(err))
    }
}

const deleteStat = (req, res) => {
    if (req.session.username == undefined) res.redirect('/Local-League/main-page');
    else {
        const week = req.params.week;
        let team;
        if (req.params.team == "All-Teams") team = "All-Teams";
        else team = req.params.team.split("-").join(" ");
        const matchDate = req.params.date;
        const homeTeam = req.params.homeTeam.split("-").join(" ");
        const statId = req.params.statId;
        Match.findOne({ date: matchDate, "homeTeam.name": homeTeam }).then(result => {
            const stats = result.stats;
            for (let i = 0; i < stats.length; i++) {
                if (stats[i].type == "goal" && stats[i].id == statId) {
                    // Update the score of the match
                    if (stats[i].team == result.homeTeam.name) result.homeTeam.score--;
                    else result.awayTeam.score--;
                }
                if (stats[i].id == statId) {
                    stats.splice(i, 1);
                    break;
                }
                // Fix the ids of the stats
                else if (stats[i].id > statId) stats[i].id--;
            }
            Match.updateOne({ date: matchDate, "homeTeam.name": homeTeam }, { $set: { stats: stats, "homeTeam.score": result.homeTeam.score, "awayTeam.score": result.awayTeam.score } }).then(() => {
                res.json({ redirect: `/Local-League/schedule/${week}/${team}` });
            })
        })
            .catch(err => console.log(err))
    }
}
const redirectToSchedule = (req, res) => {
    res.redirect('/Local-League/schedule/' + req.session.previousScheduleRender.displayDate + "/" + req.session.previousScheduleRender.teamName);
};

export default {
    matchFilling,
    matchFillingTeam,
    addMatch,
    addStat,
    editMatch,
    editStat,
    deleteMatch,
    deleteStat
}