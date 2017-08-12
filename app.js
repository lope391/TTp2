//Required dependencies
var express           = require('express'),
    path              = require('path'),
    favicon           = require('serve-favicon'),
    logger            = require('morgan'),
    cookieParser      = require('cookie-parser'),
    bodyParser        = require('body-parser'),
    mongoose          = require('mongoose'),
    passport          = require('passport'),
    LocalStrategy     = require('passport-local'),
    User              = require('./models/user'),
    seedDB            = require('./seeds');

//import routes
var index = require('./routes/index'),
    users = require('./routes/users'),
    campgrounds = require('./routes/campgrounds'),
    search = require('./routes/search');

var app = express();


//PASSPORT configuration
app.use(require("express-session")({
    secret: "the secretary of secrecy swallowing serendipity sizzling slowly sanctious salms",
    resave : false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//connect to mongoDB localhost
var url = process.env.DATABASEURL || 'mongodb://localhost/topicos_p1';
mongoose.connect(url, {useMongoClient: true});
//mongodb://lopec:eafit.2017@ds155727.mlab.com:55727/topicosp1 DB mLAB
//mongodb://localhost/topicos_p1 DB Local

//EJS view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//routes to use
app.use('/', index);
app.use('/users', users);
app.use('/campgrounds', campgrounds);
app.use('/search', search);

//Uncomment to seed App
//seedDB();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log("Server is Running on port: " + port);
});

module.exports = app;
