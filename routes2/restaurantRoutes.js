const express = require('express');
const router = express.Router();
const restaurantsControllers = require('../controllers2/restaurantControllers');


router.route('/')

.post(restaurantsControllers.addNewRestaurant)
    .get(restaurantsControllers.getAllRestaurants);
router.route('/:page&:perPage&:borough?')

.get(restaurantsControllers.getAllRestaurants);

router.route('/:id')
    .get(restaurantsControllers.getRestaurantById)
    .put(restaurantsControllers.updateRestaurantById)
    .delete(restaurantsControllers.deleteRestaurantById);
router.route('/addRestaurant')
    .get((req, res) => {
        console.log('Adding restaurant using form');
        res.render("insert", {
            title: "New Restaurant"
        });
    })
    .post((req, res) => {
        console.log('Inserting new restaurant data from form');
        restaurantsControllers.addNewRestaurant;
    });
module.exports = router;