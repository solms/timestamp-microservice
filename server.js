// Import required modules
var express 	= require('express');
var bodyParser 	= require('body-parser');

// Start the app
var app = express();

// Define the port
var port = process.env.PORT || 3000;

// Set up middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Define static file location
app.use(express.static(__dirname + '/public'));

// Set up routes
require('./app/routes')(app);

// Start the server on the specified port
app.listen(port, function(){
	console.log('Timestamp Microservice is running on port ' + port + '.');
})