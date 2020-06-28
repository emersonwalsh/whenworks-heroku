const mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;
const EventSchema = new Schema({
    _id: String,
    eventName: String,
    start: String,
    end: String,
    results: [ {} ]
});

// Model
const Event = mongoose.model('Event', EventSchema);

module.exports = Event;