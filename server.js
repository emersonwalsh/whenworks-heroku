// Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

const routes = require('./routes/api');

const MONGODB_URI = 'mongodb+srv://emerson:test@cluster0-vxfjo.mongodb.net/trips?retryWrites=true&w=majority'

mongoose.connect(process.env.MONGODB_URI || MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // set to true if you need to go deep into a nested object

// HTTP request logger
app.use(morgan('tiny'));
app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('whenworks/build'));

    // app.get('/', function(req, res) {
    //     res.sendFile('whenworks/build/index.html');
    // });
}

app.listen(PORT, console.log(`Server is starting at ${PORT}`));