var mongoose = require("mongoose");
const restaurantSchema = require('../models/restaurantModel');
const { options } = require("../routes/userRoute");
const app = require("../server");
const orderSchema = require('../models/orderModel');
const orderDataCollection = mongoose.model('order', orderSchema, 'orders');

restaurantSchema.index({ '$**': 'text' });
const restaurantDataCollection = mongoose.model('restaurant', restaurantSchema, 'restaurants');

exports.getRestaurants = (req, res, next) => {
    restaurantDataCollection.aggregate([
        {
            "$addFields": {
                "rating_avg": {
                    "$avg": {
                        "$map": {
                            "input": "$restaurantRatings",
                            "as": "restRating",
                            "in": "$$restRating.rating"
                        }
                    }
                }
            }
        }
    ]).exec(function (err, result) {
        if (err) throw err;
        res.send(result);
    });
}


exports.getRestaurantById = (req, res, next) => {
    let id = mongoose.Types.ObjectId(req.query.id);

    restaurantDataCollection.aggregate([{ "$match": { "_id": id } },
    {
        "$addFields": {
            "rating_avg": {
                "$avg": {
                    "$map": {
                        "input": "$restaurantRatings",
                        "as": "restRating",
                        "in": "$$restRating.rating"
                    }
                }
            }
        }
    }
    ])
        .exec(function (err, result) {
            if (err) throw err;
            res.send(result);
        });
}

exports.addRestaurant = (req, res, next) => {
    let restaurantObj = new restaurantDataCollection(
        req.body
    )
    restaurantObj.save(function (err, val) {
        if (err) console.log(err.message);
        else {
            console.log("Rest Data======>", val);
        }
    })
}

exports.addRestaurantRating = async (req, res, next) => {
    let restaurantId = mongoose.Types.ObjectId(req.body.restaurantId);

    let restaurantRatings = {
        userId: req.body.userId,
        rating: req.body.restaurantRating
    }
try {
    

    let restaurantData = await restaurantDataCollection.findById(restaurantId);
    let restaurantRating = restaurantData.restaurantRatings.find((x) => x.userId == req.body.userId);

    let result;
    if (restaurantRating == undefined) {
        result=await restaurantDataCollection.findByIdAndUpdate(restaurantId, { $push: { restaurantRatings: restaurantRatings } });
    } else {
        result=await restaurantDataCollection.updateOne({ "_id": restaurantId, "restaurantRatings.userId": req.body.userId }, { $set: { 'restaurantRatings.$.rating': req.body.restaurantRating } });
    }

    res.send(result);
} catch (error) {
    res.send(error);
    
}
}

exports.getTopRestaurants = (req, res, next) => {
    restaurantDataCollection.aggregate([
        {
            "$addFields": {
                "rating_avg": {
                    "$avg": {
                        "$map": {
                            "input": "$restaurantRatings",
                            "as": "restRating",
                            "in": "$$restRating.rating"
                        }
                    }
                }
            }
        },
        { "$sort": { "rating_avg": -1 } }
    ])
        .limit(6)
        .exec(function (err, result) {
            if (err) throw err;
            res.send(result);
        });
}


exports.searchRestaurants = async (req, res, next) => {
    let search = req.query.search;
    let city = req.query.city;
    let searchRestaurants
    let searchRegex, cityregex;
    if (search == '') {
        searchRegex = new RegExp('^');
    }
    else {
        searchRegex = new RegExp(search);
    }
    if (city == '') {
        cityregex = new RegExp('^');
    }
    else {
        cityregex = new RegExp("^"+city);
    }
    try {
        searchRestaurants = await restaurantDataCollection.aggregate([
            {
                '$addFields': {
                    "rating_avg": {
                        "$avg": {
                            "$map": {
                                "input": "$restaurantRatings",
                                "as": "restRating",
                                "in": "$$restRating.rating"
                            }
                        }
                    }
                }
            },
            {
                $match: {
                    $and: [
                        {
                            'restaurantLocation.city': { $regex: cityregex, $options: 'i' }
                        },
                        {
                            $or: [
                                {
                                    'restaurantName': {
                                        $regex: searchRegex,
                                        $options: 'i'
                                    }
                                }
                                ,
                                {
                                    'restaurantCategory': {
                                        $regex: searchRegex,
                                        $options: 'i'
                                    }
                                },
                                {
                                    'menuDetails.foodName': {
                                        $regex: searchRegex,
                                        $options: 'i'
                                    }
                                },
                                {
                                    'menuDetails.foodCategory': {
                                        $regex: searchRegex,
                                        $options: 'i'
                                    }
                                }
                            ]
                        }
                    ]


                }
            },
        ]);
        res.send(searchRestaurants);
    }
    catch (err) {
        res.send(err)
    }
   
}

