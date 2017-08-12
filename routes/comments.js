var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var methodOverride = require('method-override');
var Comment = require('../models/comment');

router.use(methodOverride("_method"));

router.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

/* GET users listing. */
router.get('/new', isLoggedIn, function(req, res, next) {

    Campground.findById(req.params.id, function (err, campf) {
        if(!err){
            res.render("comments/new", { title: 'New Comment', camp: campf });
        } else {
            console.log("ERROR ;" + err);
        }
    })
});

//Create New Comment
router.post('/', isLoggedIn, function (req, res, next) {

    //lookup camp ID
    Campground.findById(req.params.id, function (err, campf) {
        if(!err){
            Comment.create(req.body.comm, function (err, comment) {
                if(!err){
                    //Add usr id to usr object
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    //save entry
                    campf.comments.push(comment);
                    campf.save();
                    console.log(comment);
                    res.redirect('/campgrounds/' + campf._id);
                } else {
                    console.log("ERROR ;" + err);
                }
            });
        } else {
            console.log("ERROR ;" + err);
            res.redirect('/campgrounds');
        }
    });
    
});

//Edit Route
router.get('/:comment_id/edit', ownsComment, function (req, res, next) {

    Comment.findById(req.params.comment_id, function (err, comment) {
        if(!err){
            res.render("comments/edit", {title: "Edit Comment", camp_id: req.params.id, comment: comment});
        } else {
            console.log("ERROR ;" + err);
            res.redirect('/campgrounds');
        }

    });

});

//Edit Request
router.put('/:comment_id', ownsComment, function (req, res, next) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, newComment) {
        if(!err){
            res.redirect('/campgrounds/' + req.params.id);
        } else {
            console.log("ERROR ;" + err);
            res.redirect('/campgrounds');
        }
    });
});

router.delete('/:comment_id', ownsComment, function (req, res, next) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err, rmvComment) {
        if(!err){
            res.redirect('/campgrounds/' + req.params.id);
        } else {
            console.log("ERROR ;" + err);
            res.redirect('/campgrounds');
        }
    });
});

function ownsComment(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function (err, comment) {
            if(!err){
                if(comment.author.id.equals(req.user._id)){
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
