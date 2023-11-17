module.exports = app => {
	const teams = require('../controllers/teams.controller.js');
	
	const router = require('express').Router();

	router.get('/getAllTeams', teams.getAllTeams);

	app.use('/api/teams', router);
};
