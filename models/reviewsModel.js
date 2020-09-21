const db = require('./conn');

class RestaurantList {
    constructor (restaurant_name, food_category, favorite_dish, title, stars, review, reviewer_name, slug){
        this.restaurant_name = restaurant_name
        this.food_category = food_category
        this.favorite_dish = favorite_dish
        this.title = title
        this.stars = stars
        this.review = review
        this.reviewer_name = reviewer_name
        this.slug = slug
    }
    static async getRestaurant () {
        try {
            const response = await db.any(`SELECT * FROM restaurants;`);
            return response;
        }catch (error){
            return error.message;
        }
    }
    
    static async getReviews (slug) {
        try{
            const response = await db.any(`SELECT * FROM reviews INNER JOIN restaurants ON reviews.restaurants_id = restaurants.id INNER JOIN reviewer ON reviews.reviewer_id = reviewer.id WHERE slug = $1;`, [slug]);
            return response 
        }catch (error) {
            return error.message;
        }
    }

    static async createReview (title, review, stars, reviewer_id, restaurant_id) {
        try{
            const response = await db.result(`
            INSERT INTO reviews (title, review, stars, reviewer_id, restaurant_id)
            VALUES ($1, $2, $3, $4, $5);`, [title, review, stars, reviewer_id, restaurant_id],
            );
            return response;
        } catch (error) {
            return error;
        }
    }
}
module.exports = RestaurantList;