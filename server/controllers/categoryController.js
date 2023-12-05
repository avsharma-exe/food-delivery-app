var mongoose = require("mongoose");
const categorySchema = require('../models/categoryModel');

let categoryDataCollection = mongoose.model('category', categorySchema, 'categories');


exports.getCategories =   (req, res, next) => {
    
     categoryDataCollection.find({},{categoryName:1,_id:0},(err,data)=>{
        if(err)
        {
            res.status(400).send({message: 'something went wrong:'});
        }
        else{
            res.send(data);
        }
    });
}
