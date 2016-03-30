var BlogPost = require('./../models/posts');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

module.exports = function(app) {
    app.get('/posts', function(req, res) {
        BlogPost.find({}, function(err, users) {
            if(err) throw err;
            res.send(users);
        });
    });
    
    app.get('/posts/:slug', function(req, res) {
        BlogPost.find({slug:req.params.slug}, function(err, post) {
            if(err) throw err;
            res.render('post',{data:post[0]})
        });
    });
    
    
    
    app.get('/posts/new', ensureLoggedIn, function(req, res) {
        res.render('editor');
    });
    

    app.post('/posts/new', ensureLoggedIn, function(req, res) {
        var newForm = BlogPost({
            title: req.body.title,
            author: req.body.author,
            category: req.body.category,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            comments: req.body.comments,
            postData:req.body.postData
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