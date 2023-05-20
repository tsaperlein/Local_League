import Handlebars from 'handlebars'
import moment from 'moment'

Handlebars.registerHelper('ifeq', function (a, b, opts) {
    if (a == b) {
        // Continue with code inside the block
        return opts.fn(this)
    } else {
        // Continue with code outside the block
        return opts.inverse(this)
    }
})

// Gets the date and writes it in the format: dddd MMM D
Handlebars.registerHelper('formatDate', function (date) {
    return moment(date).format('dddd MMM D')
})

Handlebars.registerHelper('formatId', function (homeTeam, awayTeam, date) {
    // Use the formatName helper to format the team names
    homeTeam = Handlebars.helpers.formatName(homeTeam).toLowerCase()
    awayTeam = Handlebars.helpers.formatName(awayTeam).toLowerCase()

    date = moment(date).format('DD-MM')
    if (date[1] === '-') date = '0' + date

    return `${homeTeam}-${awayTeam}-${date}`
})

// Get the type of the stat and return the src of the image
Handlebars.registerHelper('formatStat', function (stat) {
    // join the words with '-'
    stat = stat.split(' ').join('-')
    if (stat === 'goal') return 'https://ssl.gstatic.com/onebox/sports/game_feed/goal_icon.svg'
    else if (stat === 'yellow-card') return 'https://ssl.gstatic.com/onebox/sports/soccer_timeline/yellow-card.svg'
    else if (stat === 'red-card') return 'https://ssl.gstatic.com/onebox/sports/soccer_timeline/yellow-card.svg'
})

// format too much letters in a string to only 3-4 letters
Handlebars.registerHelper('formatName', function (string) {
    if (string.length > 4) {
        // if uppercase letters are morw than 1, then keep the uppercase letters joined by a dot
        if (string.match(/[A-Z]/g).length > 1) {
            return string.match(/[A-Z]/g).join('')
        } else {
            // return the first 3 letters in uppercase
            return string.slice(0, 3).toUpperCase()
        }
    } else {
        return string
    }
})

export { Handlebars }