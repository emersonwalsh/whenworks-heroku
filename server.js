// Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

// todo is cors necessary
app.use(cors());

// Add headers
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'https://when-works.herokuapp.com/api');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // // Set to true if you need the website to include cookies in the requests sent
//     // // to the API (e.g. in case you use sessions)
//     // res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });



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