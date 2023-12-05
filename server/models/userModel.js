const mongoose = require('mongoose');
const deliveryExecutiveSchema = require('./deliveryExecutiveModel');
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        mobileNumber: {
            type: Number,
            required: true
        },
        role:
        {
            type: String,
            enum: ['user', 'ro', 'de'],   //enum
            required: true
        },
        deliveryExecutive: {
            type: deliveryExecutiveSchema
        },
        restaurantOwner: {
          type: mongoose.Schema.Types.ObjectId, 
          ref: "restaurant",
      },
        cart: {
            type: {
                _id: false,
                restaurantId: {
                    type: String,
                    required: true
                },
                foodList:
                {
                    type: [{
                        _id: false,
                        foodId: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'restaurant.menuDetails',
                            required: true  
                        }, //Ref of User ID
                        quantity: {
                            type: Number,
                            required: true  
                        },
                    }],
                    required: true,
                    default: undefined
                },
            },
            default: undefined
        }
    }
)

module.exports = userSchema;
