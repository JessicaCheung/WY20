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

//get all users
app.get('/user', function(req, res) {
	console.log("Get users");
	UserProfile.find(function(err, users) {
		if(err)
			res.send(err);
		res.json(users);
	});
});

//get one user
app.get('/user/:id', function(req, res) {
	var id = req.params.id;
	UserProfile.findOne({_id:id}, function(err, user) {
		if(err)
			res.send(err);
		else
			res.json(user);
	});
});

//create new user
app.post('/user', function(req, res) {
	console.log("Inserting: " + req.body);
	var user = new UserProfile({
		user_id: 1,
		user_name: req.body.username,
		name: req.body.name,
		password: req.body.password,
		email: req.body.email,
		mobile_number: req.body.mobilenumber
	}).save(function(err) {
		if(err) {
			return console.log(err);
		} else {
			return console.log("created");
		}
	});
	res.json(req.body);
});

//update user
app.put('/user/:id', function(req, res) {
	var id = req.params.id;
	console.log("Updating: " + id);
	UserProfile.findOneAndUpdate({
		_id: id}, {
		user_name: req.body.username,
		name: req.body.name,
		password: req.body.password,
		email: req.body.email,
		mobile_number: req.body.mobilenumber
	}, function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log("Updated");
		}
	});
	res.json(req.body);
});

//delete user
app.delete('/user/:id', function(req, res) {
	var id = req.params.id;
	console.log("Deleting: " + id);
	UserProfile.remove({_id:id}, function(err) {
		if(err)
			console.log(err);
		else
			console.log("Removed");
	});
	res.json(req.body);
});

app.listen(8080);
console.log("Server running on port 8080");