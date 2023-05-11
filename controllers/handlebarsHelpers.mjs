import Handlebars from 'handlebars'
import moment from 'moment'

Handlebars.registerHelper('ifeq', function (a, b, opts) {
    if (a == b) {
        return opts.fn(this)
    } else {
        return opts.inverse(this)
    }
})

Handlebars.registerHelper('formatDate', function(date) {
  return moment(date).format('dddd MMM D')
})

export { Handlebars }