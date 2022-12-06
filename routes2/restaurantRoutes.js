const express = require('express');
const { data } = require('jquery');
const router = express.Router();
const restaurantsControllers = require('../controllers2/restaurantControllers');

 
router.route('/addRestaurant')
    .get(restaurantsControllers.getForm)
  
router.route('/addedRestaurant')
    .post(restaurantsControllers.formAddingRestaurantById);

router.route('/')

.post(restaurantsControllers.addNewRestaurant)
    .get(restaurantsControllers.getAllRestaurants);
router.route('/:page&:perPage&:borough?')

.get(restaurantsControllers.getAllRestaurants);

router.route('/:id')
    .get(restaurantsControllers.getRestaurantById)
    .put(restaurantsControllers.updateRestaurantById)
    .delete(restaurantsControllers.deleteRestaurantById);
   

// router.route('/addRestaurant')
    // .get((req, res) => {
    //     console.log('Adding restaurant using form');
    //     res.render("insert", {
    //         title: "New Restaurant"
    //     });
    // })
    // .post((req, res) => {
    //     console.log('Inserting new restaurant data from form');
    //     const result = restaurantsControllers.addNewRestaurant;
    //     if (result.status === 201) {
    //         res.render("insertresult", {
    //             title: "New Restaurant Added",
    //             data: result.body
    //         });
    //     }
    // });

    

module.exports = router;