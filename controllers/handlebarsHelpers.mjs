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

Handlebars.registerHelper('formatDate', function(date) {
  return moment(date).format('dddd MMM D')
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