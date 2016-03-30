// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
// create a schema
var userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
userSchema.pre('save', function(next) {
    var user = this;
    if(!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if(err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.verifyPassword = function(candidatePassword,cb) {
    
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
            console.log("brcypt return false");
            return cb(null,false);            
        }
        else{
            console.log("brcypt return", isMatch);
            return cb(null,isMatch);;
        }
        
    });
};

var User = mongoose.model('User', userSchema);
module.exports = User;