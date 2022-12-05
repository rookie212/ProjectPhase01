
// load mongoose since we need it to define a model
var mongoose = require('mongoose');
console.log('Restaurant-1: Mongooseland');

var Schema = mongoose.Schema;
console.log('Restaurant-2: Schema is called/calling for mongoose');

restaurant12Schema = new Schema({
    address : Object({
        building : String,
        coord : Array,
        street: String,
        zipcode : String
    }),
    borough : String,
    cuisine : String,
    grades : [{
        date : Date,
        grade : String,
        score: Number
    }], 
    name : String,
	restaurant_id : String
});
console.log('Restraurant-3: Schema is created');

module.exports = mongoose.model('Restaurant', restaurant12Schema);
console.log('Restaurant-4: Schema model is exported');
