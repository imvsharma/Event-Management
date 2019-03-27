const {user, event, events} = require('./helper');

const eventTransformation = (event) => {
    return {
        ...event._doc,
        date: dateToString(event._doc.date),
        creator: user.bind(this, event.creator)
    }
}

const bookingTransformation = booking => {
    return {
        ...booking._doc,
        user: user.bind(this, booking._doc.user),
        event: event.bind(this, booking._doc.event),
        createdAt: dateToString(booking._doc.createdAt),
        updatedAt: dateToString(booking._doc.updatedAt)
    } 
}

const userTransformation = user => {
    return {
        ...user._doc,
        createdEvents: events.bind(this, user.createdEvents)
    }
}

exports.eventTransformation = eventTransformation;
exports.bookingTransformation = bookingTransformation;
exports.userTransformation = userTransformation;