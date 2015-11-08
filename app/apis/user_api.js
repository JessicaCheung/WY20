// app/apis/user_api.js

var UserProfile = require('../models/userProfile');

module.exports = function(app) {
	//get all users
	app.get('/user', function(req, res) {
		UserProfile.find(function(err, users) {
			if(err)
				res.send(err);
			else
				res.json({message: "Get all users", obj: users});
		});
	});

	//get one user
	app.get('/user/:id', function(req, res) {
		var id = req.params.id;
		UserProfile.findOne({_id:id}, function(err, user) {
			if(err)
				res.send(err);
			else
				res.json({message: "Get user: " + user.username, obj: user});
		});
	});

	//create new user
	app.post('/user', function(req, res) {
		var user = new UserProfile({
			username: req.body.username,
			name: req.body.name,
			password: req.body.password,
			email: req.body.email,
			mobilenumber: req.body.mobilenumber
		}).save(function(err) {
			if(err)
				res.send(err);
			else
				res.json({message: "Created user: " + req.body.username, obj: req.body});
		});
	});

	//update user
	app.put('/user/:id', function(req, res) {
		var id = req.params.id;
		UserProfile.findOneAndUpdate({
			_id: id}, {
			username: req.body.username,
			name: req.body.name,
			password: req.body.password,
			email: req.body.email,
			mobilenumber: req.body.mobilenumber
		}, function(err) {
			if(err) 
				res.send(err);
			else
				res.json({message: "Updated user: " + req.body.username, ob: req.body});
		});
	});

	//delete user
	app.delete('/user/:id', function(req, res) {
		var id = req.params.id;
		UserProfile.remove({_id:id}, function(err) {
			if(err)
				res.send(err);
			else
				res.json({message: "Deleted user: " + id})
		});
	});
};