/**
 * @module server.js
 * this file is run to start the backend server. it makes calls to connect to the database and the rest is handled by routes.
 */
const express = require('express');
const fs = require("fs");
const https = require('https');
const {MongoClient} = require('mongodb');
require('dotenv').config();
const app = express();
const dbUtil = require('./server/db.js');
app.use(express.json());

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
})

require('./server/routes/games.routes.js')(app);
require('./server/routes/venues.routes.js')(app);
require('./server/routes/teams.routes.js')(app);

const PORT = process.env.PORT || 3000;

async function main() {
	try {
		await dbUtil.initiateConnection();
		// console.log(`this should send after the database is initialized`);
		// await getGames(client);
		// await client.close();
		https
			.createServer({
				key: fs.readFileSync("./certs/key.pem"),
				cert: fs.readFileSync("./certs/cert.pem"),
			},
				app
			)
			.listen(PORT, () => {
				console.log(`Server is running on port ${PORT}`);
			});
	} catch (e) {
		console.error(`Something went wrong: ${e}`);
	}
}

main();

