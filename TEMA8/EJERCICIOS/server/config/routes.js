'use strict';

module.exports = function(app) {

	// GNA SERVICE API //
	var gna = require('../controllers/gna');
	app.get('/api/gna/:mod', gna.generateRandomNumber);
	app.get('/api/gna/error/:mod', gna.generateError);
	app.get('/api/gna/delay/:mod', gna.generateAndDelayRandomNumber);
	/////////////////////

  app.get('/*', function(req, res) {
    res.render('index.html');
  });
}  