const express = require('express'),
    router = express.Router(),
    restaurantsList = require('../models/reviewsModel')

    const renderIndex = async res => {
        const restaurantDetails = await restaurantsList.getRestaurant();
        return res.render("template", {
            locals: {
                title: "Welcome",
                data: restaurantDetails,
            },
            partials: {
                partial: "partial-index"
            }
        });
    }
    
    router.get('/', async (req, res) =>{
        renderIndex(res);
    });
    
    module.exports = router;
