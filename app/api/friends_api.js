// app/api/friends_api.js

module.exports = function(app, client) {
	
	//if table does exist, create it
	client.query('CREATE TABLE IF NOT EXISTS Friends(user1 numeric, user2 numeric, status numeric, privacy numeric)');
	
	//get all friends
	app.get('/friends', function(req, res) {
		var query = client.query('SELECT * FROM Friends',
		function(err) {
			if(err)
				res.json(err);
			else
				res.json(query);
		});
	});
	
	//get one user's friends
	app.get('/friends/:id', function(req, res) {
		var query = client.query('SELECT * FROM Friends WHERE user1 = $1',
		[req.params.id],
		function(err) {
			if(err)
				res.json(err);
			else
				res.json(query);
		});
	});
	
	//create new friend
	app.post('/friends', function(req, res) {
		var query = client.query('INSERT INTO Friends (user1, user2, status, privacy) VALUES ($1, $2, $3, $4)',
		[req.body.user1, req.body.user2, req.body.status, req.body.privacy],
		function(err) {
			if(err)
				res.json(err);
			else
				res.json(query);
		});
	});
	
	//delete friendship
	app.delete('/friends', function(req, res) {
		var query = client.query('DELETE FROM Friends WHERE user1 = $1 AND user2 = $2',
		[req.body.user1, req.body.user2],
		function(err) {
			if(err)
				res.json(err);
			else
				res.json(query);
		});
	});
	
	//edit status
	app.put('/friends/:id/status', function(req, res) {
		var query = client.query('UPDATE Friends SET (status) = ($1) WHERE user1 = $2 AND user2 = $3',
		[req.body.status, req.params.id, req.body.user2],
		function(err) {
			if(err)
				res.json(err);
			else
				res.json(query);
		});
	});
	
	//edit privacy
	app.put('/friends/:id/privacy', function(req, res) {
		var query = client.query('UPDATE Friends SET (privacy) = ($1) WHERE user1 = $2 AND user2 = $3',
		[req.body.privacy, req.params.id, req.body.user2],
		function(err) {
			if(err)
				res.json(err);
			else
				res.json(query);
		});
	});
	
};










