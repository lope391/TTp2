var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Home' });
});

module.exports = router;
