var mongoose = require('mongoose');
require('dotenv').config();
var database = require('./db');
var Restaurant = require('../models/restaurant');

async function initialize() {

    await mongoose.connect(process.env.URL);
    mongoose.connection.on('connected', function() {
        console.log('Mongoose default connection open to ' + process.env.URL);
    });
    mongoose.connection.on('error', function(err) {
        console.log('Mongoose connection error: ' + err);
    });
}

async function updateRestaurant(data) {
    // save the user
    await Restaurant.findByIdAndUpdate(id, data, function(err, restaurant) {
        if (err) throw err;
        console.log(restaurant);
        console.log('28: Data values are updated');

        res.send('Successfully! restaurant updated - ' + restaurant.name);
        console.log('29: Succesful message sent the browser');

    });
}

module.exports = { initialize, updateRestaurant };