var express  = require('express');
console.log('1:Express imported');

var mongoose = require('mongoose');
console.log('2:Mongoose imported ');

var app      = express();
console.log('3:app is expressed');

var database = require('./config/db');
console.log('4:Config directory Database file is reached');

var bodyParser = require('body-parser');         // pull information from HTML POST (express4)
console.log('5:Body-parser imported');

var port     = process.env.PORT || 8000;
console.log('6:Port id defined');

app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
// console.log('7:Body-parser accepts only urlencoded');

app.use(bodyParser.json());                                     // parse application/json
// console.log('8:Body-parser.urlencoded accepts only JSON');

app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
// console.log('9:Body-parser type is application/vnd.api+json');



mongoose.connect(database.url);
console.log('10:Mongoose is connected');

var Restaurant = require('./models/restaurant');
console.log('11:Models directory restaurant file is reached');

 
//get all restaurant data from db
app.get('/api/restaurants', function(req, res) {
	console.log('12:get ---/api/restaurants here');

	// use mongoose to get all todos in the database
	Restaurant.find(function(err, restaurants) {
		// if there is an error retrieving, send the error otherwise send data
		if (err)
			res.send(err)
			console.log('13');

		res.json(restaurants); // return all restaurants in JSON format
//bu iki satir datanin get ile alindigini kanitliyor! 
//yani sorun post da olmali
		let a = req.body;
console.log('14:User sees that'+a);
console.log(a);

//

	});
	console.log('15:This one is in the same place with 12 but there are some functions');
});

// get a restaurant with ID of 1
app.get('/api/restaurants/:_id', function(req, res) {
	console.log('16:User made a search with _id');

	let id = req.params._id;
	Restaurant.findById(id, function(err, restaurant) {
		if (err)
			res.send(err)
			console.log('17: JSON sent it to the browser');

		res.json(restaurant);
	});
console.log('18:This one is in the same place with 16 but there are some functions');
});
// create restaurant and send back all restaurants after creation
app.post('/api/restaurants', function(req, res) {
	console.log('19:Here post process started');
    // create mongose method to create a new record into collection
    console.log(req.body);
	let b = req.body;
	console.log('20'+b+' Is it object or Json WHY it is object');
	Restaurant.create({
		name : req.body.name,
		cuisine : req.body.cuisine,
		borough : req.body.borough,
        restaurant_id : req.body.id

	}, function(err, restaurant) {
		if (err)
			res.send(err);
			console.log('21: Just right now new entry created');
		// get and return all the restaurants after newly created restaurant record
		Restaurant.find(function(err, restaurant) {
			if (err)
				res.send(err)
				console.log('22: Right now find restaurants in mongoose');
			res.json(restaurant);
		});
		console.log('23:This one is in the same place with 21 but there are some functions');
	});
	console.log('24:This one is in the same place with 19 but there are some functions'); 
});


// create restaurant and send back all restaurants after creation
app.put('/api/restaurants/:_id', function(req, res) {
	console.log('25:Put process began'); 

	// create mongose method to update an existing record into collection
    console.log(req.body);
	console.log('26:Updated/Data should be above this line'); 

	let id = req.params._id;
	var data = {
		name : req.body.name,
		cuisine : req.body.cuisine,
		borough : req.body.borough,
        restaurant_id : req.body.id
	}
	console.log('27: Data values matched with the keys of the database');

	// save the user
	Restaurant.findByIdAndUpdate(id, data, function(err, restaurant) {
	if (err) throw err;
	console.log('28: Data values are updated');

	res.send('Successfully! restaurant updated - '+restaurant.name);
	console.log('29: Succesful message sent the browser');

	});
console.log('30:This one is in the same place with 25 but there are some functions'); 

});

// delete a restaurant by id
app.delete('/api/restaurants/:_id', function(req, res) {
	console.log('31:We are in the delete function'); 

	console.log(req.params._id);

	let id = req.params._id;
	Restaurant.remove({
		
		_id : id
	}, function(err) {
		if (err)
			res.send(err);
		else
			res.send('Successfully! Restaurant has been Deleted.');	
	
			console.log('32:Delete function completed check the browser');

		});
console.log('33:This one is in the same place with 31 but there are some functions'); 
});

app.listen(port);
console.log('34: We are ready. Are you too?'); 

console.log("App listening on port : " + port);

 
