var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var commentsRoute = require('./comments');
var multer = require('multer');

var Campground = require('../models/campground');
var Image = require('../models/image');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '/mnt/glusterfs/public/uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({
    storage: storage
});

router.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});


router.use(methodOverride("_method"));
router.use('/:id/comments', commentsRoute);

//get method of campgrounds
router.get('/', function(req, res, next) {
    //Get all campgrounds from DB
    Campground.find({}).populate("image").exec( function (err,camps) {
        if(!err){
            console.log(camps);
            res.render("campgrounds/campgrounds", { title: 'Campgrounds', camps: camps})
        } else {
            console.log("ERROR :" + err);
        }
    });
});

//POST method of campgrounds
router.post('/', isLoggedIn, upload.any(),function (req, res, next) {
    var name = req.body.campname;
    var imgfile = {
        path: req.files[0].path,
        originalname: req.files[0].originalname
    };
    console.log(imgfile);
    var desc = req.body.desc;
    var authr = {id: req.user._id, username: req.user.username};

    //Create new campground to save to DB
    Image.create(imgfile, function (err, newimg) {
        if(!err){
            console.log("IMG SAVED CORRECTLY");
            console.log(newimg);
            var newCamp = {name: name, image:newimg, description:desc, author: authr};
            Campground.create(newCamp, function (err2, camp) {
                if(!err2){
                    console.log("CAMP SAVED CORRECTLY!");
                    console.log(camp);
                    res.redirect('/campgrounds');
                } else {
                    console.log("ERROR :" + err);
                    res.redirect('back');
                }
            });
        } else {
            console.log("ERROR :" + err);
            res.redirect('back');
        }
    });
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
    Campground.findById(req.params.id).populate("image").populate("comments").exec( function (err, camp) {
        if(!err){
            console.log(camp);
            res.render("campgrounds/showcamp", {title: "Show Camp", camp: camp});
        } else {
            console.log("ERROR :" + err);
        }
    });
});

//Edit camps route
router.put('/:id', ownsCamp, upload.any(), function (req, res, next) {

    var newCamp = req.body.campg;

    if(req.files[0]) {

        var imgfile = {
            path: req.files[0].path,
            originalname: req.files[0].originalname
        };
        console.log("IMGFILE:");
        console.log(imgfile);


        Image.create(imgfile, function (err, newimg) {
            if(!err){
                console.log("IMG CREATED CORRECTLY:");
                console.log(newimg);
                newCamp['image'] = newimg._id;
                console.log("UPDATED CAMP INFO");
                console.log(newCamp);

                Campground.findByIdAndUpdate(req.params.id, newCamp, function (err, uptdCamp) {
                    if(!err){
                        console.log("CAMP UPDATED CORRETLY");
                        console.log(uptdCamp);
                        res.redirect('/campgrounds/' + req.params.id);
                    } else {
                        console.log("ERROR :" + err);
                    }
                });

            } else {
                console.log("ERROR :" + err);
                res.redirect('back');
            }
        });

    } else {

        Campground.findByIdAndUpdate(req.params.id, newCamp, function (err, uptdCamp) {
            if(!err){
                console.log("CAMP UPDATED CORRETLY");
                console.log(uptdCamp);
                res.redirect('/campgrounds/' + req.params.id);
            } else {
                console.log("ERROR :" + err);
            }
        });
    }

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
