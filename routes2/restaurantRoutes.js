const express = require('express');
const router = express.Router();
const restaurantsControllers = require('../controllers2/restaurantControllers');


router.route('/')

.post(restaurantsControllers.addNewRestaurant)
    .get(restaurantsControllers.getAllRestaurants);
router.route('/filter/:page&:perPage&:borough?')

.get(restaurantsControllers.getAllRestaurants);

router.route('/:id')
    .get(restaurantsControllers.getRestaurantById)
    .put(restaurantsControllers.updateRestaurantById)
    .delete(restaurantsControllers.deleteRestaurantById);

module.exports = router;