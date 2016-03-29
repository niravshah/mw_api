var express = require('express');
var router = express.Router();
var BlogPost = require('./../models/blog');

router.get('/', function(req, res, next) {
    BlogPost.find({}, function(err, users) {
        if(err) throw err;
        res.render('index', {
            blogs: users
        });
    });
});

router.get('/invite', function(req, res, next) {
    res.render('invite');
});
module.exports = router;