// express
var express = require( 'express' );
var app = express();

// ejs
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );

// for image,css....
app.use(express.static('public'));

// Routes with session
var routes = require( './routes' );
app.get( '/', routes.index ); 
app.post('/login',routes.login);
app.post( '/api/addVm', routes.setNetwork );   // ㄅ確定要ㄅ要
app.post( '/api/rmVm', routes.setNetwork );  // ㄅ確定要ㄅ要
app.post( '/api/addService', routes.setNetwork ); 
app.post( '/api/rmService', routes.setNetwork ); 
app.post( '/api/cgMethod', routes.setNetwork ); 
app.post( '/api/addFlow', routes.setVm ); 
app.post( '/api/rmFlow', routes.setVm ); 
app.post( '/api/cgService', routes.setVm ); 
app.get( '/api/getStatistics', routes.getStatistics ); 

app.listen( 4000, function (){ 
 console.log( 'Express server listening 4000 for manage_web request' );
});


