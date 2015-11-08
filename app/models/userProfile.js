var mongoose = require('mongoose');

var userProfile = mongoose.Schema({
	user_id: Number,
	user_name: String,
	name: String,
	password: String,
	email: String,
	mobile_number: Number
});
module.exports = mongoose.model('UserProfile', userProfile);