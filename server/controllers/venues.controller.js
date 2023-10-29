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
