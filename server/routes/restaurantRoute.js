const express = require("express");
const restaurantController = require("../controllers/restaurantController");
const auth = require("../helpers/authAPI");

const router = express.Router();

router.get('/getRestaurants', restaurantController.getRestaurants);

router.post('/addRestaurant', restaurantController.addRestaurant);

router.put('/addRestaurantRating',auth.authAPI, restaurantController.addRestaurantRating);

router.get('/topRestaurants', restaurantController.getTopRestaurants);

router.get('/getRestaurantById', restaurantController.getRestaurantById);

router.get('/topFoods',restaurantController.getTopFood);

router.get('/searchRestaurants', restaurantController.searchRestaurants);

router.patch('/accept-order-ro', restaurantController.acceptOrderRo);

router.get('/get-orders-res/:id/', restaurantController.getOrdersByRes);

router.get('/getFoodByRestaurant', restaurantController.getFoodByRestaurant);

router.put('/addFoodRating',auth.authAPI,restaurantController.addFoodRating);

router.get('/highlyOrderedRes', restaurantController.getHighlyOrderedRes);

module.exports = router;
