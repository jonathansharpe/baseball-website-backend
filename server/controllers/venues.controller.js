const dbUtil = require('../db.js');
let db;

exports.getAllVenues = async (req, res) => {
	db = dbUtil.getDb();
	// console.log(db);
	const retVal = await db.collection("venues").find();
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

exports.getVenues = async (req, res) => {
	db = dbUtil.getDb();
	try {
		const retVal = await db.collection("venues").find({
			curName: req.body.curName,
			firstYear: req.body.firstYear,
			prevNames: req.body.prevNames,
			springTraining: req.body.springTraining,
		});
		console.log(retVal);
		const results = await retVal.toArray();
		console.log(results);
		if (results.length > 0 ) {
			results.forEach((result, i) => {
				res.send(`${i+1}. game: ${result}`);
			})
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
