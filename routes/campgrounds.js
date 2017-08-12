var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var Campground = require('../models/campground');
var commentsRoute = require('./comments');

router.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});


router.use(methodOverride("_method"));
router.use('/:id/comments', commentsRoute);

//get method of campgrounds
router.get('/', function(req, res, next) {
    //Get all campgrounds from DB
    Campground.find({}, function (err, camps) {
        if(!err){
            res.render("campgrounds/campgrounds", { title: 'Campgrounds', camps: camps})
        } else {
            console.log("ERROR :" + err);
        }
    });
});

//POST method of campgrounds
router.post('/', isLoggedIn,function (req, res, next) {
    var name = req.body.campname;
    var img = req.body.campimg;
    var desc = req.body.desc;
    var authr = {id: req.user._id, username: req.user.username};
    var newCamp = {name: name, image:img, description:desc, author: authr};
    //Create new campground to save to DB
    Campground.create(newCamp, function (err, camp) {
        if(!err){
            console.log(newCamp);
            res.redirect('/campgrounds/');
        } else {
            console.log("ERROR :" + err);
        }
});

    //res.redirect('/campgrounds');
});

//method to get view of new campground
router.get('/new', isLoggedIn, function (req, res, next) {
    res.render("campgrounds/new", { title: 'New Campgrounds'});
});

//Edit campground view
router.get('/:id/edit', ownsCamp, function (req, res, next) {
    //owner authentication
    Campground.findById(req.params.id, function (err, camp) {
        res.render("campgrounds/editcamp", {title: 'Edit Post', camp: camp});
    });

});

//show specific campground
router.get('/:id', function (req, res, next) {

    //Find the necessary camp
    Campground.findById(req.params.id).populate("comments").exec( function (err, camp) {
        if(!err){
            res.render("campgrounds/showcamp", {title: "Show Camp", camp: camp});
        } else {
            console.log("ERROR :" + err);
        }
    });
});

//Edit camps route
router.put('/:id', ownsCamp, function (req, res, next) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campg, function (err, uptdCamp) {
        if(!err){
            res.redirect('/campgrounds/' + req.params.id);
        } else {
            console.log("ERROR :" + err);
        }
    });
});

//Delete Camps route
router.delete('/:id', ownsCamp, function (req, res, next) {
    Campground.findByIdAndRemove(req.params.id, function (err, uptdCamp) {
        if(!err){
            res.redirect('/campgrounds/');
        } else {
            console.log("ERROR :" + err);
        }
    });
});

//Owner authorizarion
function ownsCamp(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function (err, camp) {
            if(!err){
                if(camp.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
            } else {
                console.log("ERROR :" + err);
                res.redirect("back");
            }
        });
    } else {
        console.log("Not logged in");
        res.redirect("/users/login");
    }
}

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/users/login");
}

module.exports = router;
