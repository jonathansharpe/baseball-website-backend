module.exports = app => {
	const venues = require('../controllers/venues.controller.js');
	
	const router = require('express').Router();

	router.get('/getAllVenues', venues.getAllVenues);

	app.use('/api/venues', router);
};
