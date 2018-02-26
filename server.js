var path = require('path'),
express = require('express'),
app = express(),
webpackDevHelper = require('./index.dev.js')
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var session = require('express-session');
var responseGenerator = require('./libs/responseGenerator');
var port        = process.env.PORT || 3000;
var path = require ('path');
var cors = require('cors');
// fs module, by default module for file management in nodejs
var fs = require('fs');


if (process.env.NODE_ENV !== 'production') {
    console.log('DEVOLOPMENT ENVIRONMENT: Turning on WebPack Middleware...')
    webpackDevHelper.useWebpackMiddleware(app)
} else {
    console.log('PRODUCTION ENVIRONMENT')
    app.use('/js', express.static(__dirname + '/dist/js'))
}

// Setting up express to serve static files
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, 'node_modules')))

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// log to console
app.use(morgan('dev'));

//CORS
app.use(cors({
    origin: '*',
    withCredentials: false,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin' ]
}));

app.use(session({
  name :'myCustomCookie',
  secret: 'myAppSecret', // encryption key
  resave: true,
  httpOnly : true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

//Application level middleware
app.use(function(req,res,next){
  var logs = {'Time of Request': Date.now(),
        'Requested Url'  : req.originalUrl,
        'Base Url'       : req.baseUrl,
        'Ip address'     : req.ip,
        'Method'         :req.method
  };
  console.log(logs);
  next();
});


mongoose.connect("mongodb://abhijeet:abhijeet123@ds249428.mlab.com:49428/swiftcart");

var db = mongoose.connection;
db.on('error', console.error.bind(console, '#MongoDB - connection error'));

//Open mongoose connection
mongoose.connection.once('open', function() {

  console.log("Database Connected");

});

// include all our model files
fs.readdirSync('./app/models').forEach(function(file){
  // check if the file is js or not
  if(file.indexOf('.js'))
    // if it is js then include the file from that folder into our express app using require
    require('./app/models/'+file);

});// end for each


// include controllers
fs.readdirSync('./app/controllers').forEach(function(file){
  if(file.indexOf('.js')){
    // include a file as a route variable
    var route = require('./app/controllers/'+file);
    //call controller function of each file and pass your app instance to it
    route.controllerFunction(app);

  }

});//end for each

// bundle our routes
var apiRoutes = express.Router();

// we always want to serve the index.html
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'assets/index.html'))
})

//Error handler
app.use(function(err,req,res,next){

    if(res.status==404){
        var myResponse = responseGenerator.generate(true,"Page not Found",404,null);
        res.sendFile(path.join(__dirname, '/public/views/error404.html'));
    }
});


// Start the server
app.listen(port,function(){
    console.log("Server running on port "+port);
});
