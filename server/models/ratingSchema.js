const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    _id:false,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required:true }, //Ref of User ID
    rating: { type: Number ,required:true},
    date:{type:Date,default:Date.now}   //for delivery executive
}
);
module.exports = ratingSchema;