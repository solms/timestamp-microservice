// Connect to the path middleware
var path = require('path');

// Months, for reference
var months = ['January', 'February', 'March', 'April', 'May', 
	'June', 'July', 'August', 'September', 'October', 'November', 
	'December'];

module.exports = function(app) {
	app.get('/:timestamp', function(req, res) {
		var timestamp = req.params.timestamp;
		// Filter out favicon requests
		if(timestamp != 'favicon.ico') {
			// Check if it's a number (vs a String)
			if(Number(timestamp)%1 == 0) {
				timestamp = Number(timestamp)*1000;
			}
			// Check if it's a valid date format
			var d = new Date(timestamp);
			if(d == 'Invalid Date') {
				// Log invalid request to console
				console.log('INVALID!');
				// Respond with the appropriate JSON data
				res.json({
					'unix' 		: null,
					'natural' 	: null
				});
			} else {
				console.log(d);
				// Respond with appropriate JSON data
				res.json({
					'unix'		: d.getTime(),
					'natural' 	: months[d.getMonth()] + ' ' + d.getDate() 
									+ ', ' + d.getFullYear()
				});
			}
		}
	});

	// Front-end route
	app.get('*', function(req, res) {
		res.sendFile(path.join(__dirname + '/../public/views/index.html'));
	});
}