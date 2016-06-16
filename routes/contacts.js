var ContactForm = require('./../models/contact');

var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://5181531eca7071901ce351edc1afa862%40in-v3.mailjet.com:42b3f9777319e18107bc643e6b241e3d@in-v3.mailjet.com');

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'newcontact@movewithin.org',
    to: 'nirav@movewithin.org',
    subject: 'New Contact Registered',
    text: 'Hello world 🐴'
};


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

    app.post('/excellence/register', function(req, res) {
        console.log(req.body);

        mailOptions.subject = 'New :: Team Excellence Registration :: ' +  req.body.email;
        mailOptions.text = 'Name: ' + req.body.name + '\nEmail: ' +  req.body.email + '\nPhone:' + req.body.phone + '\nMessage: ' + req.body.message;

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });

        res.status(200).send('Registered Successfully. Thank You.');
        
    });

    app.post('/excellence/contact', function(req, res) {

        console.log(req.body);

        mailOptions.subject = 'New :: Team Excellence Contact Request :: ' +  req.body.email
        mailOptions.text = 'Email: ' +  req.body.email + '\nPhone:' + req.body.phone + '\nMessage: ' + req.body.message;

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });

        res.status(200).send('Contact Information Recieved. Thank You.');

    });

}