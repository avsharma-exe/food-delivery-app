const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    _id:false,
    streetAddress: { type: String,required:true },
    landmark:{type:String,required:true},
    area:{ type: String, required: true},
    city: { type: String, required:true },
    zip: { type: Number, required:true },
    state: { type: String, required:true },
    country: { type: String, required:true },
    latitude: { type: Number }, // optionalfield: required
    longitude: { type: Number }, //optionalfield: required
});

module.exports = addressSchema