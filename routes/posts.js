var BlogPost = require('./../models/posts');
module.exports = function(app) {
    app.get('/posts', function(req, res) {
        BlogPost.find({}, function(err, users) {
            if(err) throw err;
            res.send(users);
        });
    });
    
    app.get('/posts/new', function(req, res) {
        var newForm = BlogPost({
            title: req.body.title,
            author: req.body.author,
            category: req.body.category,
            description: req.body.description,
            imageUrl:req.body.imageUrl,
            comments:req.body.comments
        });
        newForm.save(function(err) {
            if(err) throw err;
            console.log('New Blog Post Saved');
            res.json({
                response: 'success'
            });
        });
    });
}