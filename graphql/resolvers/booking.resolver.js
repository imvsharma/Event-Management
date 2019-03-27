const Event = require('../../models/event');
const Booking = require('../../models/booking');
const {bookingTransformation, eventTransformation} = require('../../helpers/helper');

module.exports = {
    bookEvent: async (args, req) => {
        if(!req.isAuth) {
            throw new Error('Not authenticated');
        }
        const fetchedEvent = await Event.findOne({_id: args.eventId});
        const booking = new Booking ({
            user: req.userId,
            event: fetchedEvent
        })
        const result = await booking.save();
        return bookingTransformation(result)
    },
    bookings: async (args, req) => {
        if(!req.isAuth) {
            throw new Error('Not authenticated');
        }
        try {
            const bookings = await Booking.find();
            return bookings.map(booking => {
                return bookingTransformation(booking)
            })
        }
        catch (err) {
            throw err
        }
    },
    cancelBooking: async (args, req) => {
        if(!req.isAuth) {
            throw new Error('Not authenticated');
        }

        try {
            const booking = await Booking.findById(args.bookingId).populate('event');
            const event = eventTransformation(booking.event);
            await Booking.deleteOne({_id: args.bookingId});
            return {...event}
        }catch(err) {
            throw err
        }
    }
}