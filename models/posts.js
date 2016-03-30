// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// create a schema
var blogPostSchema = new Schema({
    title: String,
    author: String,
    category: String,
    description: String,
    imageUrl: String,
    comments: String,
    postData: String,
    created_at: Date,
    updated_at: Date,
    slug:String,
    day: String,
    month: String,
    year: String
});
// on every save, add the date
blogPostSchema.pre('save', function(next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if(!this.created_at) this.created_at = currentDate;
    
    this.slug = this.title.replace(/\s+/g, '-').toLowerCase();
   
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    this.month = month[currentDate.getMonth()];
    this.day = "" + currentDate.getDate();
    this.year = "" + currentDate.getFullYear();
    next();
});
// the schema is useless so far
// we need to create a model using it
var BlogPost = mongoose.model('BlogPost', blogPostSchema);
// make this available to our users in our Node applications
module.exports = BlogPost;