var BlogPost = require('./../models/posts');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var fs = require('fs');
module.exports = function(app) {
    app.get('/posts', function(req, res) {
        BlogPost.find({}, function(err, users) {
            if(err) throw err;
            res.send(users);
        });
    });
    app.get('/posts/new', ensureLoggedIn, function(req, res) {
        res.render('editor');
    });
    app.get('/images', function(req, res) {
        fs.readdir('public/images/mw_blog', function(err, items) {
            var imgs = [];
            var base = '/images/mw_blog/'
            for(var i = 0; i < items.length; i++) {
                var val = {};
                val['title'] = items[i];
                val['value'] = base + items[i];
                imgs.push(val);
            }
            res.send(imgs);
        });
    });
    app.get('/posts/:slug', function(req, res) {
        BlogPost.find({
            slug: req.params.slug
        }, function(err, post) {
            if(err) throw err;
            res.render('post', {
                data: post[0]
            })
        });
    });
    app.post('/posts/new', ensureLoggedIn, function(req, res) {
        var newForm = BlogPost({
            title: req.body.title,
            author: req.body.author,
            category: req.body.category,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            comments: req.body.comments,
            postData: req.body.postData
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