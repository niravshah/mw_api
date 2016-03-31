var User = require('./../models/user');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
module.exports = function(app,passport) {
    app.get('/login', function(req, res) {
        res.render('login');
    });
    app.post('/login', passport.authenticate('local', {
        failureRedirect: '/login'
    }), function(req, res) {
        console.log("Success Redirect Called");
        res.redirect('/');
    });
    app.get('/users', ensureLoggedIn, function(req, res) {
        User.find({}, function(err, users) {
            if(err) throw err;
            res.send(users);
        });
    });
    app.post('/users/new', function(req, res) {
        var newForm = User({
            username: req.body.username,
            password: req.body.password
        });
        newForm.save(function(err) {
            if(err) throw err;
            console.log('New User Saved');
            res.json({
                response: 'success'
            });
        });
    });
}