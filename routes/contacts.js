var ContactForm = require('./../models/contact');
module.exports = function(app) {
    app.get('/contacts', function(req, res) {
        ContactForm.find({}, function(err, users) {
            if(err) throw err;
            res.send(users);
        });
    });
    app.post('/contacts/new', function(req, res) {
        var newForm = ContactForm({
            userName: req.body.contactName,
            email: req.body.contactEmail,
            orgName: req.body.orgName,
            comments: req.body.message
        });
        newForm.save(function(err) {
            if(err) throw err;
            console.log('New Contact Form Saved');
            res.json({response:'success'});    
        });
        
    });
}