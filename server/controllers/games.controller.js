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
	const query = {};

	Object.entries(req.body).forEach(([field, values]) => {
		if (Array.isArray(values) && values.length > 0) {
			query[field] = { $in: values};
		}
	});

	try {
		// console.log(query);
		const retVal = await db.collection("games").find(query);
		// console.log(retVal);
		const results = await retVal.toArray();
		// console.log(results);
		res.send(results);
		return;
	} 
	catch (err) {
		return res.status(500).send({
			message: err.message || "something went wrong"
		});
	}
}
