const express = require('express');
const { data } = require('jquery');
const router = express.Router();
const userControllers = require('../controllers2/userControllers');

 
router.route('/login')
    .get(userControllers.welcomePage)
    .post(userControllers.tryingLogin);

router.route('/signin')

    .get(userControllers.registerPage)
    .post(userControllers.addNewUser);
    
router.route('/forgot')
    .get(userControllers.forgotMyPassword);
   

module.exports = router;