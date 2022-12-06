
// load mongoose since we need it to define a model
var mongoose = require('mongoose');
console.log('User-1: Mongooseland');
const bcrypt = require('bcryptjs')

var Schema = mongoose.Schema;
console.log('User-2: Schema is called/calling for mongoose');

userSchema = new Schema({
    username : String,
    email : {type: String, required: true},
    password: {type: String, required: true}, 
	age : Number
});

userSchema.pre("save",function (next){
    const users = this
    if (this.isModified("password") || this.isNew) {
        bcrypt.genSalt(10, function (saltError, salt){
            if(saltError) {
                return next (saltError)
            }else {
                bcrypt.hash(users.password, salt, function(hashError, hash){
                    if(hashError){
                        return next(hashError)
                    }
                    users.password = hash
                    next()
                })
            }
            })
        }else {
            return next()
        }
    })


console.log('User-3: Schema is created');

module.exports = mongoose.model('User', userSchema);
console.log('User-4: Schema model is exported');
