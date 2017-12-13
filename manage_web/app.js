// express
var express = require( 'express' );
var app = express();
var session = require('express-session');
app.use(session({
    secret: 'sessiontest', //与cookieParser中的一致
    resave: true,
    saveUninitialized: true
}));

// ejs
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );

// for image,css....
app.use(express.static('public'));

// post method need
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


// Routes with session
var routes = require( './routes' );
app.get( '/', routes.index ); 
app.post('/login',routes.login);
app.get('/logout',routes.index);
app.post( '/api/addVm', routes.setNetwork );  
app.post( '/api/rmVm', routes.setNetwork );  
app.post( '/api/addService', routes.setNetwork ); 
app.post( '/api/rmService', routes.setNetwork );  
app.post( '/api/setACL', routes.setNetwork ); 
app.get( '/api/getStatistics', routes.getStatistics ); 

app.listen( 4000, function (){ 
 console.log( 'Express server listening 4000 for manage_web request' );
});


