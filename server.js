// server.js

var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var pg = require('pg');

var host = '127.0.0.1';
var conString = "pg://admin:Password@localhost:5432/WY20";
var client  = new pg.Client(conString);
client.connect(function(err) {
	if(err) {
		console.log(err);
	}
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
require('./app/api/user_api')(app, client);

app.listen(8080);
console.log("Server running on port 8080");