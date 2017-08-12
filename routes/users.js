var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var User = require('../models/user');
var passport = require('passport');

router.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/', function (req, res, next) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function (err, usr) {
        if(!err){
            passport.authenticate("local")(req, res , function () {
                res.redirect('/campgrounds');
            });
        } else {
            console.log(err);
            res.render('users/new', {title: "Sign Up"});
        }
    });
});

router.get('/new', function (req, res, next) {
   res.render("users/new", {title: "Sign Up"});
});

router.get('/login', function (req, res, next) {
    res.render("users/login", {title: "Login"});
});

router.post('/login', passport.authenticate("local",
    {
      successRedirect: "/campgrounds",
      failureRedirect: "/users/login"
    }),function (req, res) {
});

router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/campgrounds');
});





module.exports = router;
