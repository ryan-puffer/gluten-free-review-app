const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var restaurants = [
    {name: "Spirals Bakery", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"},
    {name: "Wilderwood", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"},
    {name: "Something Trendy", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"}
]

app.get("/", function(req, res){
    res.render("landing")
});

app.get("/restaurants", function(req, res){
    
    res.render("restaurants", {restaurants:restaurants});
})

app.post("/restaurants", function(req, res){
    //get data from form and add to restaurants array
    var name = req.body.name;
    var image = req.body.image;
    var newRestaurant = {name: name, image: image}
    restaurants.push(newRestaurant);
    //redirect to campgrounds page
    res.redirect("/restaurants");
})

app.get("/restaurants/new", function(req, res){
    res.render("new");
})
app.listen(3000, function(){
    console.log("GF Server Started");
});