const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        _id:false,
        categoryName:{
            type:String,
            required:true,
        }
    }
)

module.exports = categorySchema;