/**
 * Created by anisur on 19/11/14.
 */

var http = require('http');
var express = require('express'),
  routes = require('./routes'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  path = require('path');
var session    = require('express-session');
var MongoStore = require('connect-mongo')(session);

var enableCORS = function(req, res, next) {
    console.log('Connection established....');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }

};

var sessTime = 1000 * 60 * 24 * 14;
var port = process.env.PORT || 8080;
var app = express();
app.use(enableCORS);
app.set('port', port);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

app.use(session({
    secret: 'newsecret',
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: sessTime, expires: new Date(Date.now() + sessTime) },
    store: new MongoStore({storage: 'mongodb', db: 'netz'})
  }));

app.get('/', function (req, res){
    res.sendFile(path.resolve('views/app/index.html'));
});

http.createServer(app).listen(port, function(){
  console.log('Server listening on port ' + port);
});
