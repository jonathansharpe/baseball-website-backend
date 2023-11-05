module.exports = app => {
	const venues = require('../controllers/venues.controller.js');
	
	const router = require('express').Router();

	router.get('/getAllVenues', venues.getAllVenues);
	router.post('/getVenues', venues.getVenues);

	app.use('/api/venues', router);
};
