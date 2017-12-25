const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

//Config 
var config = require("./server/config");

// API file for interacting with MongoDB
const api = require('./server/routes/api');

// Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Angular dist o/p folder
app.use(express.static(path.join(__dirname, '/dist')));

// API location
app.use('/api', api);

// Send all other request to the angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Mongodb connect
mongoose.connect(config.database, (err) => {
	if(err){
		console.log("Unable to conect to database...");
		console.log("... " + config.database);
	} else {
		console.log("Connected to DB");
	}
});

const http = require('http').Server(app);

// Server
http.listen(config.port, (err) => {
	if(err){
		console.log(err);
	} else {
		console.log(`Listening on port  ${config.port}`);
	}
});