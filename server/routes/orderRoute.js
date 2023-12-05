const express = require("express");
const orderController = require("../controllers/orderController");
const auth = require("../helpers/authAPI");

const router = express.Router();

router.post('/addOrder',auth.authAPI,orderController.addOrder);

router.get('/userOrders',auth.authAPI,orderController.getOrders);

router.put('/orderRatingStatus',auth.authAPI,orderController.changeRatingStatus);

module.exports = router;