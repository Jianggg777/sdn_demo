// express
var express = require( 'express' );
var app = express();

// ejs
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );

// for image,css....
app.use(express.static('public'));

// Routes
var routes = require( './routes' );
app.get( '/', routes.index ); 
app.get( '/api/taiwan/:area', routes.twData ); 
app.get( '/movie', routes.movie ); 

app.listen( 3000, function (){ 
 console.log( 'Express server listening 3000 for pm2.5_web request' );
});
