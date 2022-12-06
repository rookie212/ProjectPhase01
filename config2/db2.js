var mongoose = require('mongoose');
require('dotenv').config();
// var database = require('./db');
var Restaurant = require('../models2/restaurant');
var User = require('../models2/user');

async function initialize() {

    await mongoose.connect(process.env.URL);
    mongoose.connection.on('connected', function() {
        console.log('Mongoose default connection open to ' + process.env.URL);
    });
}

module.exports = { initialize}; 
