const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const userRoute = require('./routes/userRoute');
const restaurantRoute = require('./routes/restaurantRoute');
const deliverExecutiveRoute = require('./routes/deliveryExecutiveRoute');
const orderRoute = require('./routes/orderRoute');
const categoryRoute = require('./routes/categoryRoute');
const cors = require("cors");
const session = require('express-session');

dotenv.config();
mongoose.connect(
    process.env.CONNECTION_STRING,
    { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));


// First time user registartion

const app = express();
app.use(express.json());

app.use(session({ 
    secret: 'CybageSoftware', 
    resave: true, 
    saveUninitialized: true
}))

app.use(cors());

app.use(userRoute);

app.use(restaurantRoute);

app.use(deliverExecutiveRoute);

app.use(orderRoute);

app.use(categoryRoute);


app.use("/", function(req, res){
    res.send("<h1>This is Home</h1>");
})



// Error Middleware

app.listen(3000, function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Server is running on 3000...");
    }
});
