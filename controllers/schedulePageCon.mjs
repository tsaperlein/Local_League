import team_obj from '../modules/teamData.mjs'
import match_obj from '../modules/matchData.mjs'
import { get } from 'mongoose';

const { Match } = match_obj;
const { Team } = team_obj;

function getWeekRange(week){
    const dateComponents = week.split(" - ");
    const startDateString = dateComponents[0];
    const endDateString = dateComponents[1];
    const currentYear = new Date().getFullYear();
    const startDate = new Date(`${startDateString}-${currentYear}`).toISOString().slice(0, 10);
    const endDate = new Date(`${endDateString}-${currentYear}`).toISOString().slice(0, 10);
    return { startDate, endDate };
}

function getNextWeek(week){
    const weekObj = getWeekRange(week);
    const startObj = new Date(weekObj.endDate);
    const startDateObj = new Date(startObj.setDate(startObj.getDate() + 1)).toLocaleString('en-US', { month: 'short', day: 'numeric' });
    const endDateObj = new Date(startObj.setDate(startObj.getDate() + 7)).toLocaleString('en-US', { month: 'short', day: 'numeric' });
    const nextWeek = startDateObj + " - " + endDateObj;
    return nextWeek;
}

function getPreviousWeek(week){
    const weekObj = getWeekRange(week);
    const endObj = new Date(weekObj.startDate);
    const endDateObj = new Date(endObj.setDate(endObj.getDate() + 1)).toLocaleString('en-US', { month: 'short', day: 'numeric' });
    const startDateObj = new Date(endObj.setDate(endObj.getDate() - 7)).toLocaleString('en-US', { month: 'short', day: 'numeric' });
    const previousWeek = startDateObj + " - " + endDateObj;
    return previousWeek;
}

// Take data from both collections and fill the schedule page
const matchFilling = (req, res) => {
    if(req.session.username == undefined) res.redirect('/Local-League/main-page');
    else{
        const week = req.params.week;
        Match.find({ date: { $gte: getWeekRange(week).startDate, $lt: getWeekRange(week).endDate }}).lean().then(result => {
            Team.find().lean().then(result2 => {
                res.render('schedule', { match: result, team: result2, teams: result2, username: req.session.username, displayDate: week, thisWeek: week, displayNextWeek: getNextWeek(week), displayPreviousWeek: getPreviousWeek(week) })
            })
        })
        .catch(err => console.log(err))
    }
}

export default {
    matchFilling
}