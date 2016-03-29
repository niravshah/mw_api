// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var contactFormSchema = new Schema({
  userName: String,
  email: String,
  orgName: String,
  created_at: Date,
  updated_at: Date
});


// on every save, add the date
contactFormSchema.pre('save', function(next) {  
  var currentDate = new Date();    
  this.updated_at = currentDate;  
  if (!this.created_at)
    this.created_at = currentDate;
  next();
});

// the schema is useless so far
// we need to create a model using it
var ContactForm = mongoose.model('ContactForm', contactFormSchema);

// make this available to our users in our Node applications
module.exports = ContactForm;