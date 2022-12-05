const Restaurant = require('../models2/restaurant');

async function getAllRestaurants(req, res) {
    if (req.query.page) {
        let page = req.query.page;
        let perPage = req.query.perPage;
        let restaurants;
        console.log("page = " + page);
        console.log("per page = " + perPage);
        if (req.query.borough) {
            let borough = req.query.borough;
            console.log("Getting restaurants with borough :" + borough);
            restaurants = await Restaurant.find({ "borough": { $eq: borough } });
        } else {
            console.log("Getting restaurants without borough");
            restaurants = await Restaurant.find();
        }
        if (!restaurants) return res.status(204).json({ 'message': 'No resta found.' });
        else {
            let end = page * perPage;
            let result = [];
            for (let i = perPage; i > 0; i--) {
                result.push(restaurants[end]);
                end -= 1;
            }
            res.status(200).send(result);
        }

    } else {
        console.log("In getAllRestaurants");
        const restaurants = await Restaurant.find();
        if (!restaurants) return res.status(204).json({ 'message': 'No resta found.' });
        res.send(restaurants);
    }

}

async function addNewRestaurant(req, res) {
    if (!req.body.name) {
        return res.status(400).json({ 'message': 'restaurant name is required' });
    }
    try {
        console.log("adding data")
        const result = await Restaurant.create({
            // building: req.body.address.building,
            // coord: req.body.address.coord,
            // street: req.body.address.street,
            // zipcode: req.body.address.zipcode,
            // borough: req.body.borough,
            cuisine: req.body.cuisine,
            grades: req.body.grades,
            name: req.body.name,
            restaurant_id: req.body.restaurant_id
        });
        res.status(201).send(result);

    } catch (err) {
        console.error(err);
    }
}

const getRestaurantById = async function(req, res) {

    if (!req.params.id) {
        return res.status(400).json({ 'message': 'Restaurant Mongoose _Id required' });
    }

    const restaurants = await Restaurant.findById(req.params.id).exec();
    if (!restaurants) {
        return res.status(204).json({ "message": `No restaurant matches ID ${req.params.id}.` });
        console.log(a);

    }
    res.json(restaurants);
}


const updateRestaurantById = async function(req, res) {
    if (!req.params.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }
    var data = {

        name: req.body.name,
        restaurant_id: req.body.restaurant_id
    }
    const restaurants = await Restaurant.findByIdAndUpdate(req.params.id, data)
        .exec();
    if (!restaurants) {
        return res.status(204).json({ "message": `No restaurant matches ID ${req.params.id}.` });
    }
    const result = await restaurants.save();
    res.json('Successfully! restaurant updated - ' + restaurants.name);


}

const deleteRestaurantById = async function(req, res) {
    if (!req.params.id) return res.status(400).json({ 'message': 'restaurant ID required.' });

    const restaurant = await Restaurant.findByIdAndDelete(req.params.id).exec();
    if (!restaurant) {
        return res.status(204).json({ "message": `No restaurant matches ID ${req.body.id}.` });
    }
    res.send('Successfully! Restaurant has been Deleted.');
}

module.exports = {
    addNewRestaurant,
    getAllRestaurants,
    getRestaurantById,
    updateRestaurantById,
    deleteRestaurantById
};