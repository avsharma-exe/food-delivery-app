const mongoose = require('mongoose');
const addressSchema = require('./addressModel');
const foodSchema = require('./foodModel');
const ratingSchema = require('./ratingSchema');

const restaurantSchema = new mongoose.Schema(
    {
        restaurantName:{
            type:String,
            required:true
        },        
        restaurantLocation:{
           type:addressSchema,
           required:true             
        },
        workingHours:{            
            start: {type:Number, required:true},
            end: {type:Number,required:true}
        },
        activityStatus:{
            type:Boolean,
            default:true    //extended:             
        },
        restaurantImages:[{
            type:String,
            required:true           
        }],
        restaurantCategory:[{
            type:String,
            required: true   
        }],
        avgCost:{
            type:Number,
            required:true
        },
        restaurantRatings:[{
            type:ratingSchema
        }],
        userId:{    //owner
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'user',
            required:true
        },
        menuDetails:[{
            type:foodSchema,
            required:true
        },]
    }
)

module.exports = restaurantSchema;