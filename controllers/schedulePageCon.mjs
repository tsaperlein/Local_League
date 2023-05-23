import team_obj from '../modules/teamData.mjs'
import match_obj from '../modules/matchData.mjs'
import user_obj from '../modules/userData.mjs'
import { get } from 'mongoose';

const { Match } = match_obj;
const { Team } = team_obj;
const { User } = user_obj;

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
                    res.render('schedule', { match: result, team: result2, teams: result2, username: req.session.username, displayDate: week, displayNextWeek: getNextWeek(week), displayPreviousWeek: getPreviousWeek(week), role: role, allTeams: true })
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
                    res.render('schedule', { match: result, team: result2, teams: result2, username: req.session.username, displayDate: week, displayNextWeek: getNextWeek(week), displayPreviousWeek: getPreviousWeek(week), role: role, teamName: team, allTeams: false })
                })
            })
        })
            .catch(err => console.log(err))
    }
}

export default {
    matchFilling,
    matchFillingTeam
}