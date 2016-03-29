var express = require('express');
var router = express.Router();
var ContactForm = require('./../models/contact');

router.get('/', function(req, res, next) {      
    ContactForm.find({}, function(err, users) {
        if(err) throw err;
        res.send(users);        
    });         
});

router.post('/', function(req, res, next) {          
    var newForm = User({
        userName: req.body.userName,
        email: req.body.email,
        orgName: req.body.orgName
    });        
    newForm.save(function(err) {
        if (err) throw err;
        console.log('User created!');
    });                
});


module.exports = router;
