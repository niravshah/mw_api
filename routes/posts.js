var BlogPost = require('./../models/posts');
var multer  = require('multer');
var upload = multer();

module.exports = function(app) {
    app.get('/posts', function(req, res) {
        BlogPost.find({}, function(err, users) {
            if(err) throw err;
            res.send(users);
        });
    });
    app.get('/blog-editor', function(req, res) {
        res.render('blog-editor');
    });
    
    app.post('/blog/editor/save', upload.array(), function(req, res) {
        console.log('BLOG SAVE BODY', req.body);
        res.send('ok');
    });

    app.post('/posts/new', function(req, res) {
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