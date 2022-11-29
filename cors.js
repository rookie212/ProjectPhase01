var express  = require('express');

var cors = require ('cors');

var mongoose = require('mongoose');

var app      = express();

var database = require('./config/db');

var bodyParser = require('body-parser');         // pull information from HTML POST (express4)

var port     = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded

app.use(bodyParser.json());                                     // parse application/json

app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json



mongoose.connect(database.url);

var Restaurant = require('./models/restaurant');
//get all restaurant data from db
app.get('/api/restaurants/:page/:perPage/:borough?', function(req, res) {
    console.log('new api/restaurants with pages here');
    let page = req.params.page;
    let perPage = req.params.perPage;
    let borough = req.params.borough;

    if (borough) {
        Restaurant.find({
            "borough": { $eq: borough }
        }, function(err, restaurant) {
            if (err)
                res.send(err);
            let end = page * perPage;
            let result = [];
            for (let i = perPage; i > 0; i--) {
                console.log("i=" + i);
                console.log("getting restaurant[" + end + "] with borough=" + borough);
                result.push(restaurant[end]);
                end -= 1;
            }
            res.json(result);
        });
    } else { // use mongoose to get all todos in the database
        Restaurant.find(function(err, restaurants) {
            // if there is an error retrieving, send the error otherwise send data
            if (err)
                res.send(err)
            let end = page * perPage;
            let result = [];
            for (let i = perPage; i > 0; i--) {
                console.log("i=" + i);
                console.log("getting restaurant[" + end + "]");
                result.push(restaurants[end]);
                end -= 1;
            }
            res.json(result);

        });
    }


 
//get all restaurant data from db
app.get('/api/restaurants', function(req, res) {

	// use mongoose to get all todos in the database
	Restaurant.find(function(err, restaurants) {
		// if there is an error retrieving, send the error otherwise send data
		if (err)
			res.send(err)
			console.log('13');

		res.json(restaurants); // return all restaurants in JSON format
		let a = req.body;
console.log('14:User sees that'+a);
console.log(a);

//

	});
});
//get all restaurant data from db
app.get('/api/restaurants/new', function(req, res) {

	// use mongoose to get all todos in the database
	Restaurant.find(function(err, restaurants) {
		// if there is an error retrieving, send the error otherwise send data
		if (err)
			res.send(err)
			console.log('13');

		res.send(`  <form method="POST" action="/api/allData/insert">
        <label for="Book title: "</label>
        <input type="text" name="title" placeholder="Enter Title" />
        <label for="Book ti: "</label>
        <input type="text" name="isbn" placeholder="Enter ISBN" />
        <label for="Book ti: "</label>
        <input type="text" name="authors" placeholder="Enter author" />
        <label for="Book ti: "</label>
        <input type="text" name="categories" placeholder="Enter category" />
        <input type="submit" />
      </form>`); // return all restaurants in JSON format
		let a = req.body;
console.log('14:User sees that'+a);
console.log(a);

//

	});
});
app.post('/api/restaurants/new', function(req, res) {

    
	// use mongoose to get all todos in the database
		// if there is an error retrieving, send the error otherwise send data
		if (err)
			res.send(err)
			console.log('13');
            
            console.log('14:User sees that'+a);
            
            console.log(b);
		res.send(`  <form method="POST" action="/api/allData/insert">
        <label for="Book title: "</label>
        <input type="text" name="title" placeholder="Enter Title" />
        <label for="Book ti: "</label>
        <input type="text" name="isbn" placeholder="Enter ISBN" />
        <label for="Book ti: "</label>
        <input type="text" name="authors" placeholder="Enter author" />
        <label for="Book ti: "</label>
        <input type="text" name="categories" placeholder="Enter category" />
        <input type="submit" />
      </form>`); // return all restaurants in JSON format
		let a = req.body;
console.log('14:User sees that'+a);
console.log(a);

//

	});
});




// get a restaurant with ID of 1
app.get('/api/restaurants/:_id', function(req, res) {

	let id = req.params._id;
	Restaurant.findById(id, function(err, restaurant) {
		if (err)
			res.send(err)
			console.log('17: JSON sent it to the browser');

		res.json(restaurant);
	});
});
// create restaurant and send back all restaurants after creation
app.post('/api/restaurants', function(req, res) {
    // create mongose method to create a new record into collection
    console.log(req.body);
	let b = req.body;
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
	});
});


// create restaurant and send back all restaurants after creation
app.put('/api/restaurants/:_id', function(req, res) {

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

	console.log(req.params._id);

	let id = req.params._id;
	Restaurant.remove({
		
		_id : id
	}, function(err) {
		if (err)
			res.send(err);
		else
			res.send('Successfully! Restaurant has been Deleted.');	
	

		});
});

app.listen(port);

console.log("App listening on port : " + port);

 