exports.getFoodByRestaurant = async (req, res, next) => {
    let id = mongoose.Types.ObjectId(req.query.id);

    let foodList = [];

    let restaurant = await restaurantDataCollection.findById(id);
    let avgRating = 0;

    restaurant.menuDetails.forEach((food) => {
        avgRating = food.foodRating.reduce((total, current) => total + current.rating, 0) / food.foodRating.length;
        foodList.push({ restaurantId: id, food: food, avgRating: avgRating });
    })

    foodList = foodList.sort(function (a, b) {
        return (a.avgRating < b.avgRating) ? 1 : -1;
    });

    res.send(foodList);

}

exports.getTopFood = async (req, res, next) => {
    let rest = await restaurantDataCollection.find().select('menuDetails');
    let foodlist = [];
    let ratings = [];
    var temp;
    rest.forEach((element, index) => {

        element.menuDetails.forEach((food) => {
            let avgRating = 0;
            if (food.foodRating != undefined && food.foodRating.length > 0)
                avgRating = food.foodRating.reduce((total, current) => total + current.rating, 0) / food.foodRating.length;
            foodlist.push({ restaurantId: element._id.toString(), food: food, avgRating: avgRating })
        })
    })

    foodlist = foodlist.sort(function (a, b) {
        return (a.avgRating < b.avgRating) ? 1 : -1;
    })

    res.send(foodlist);
}
exports.acceptOrderRo = (req, res, next) => {
    let id = mongoose.Types.ObjectId(req.body.oId);
    let updateData = {
        orderStatus: req.body.status,
    }
    orderDataCollection.findByIdAndUpdate(id, updateData, function (err, order) {
        if (err)
            res.send(err);
        else {
            res.status(200).json({ "Data updated ": order });
        }
    });

}

exports.getOrdersByRes = (req, res, next) => {
    let id = mongoose.Types.ObjectId(req.params.id);
    orderDataCollection.find({
        $and: [{ orderStatus: "ordered" }
            , { "restaurantDetails.restaurantId": id }]
    })
        .populate('userId', ['firstName', 'email'])
        .exec(function (err, order) {
            if (err) {
                console.error(err);

            }
            res.status(200).json({
                orders: order
            });
        })
}

// Add  foodRatings

exports.addFoodRating = async (req, res, next) => {

    const userId = req.body.userId;
    const restaurantId = req.body.restaurantId;
    const foodId = req.body.foodList.map((item) => {
        return item.foodItem._id;
    });
 

    const foodRating = {
        userId: userId,
        rating: req.body.rating
    }
  

    let result;
    await foodId.forEach(async (value) => {

        result = await restaurantDataCollection.findOneAndUpdate(
            {
                $and: [{
                    _id: mongoose.Types.ObjectId(restaurantId)
                }, {
                    "menuDetails._id": mongoose.Types.ObjectId(value)
                }]
            },
            { $push: { "menuDetails.$.foodRating": foodRating } }
        );

    })

    res.send(result);
};


exports.getHighlyOrderedRes = (req, res, next) => {
    orderDataCollection.aggregate([
        {
            $group: {
                _id: "$restaurantDetails.restaurantName",
                count: { $sum: 1 }
            }
        },
        { "$sort": { "count": -1 } },
        { "$project": { "_id": 1, "count": 1 } }
    ])
        .limit(10)
        .exec(function (err, rating) {
            if (err) throw err;
            res.send(rating);
        });

}
