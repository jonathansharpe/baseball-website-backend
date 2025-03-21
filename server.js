/**
 * @module server.js
 * this file is run to start the backend server. it makes calls to connect to the database and the rest is handled by routes.
 */
const express = require('express');
const fs = require("fs");
const https = require('https');
const http = require('http');
const {MongoClient} = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express();
const dbUtil = require('./server/db.js');
app.use(express.json());

// CORS configuration
app.use(cors({
	origin: ['http://localhost:5173', 'https://localhost:5173', 'https://jsharpe.xyz'],
	methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
	credentials: true
}));

require('./server/routes/games.routes.js')(app);
require('./server/routes/venues.routes.js')(app);
require('./server/routes/teams.routes.js')(app);

const PORT = process.env.PORT;

async function main() {
	try {
		await dbUtil.initiateConnection();
		// console.log(`this should send after the database is initialized`);
		// await getGames(client);
		// await client.close();
		if (PORT == 3000 || PORT === '3000') {
			// uses http for dev mode, to avoid CORS error
			http
				.createServer(app)
				.listen(PORT, () => {
					console.log("Server running in dev mode")
					console.log(`Server is running on port ${PORT}`);
				});
		} else {
			https
				.createServer({
					key: fs.readFileSync('jsharpe.xyz.key'),
					cert: fs.readFileSync('jsharpe.xyz.pem'),
				},
					app
				)
				.listen(PORT, () => {
					console.log("Server running in prod mode")
					console.log(`Server is running on port ${PORT}`);
				});
		}
	} catch (e) {
		console.error(`Something went wrong: ${e}`);
	}
}

main();

