// server.json

var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/userProfile');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
var UserProfile = require('./app/models/userProfile');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
require('./app/apis/user_api')(app);


app.listen(8080);
console.log("Server running on port 8080");