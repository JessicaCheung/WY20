// app/api/user_api.js

module.exports = function(app, client) {
	
	//if table does exist, create it
	client.query('CREATE TABLE IF NOT EXISTS UserProfile(id serial primary key, username varchar(64), name varchar(64), password varchar(64), email varchar(64), mobileNumber numeric(10, 0))');
	
	app.get('/user', function(req, res) {
		var query = client.query('SELECT * FROM UserProfile',
		function(err) {
			if(err)
				res.json(err);
			else
				res.json(query);
		});
	});
	
	app.get('/user/:id', function(req, res) {
		var query = client.query('SELECT * FROM UserProfile WHERE id = $1',
		[req.params.id],
		function(err) {
			if(err)
				res.json(err);
			else
				res.json(query);
		});
	});
	
	app.post('/user', function(req, res) {
		var query = client.query('INSERT INTO UserProfile (username, name, password, email,  mobileNumber) VALUES ($1, $2, $3, $4, $5)', 
		[req.body.username, req.body.name, req.body.password, req.body.email, req.body.mobileNumber],
		function(err) {
			if(err)
				res.json(err);
			else
				res.json(query);
		});
	});
	
	app.put('/user/:id', function(req, res) {
		var query = client.query('UPDATE UserProfile SET (username, name, password, email, mobileNumber) = ($1, $2, $3, $4, $5) WHERE id = $6',
		[req.body.username, req.body.name, req.body.password, req.body.email, req.body.mobileNumber, req.params.id],
		function(err) {
			if(err)
				res.json(err);
			else
				res.json(query);
		});
	});
	
	app.delete('/user/:id', function(req, res) {
		var query = client.query('DELETE FROM UserProfile WHERE id = $1',
		[req.params.id], 
		function(err) {
			if(err)
				res.json(err);
			else
				res.json(query);
		});
	});
};