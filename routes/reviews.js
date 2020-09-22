const db = require('../models/conn');

const express = require('express');
const router = express.Router();
const RestaurantList = require('../models/reviewsModel');

router.get('/:name?', async (req, res) => {
    if(req.params.name === undefined) {
        res.redirect('/');
    } else {
        const restaurantDetails = await RestaurantList.getRestaurant(req.params.name);
        const restaurantData = await RestaurantList.getReviews(req.params.name);
        console.log(restaurantData);
        res.render('template', {
            locals: {
                title: `Welcome to`,
                data: restaurantDetails,
                reviewData: restaurantData,
                
            },
            partials: {
                partial: "partial-reviews"
        }
    });}
});

router.post('/:name?', async (req, res) => {
    console.log(req.body)
    const {title,review, stars, restaurant_id} = req.body;
    await RestaurantList.createReview(title, review, stars, restaurant_id);
    res.redirect('back')
});

module.exports = router;