var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cons = require('consolidate');
var mongo_express = require('mongo-express/lib/middleware')
var mongo_express_config = require('./config')
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mw_api');
var app = express();
var passport = require('passport');
var BasicStrategy = require('passport-local').Strategy;
var User = require('./models/user');
passport.use(new BasicStrategy(function(userid, password, done) {
    console.log("!!!BasicStrategy Called", userid, password);
    User.findOne({
        username: userid
    }, function(err, user) {
        if(err) {
            return done(err);
        }
        if(!user) {
            return done(null, false);
        } else {
            return user.verifyPassword(password, function(err, isMatch) {
                console.log("verifyPassword", isMatch, done);
                if(isMatch) done(null, user)
                else done(null, null)
            });
        }
    });
}));
passport.serializeUser(function(user, cb) {
    console.log("serializeUser", user);
    cb(null, user.username);
});
passport.deserializeUser(function(id, cb) {
    User.findOne({
        username: id
    }, function(err, user) {
        if(err) {
            return cb(err);
        }
        cb(null, user);
    });
});
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
var routes = require('./routes/index');
app.use('/mongo_express', mongo_express(mongo_express_config))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', cons.swig);
app.set('view engine', 'html');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
require('./routes/contacts')(app);
require('./routes/users')(app);
require('./routes/posts')(app);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if(app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log("ERROR", err);
    res.render('error', {
        message: err.message,
        status: err.status || 500,
        error: {}
    });
});
app.listen(3000, function() {
    console.log('Started Node Server');
});
//module.exports = app;