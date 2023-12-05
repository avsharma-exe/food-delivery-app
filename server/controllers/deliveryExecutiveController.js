var mongoose = require("mongoose");

const orderSchema = require('../models/orderModel');

const userSchema = require('../models/userModel');


const nodemailer = require("nodemailer");

const userDataCollection = mongoose.model('user', userSchema, 'users');

const orderDataCollection = mongoose.model('order', orderSchema, 'orders');


exports.getOrders = (req, res, next) => {
  orderDataCollection.find({$and:[{orderStatus:"accepted-ro"},
  {"orderLocation.city" : req.params.city}]}).populate('userId',['firstName','email'])
  .exec(function (err,order) {
    if (err) {
        console.error(err);
    }
    res.status(200).json({
        orders: order
    });
  })
}

exports.getRecentOrders = (req, res, next) => {
  let id = mongoose.Types.ObjectId(req.body.userId);
  orderDataCollection.find({orderStatus:"delivered",deliveryExecutive:id})
  .populate('userId',['firstName'])
  .limit(2)
  .exec(function (err,order) {
    if (err) {
        console.error(err);
    }
    res.status(200).json({
        orders: order
    });
  })
}

exports.acceptOrderDe = (req,res,next) => {
  let id = mongoose.Types.ObjectId(req.params.oid);
  let updateData = {
    orderStatus: "accepted-de",
    deliveryExecutive: req.body.userId,
    orderOtp : req.body.otp
  }
  orderDataCollection.findByIdAndUpdate(id,updateData,function(err, res) {
    if (err) console.log(err.message);
    else {
        console.log("Data updated ", res);
    }
  });
  sendOtp(req.body.uemail,req.body.otp);
  res.status(200).json({
    status:"sent"
  })
}

exports.orderStatus = (req,res,next) => {
  let id = mongoose.Types.ObjectId(req.params.oid);
  let updateData = {
    orderStatus: req.body.status,
    orderDateAndTime: req.body.orderDateAndTime
  }
  orderDataCollection.findByIdAndUpdate(id,updateData,function(err, res) {
    if (err) console.log(err.message);
    else {
        console.log("Data updated ", res);
    }
  });
}

exports.activeOrders = (req,res,next) =>{
  let id = mongoose.Types.ObjectId(req.body.userId);
  orderDataCollection.find({$and: [{$or:[{orderStatus:"accepted-de"},{orderStatus:"Picked-up"},
  {orderStatus:"On-the-Way"}]},{deliveryExecutive:id}]})
  .populate('userId',['firstName','email','mobileNumber'])
  .exec(function (err,order) {
    if (err) {
        console.error(err);
    }
    res.status(200).json({
        orders: order
    });
  })
}

exports.deliveredOrders = (req,res,next) =>{
  let id = mongoose.Types.ObjectId(req.body.userId);
  orderDataCollection.find({$and:[{orderStatus:"delivered"},{deliveryExecutive:id}]})
  .select('_id restaurantDetails orderDateAndTime orderLocation totalAmount')
  .exec(function (err,order) {
    if (err) {
        console.error(err);
    }
    res.status(200).json({
        orders: order
    });
  })
}

exports.getRatings = (req,res,next) => {
    let id = mongoose.Types.ObjectId(req.body.userId);
    userDataCollection.findById(id).select('deliveryExecutive').exec(function (err, rating) {
      if (err) console.log(err.message);
    res.status(200).json({
      ratings: rating
    })
  })
}

exports.updateDe = (req,res,next) => {
  let id = mongoose.Types.ObjectId(req.body.userId);
  let updateData = req.body;

  userDataCollection.findByIdAndUpdate(id,updateData,function(err, result) {
    if (err) {
      res.send(err);
    }
    else {
        res.send(result);
    }
  });
}

exports.sendMail = (req,res,next) =>{
  main(req.params.mail,req.params.status,req.body);
  res.status(200).json({
    status:"sent"
  })
}

exports.getOtp = (req, res, next) => {
  let id = mongoose.Types.ObjectId(req.params.oid);
    orderDataCollection.findById(id).select('orderOtp').exec(function (err, otp) {
      if (err) console.log(err.message);
    res.status(200).json({
      otp: otp.orderOtp
    })
  })
}




async function main(id,status,body) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  let transporter = nodemailer.createTransport({
    host: "172.27.172.202",
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "CEL@evolvingsols.com",
      pass: "Gmail#@5689",
    },
    tls: {
      rejectUnauthorized: false
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Bon Apetite Food App 👻" CEL@evolvingsols.com', // sender address
    to: id, // list of receivers
    subject: "Bon Apetite : Your Order Status ✔", // Subject line
    html: "<p>Thanks For Choosing Bon Apetite</p><p>Your Order status is - "+status+"</p>"+
    "<p> Restaurant Name - "+body.restaurantName+"</p>"+
    "<p> Billing Amount - "+body.billAmount+"</p>", // html body
  });

}

async function sendOtp(id,otp) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  let transporter = nodemailer.createTransport({
    host: "172.27.172.202",
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "CEL@evolvingsols.com",
      pass: "Gmail#@5689",
    },
    tls: {
      rejectUnauthorized: false
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Bon Apetite Food App 👻" CEL@evolvingsols.com', // sender address
    to: id, // list of receivers
    subject: "Bon Apetite : Your Order OTP ✔", // Subject line
    html: "<p>Thanks For Choosing Bon Apetite</p><p>Your Order OTP is - </p><h1>"+otp+"</h1>"
  });

}

