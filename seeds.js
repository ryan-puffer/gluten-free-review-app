const mongoose = require('mongoose');
const Restaurant = require('/Users/ryanp/Desktop/projects/gluten-free/models/restaurant.ejs');
const Comment = require('/Users/ryanp/Desktop/projects/gluten-free/models/comment.ejs');

let data = [
	{
		name: 'Spirals Diner',
		image: 'https://threebestrated.com/images/SpiralDiner-FortWorth-TX.jpeg',
		description: 'Quirky, friendly atmosphere with TONS of GF options. Very accomodating.'
	},
	{
		name: 'Wilderwood',
		image: 'https://s3-media1.fl.yelpcdn.com/bphoto/P1O3y7uLgOxGCfoW36Kn7A/348s.jpg',
		description: 'Try their ALL GF Sunday brunch!'
	},
	{
		name: 'Company Cafe',
		image: 'https://s3-media2.fl.yelpcdn.com/bphoto/aiIFTD_DOW-0ISpc0dfDYQ/ls.jpg',
		description:
			'All you need to know is they have gluten-free FRIED CHICKEN. Also, have GREAT breakfast options all day.'
	}
];

function seedDB() {
	//Remove all campgrounds
	Restaurant.deleteMany({}, function(err) {
		if (err) {
			console.log(err);
		}
		console.log('removed restaurants!');
		Comment.deleteMany({}, function(err) {
			if (err) {
				console.log(err);
			}
			console.log('removed comments!');
			//add a few campgrounds
			data.forEach(function(seed) {
				Restaurant.create(seed, function(err, restaurant) {
					if (err) {
						console.log(err);
					} else {
						console.log('added a restaurant');
						//create a comment
						Comment.create(
							{
								text: 'This place is great, but I wish there was internet',
								author: 'Homer'
							},
							function(err, comment) {
								if (err) {
									console.log(err);
								} else {
									restaurant.comments.push(comment);
									restaurant.save();
									console.log('Created new comment');
								}
							}
						);
					}
				});
			});
		});
	});
	//add a few comments
}

module.exports = seedDB;
