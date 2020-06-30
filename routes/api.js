const express = require('express');
const router = express.Router();
const Event = require('../models/event-model');

// Routes

// GET all trips
router.get('/', (req, res) => {
    Event.find({ })
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);

        })
        .catch((error) => {
            console.log('Data: ', data);
        })
});

// GET trip by id
router.route('/:id').get((req, res) => {
    Event.findById(req.params.id)
        .then(event => res.json(event))
        .catch(err => res.status(400).json('Error: ' + err));
});

// POST new trip
router.post('/create', (req, res) => {
    const data = req.body;
    const newEvent = new Event(data);

    newEvent.save((error) => {
        if (error) {
            req.statusCode(500).json({
                msg: 'Sorry, internal server errors'
            });
            return;
        }
        res.json({
            msg: 'We received your data!!!'
        });
    })
});

// Post new response to specific trip by id
router.route('/update/:id').post((req, res) => {
    Event.findById(req.params.id)
        .then(event => {
            event._id = req.body._id;
            event.eventName = req.body.eventName;
            event.start = req.body.start;
            event.end = req.body.end;
            event.results.push(req.body.participantResponse);

            event.save()
                .then(() => res.json('Response saved!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;