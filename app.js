const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/gluten-free', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

var restaurantSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Restaurant = mongoose.model('Restaurant', restaurantSchema);

// var restaurants = [
// 	{
// 		name: 'Spirals Bakery',
// 		image:
// 			'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80'
// 	},
// 	{
// 		name: 'Wilderwood',
// 		image:
// 			'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
// 	},
// 	{
// 		name: 'Something Trendy',
// 		image:
// 			'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
// 	}
// ];

Restaurant.create(
	{
		name: 'Spirals',
		image:
			'https://images.unsplash.com/photo-1573256814950-6604b19492e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
		description: 'Really tasty treats'
	},
	function(err, restaurant) {
		if (err) {
			console.log(err);
		} else {
			console.log('NEWLY CREATED RESTAURANT: ');
			console.log(restaurant);
		}
	}
);

app.get('/', function(req, res) {
	res.render('landing');
});

app.get('/restaurants', function(req, res) {
	//get all restaurants from db
	Restaurant.find({}, function(err, allRestaurants) {
		if (err) {
			console.log(err);
		} else {
			res.render('restaurants', { restaurants: allRestaurants });
		}
	});
});

app.post('/restaurants', function(req, res) {
	//get data from form and add to restaurants array
	var name = req.body.name;
	var image = req.body.image;
	var newRestaurant = { name: name, image: image };
	restaurants.push(newRestaurant);
	//redirect to campgrounds page
	res.redirect('/restaurants');
});

app.get('/restaurants/:id', function(req, res) {});

app.get('/restaurants/new', function(req, res) {
	res.render('new');
});
app.listen(3000, function() {
	console.log('GF Server Started');
});
