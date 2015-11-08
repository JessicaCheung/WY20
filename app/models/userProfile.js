// app/models/userProfile.js

var mongoose = require('mongoose');

var userProfile = mongoose.Schema({
	username: String,
	name: String,
	password: String,
	email: String,
	mobilenumber: Number
});
module.exports = mongoose.model('UserProfile', userProfile);