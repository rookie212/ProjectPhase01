var express = require('express');
var mongoose = require('mongoose');
var app = express();
// const router = require('./routes/apiRestaurantsRoutes');
// var database = require('./config/dataset');
var db = require('./config2/db2');


var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ 'extended': 'false' })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

//mongoose.connect(database.url);

var Restaurant = require('./models2/restaurant');
var User = require('./models2/user');

var path = require("path");

const exphbs = require("express-handlebars");

app.use(express.static(path.join(__dirname, "public2")));
app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));
app.set('view engine', 'hbs');


db.initialize();

//routes
app.use('/new', require('./routes2/userRoutes'));
app.use('/api/restaurants', require('./routes2/restaurantRoutes'));

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(port, () => console.log(`Server running on port ${port}`));
});