const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Restaurant = require('/Users/ryanp/Desktop/projects/gluten-free/models/restaurant.ejs');
const seedDB = require('./seeds');

mongoose.connect('mongodb://localhost/gluten-free', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
seedDB();

app.get('/', function(req, res) {
	res.render('landing');
});

app.get('/restaurants', function(req, res) {
	//get all restaurants from db
	Restaurant.find({}, function(err, allRestaurants) {
		if (err) {
			console.log(err);
		} else {
			res.render('index', { restaurants: allRestaurants });
		}
	});
});

app.post('/restaurants', function(req, res) {
	//get data from form and add to restaurants array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newRestaurant = { name: name, image: image, description: desc };
	Restaurant.create(newRestaurant, function(err, newlyCreated) {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/restaurants');
		}
	});
});

app.get('/restaurants/new', function(req, res) {
	res.render('new');
});

app.get('/restaurants/:id', function(req, res) {
	Restaurant.findById(req.params.id).populate('comments').exec(function(err, foundRestaurant) {
		if (err) {
			console.log(err);
		} else {
			console.log(foundRestaurant);
			res.render('show', { restaurant: foundRestaurant });
		}
	});
});

app.listen(3000, function() {
	console.log('GF Server Started');
});
