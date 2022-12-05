const Restaurant = require('../models2/restaurant');

async function getAllRestaurants(req, res) {
    
    const restaurants = await Restaurant.find();
    if (!restaurants) return res.status(204).json({ 'message': 'No resta found.' });
    res.send(restaurants);
} 

async function addNewRestaurant(req, res) {
    if (!req.body.name) {
        return res.status(400).json({ 'message': 'restaurant name is required' });

    }
    try {
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
// const getAllRestaurants = async function (req, res){

//     let page = req.params.page;
//     let perPage = req.params.perPage;
//     let borough = req.params.borough;

//     if (borough) {
//         const restaurants = await restaurant.find({"borough": {$eq: borough}
//     }, function(err, restaurant){
//         if (err) {
//             res.send(err);
//         }
//         let end = page * perPage;
//         let result = [];
//         for (let i = perPage; i > 0; i--) {
//             result.push(restaurant[end]);
//             end -= 1;
//         }
//         res.json(result);
//     });
//     }else { // use mongoose to get all todos in the database
//         restaurant.find(function(err, restaurants) {
//             // if there is an error retrieving, send the error otherwise send data
//             if (err)
//                 res.send(err)
//             let end = page * perPage;
//             let result = [];
//             for (let i = perPage; i > 0; i--) {
//                 console.log("i=" + i);
//                 console.log("getting restaurant[" + end + "]");
//                 result.push(restaurants[end]);
//                 end -= 1;
//             }
//             res.json(result);

//         });
//     }
// }

const getRestaurantById = async function (req, res) {

    if (!req?.params?.id) {
        return res.status(400).json({'message': 'Restaurant Mongoose _Id required'});
    }

    const restaurants = await Restaurant.findById(req.params.id).exec();
    if (!restaurants) {
        return res.status(204).json({ "message": `No restaurant matches ID ${req.params.id}.` });
        console.log(a);

    }
    res.json(restaurants);
}


const updateRestaurantById = async function (req,res){
    if (!req?.params?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }
    var data = {
       
        name: req.body.name,
        restaurant_id: req.body.restaurant_id
    }
    const restaurants = await Restaurant.findByIdAndUpdate(req.params.id, data)
    .exec();
    if(!restaurants) {
        return res.status(204).json({ "message": `No restaurant matches ID ${req.params.id}.` });
    }
    const result = await restaurants.save();
    res.json('Successfully! restaurant updated - ' + restaurants.name);


}

const deleteRestaurantById = async function(req, res){
    if (!req?.body?.id) return res.status(400).json({ 'message': 'restaurant ID required.' });

    const restaurant = await Restaurant.findById({_id : req.body.id}).exec();
    if (!restaurant) {
        return res.status(204).json({ "message": `No restaurant matches ID ${req.body.id}.` });
    }
    const result = await Restaurant.remove({ _id: req.body.id });
    res.send('Successfully! Restaurant has been Deleted.');
}
 
module.exports = {
    addNewRestaurant, 
    getAllRestaurants,
    getRestaurantById, 
    updateRestaurantById,
    deleteRestaurantById
};
