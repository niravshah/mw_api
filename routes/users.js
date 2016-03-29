var express = require('express');
var router = express.Router();
var User = require('./../models/user');

/* GET users listing. */
router.get('/users', function(req, res, next) {
    
    
    User.find({}, function(err, users) {
        if(err) throw err;
        // object of all the users
        res.send(users);
        
    });  
    
    
});

module.exports = router;
