const User = require('../models/user');
const Event = require('../models/event');

const dateToString = date => {
    return date.toISOString();
}

const event = async eventId => {
    try {
        const event = await Event.findById(eventId);
        return eventTransformation(event);
    }catch(err) {
        throw err
    }
}

const events = async eventIds => {
    try {
        const events = await Event.find({ _id: { $in: eventIds } });
        return events.map(event => {
            return eventTransformation(event);
        });
    }
    catch (err) {
        throw err;
    }
}

const user = async userId => {
    try {
        const user = await User.findById(userId);
        return {
            ...user._doc,
            createdEvents: events.bind(this, user.createdEvents)
        };
    }
    catch (err) {
        throw err;
    }
}

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

exports.user = user;
exports.event = event;
exports.events = events;
exports.eventTransformation = eventTransformation;
exports.bookingTransformation = bookingTransformation