var User = require('./../models/user');
module.exports = function(app) {
    app.get('/users', function(req, res) {
        User.find({}, function(err, users) {
            if(err) throw err;
            res.send(users);
        });
    });
}