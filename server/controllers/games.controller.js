const dbUtil = require('../db.js');
let db;

exports.getAllGames = async (req, res) => {
	db = dbUtil.getDb();
	// console.log(db);
	const retVal = await db.collection("games").find();
	const results = await retVal.toArray();
	if (results.length > 0 ) {
		// let returnArray = "";
		// results.forEach((result, i) => {
		// 	returnArray += `${i+1}. game: ${JSON.stringify(result, null, "\n")}`;
		// })
		return res.status(200).send(results);
	}
	else {
		console.log(`no listings found`);
	}
}

exports.getGames = async (req, res) => {
	db = dbUtil.getDb();
	try {
		const query = {};
		const fieldsToCheck = [
			'month', 
			'day',
			'year',
			'homeTeam',
			'roadTeam',
			'homeTeamRuns',
			'roadTeamRuns',
			'venue',
			'springTraining',
		];
		fieldsToCheck.forEach((field) => {
			if (Array.isArray(req.body[field]) && req.body[field].length > 0) {
				query[field] = { $in: req.body[field] };
			}
			else if (req.body[field] !== undefined && req.body[field] !== '') {
				query[field] = req.body[field];
			}
		});
		console.log(query);
		const retVal = await db.collection("games").find(query);
		// console.log(retVal);
		const results = await retVal.toArray();
		// console.log(results);
		if (results.length > 0 ) {
			res.send(results);
			return;
		}
		else {
			res.send(`no listings found`);
			return;
		}
	} 
	catch (err) {
		return res.status(500).send({
			message: err.message || "something went wrong"
		});
	}
}
