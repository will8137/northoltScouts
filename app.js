//Dependencies
var http =  require('http');
var express = require('express');
var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Config
var db = require('./config/db.json');
var config = require('./config/config.json');

//DB connection
mongoose.connect(db.url)

//Load models
var models_dir = __dirname + '/app/models';
fs.readdirSync(models_dir).forEach(function (file) {
    if(file[0] === '.') return; 
    require(models_dir+'/'+ file);
});

//Global path
global.root = path.resolve(__dirname);

//Create app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/app/views'));
app.set('view engine', 'jade');
app.set('port', config.serverPort || 8153);
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    /*res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');*/

    // Pass to next layer of middleware
    next();
});
//app.use(compression());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var router = express.Router();

app.get("/", function(req, res){ 
      res.render("index");
});

//Routes
var index = require('./lib/routes/index');
var users = require('./lib/routes/users');

app.use(index);
app.use(users);

app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
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
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//Create server
var server = http.createServer(app);

//Tell server to listen
server.listen(app.get('port'), function(){
    console.log('Express server started.');
    console.log("Port: " + app.get('port'));
});

module.exports = app;
