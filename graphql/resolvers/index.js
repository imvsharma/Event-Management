const authResolver = require('./auth.resolver');
const eventResolver = require('./event.resolver');
const bookingResolver = require('./booking.resolver');

module.exports = {
    ...authResolver,
    ...eventResolver,
    ...bookingResolver
}
