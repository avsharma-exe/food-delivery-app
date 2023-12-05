const nodemailer = require("nodemailer");


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



exports.sendOtpForResetPassword=async function(email, otp) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing

   
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Bon Apetit Food App 👻" CEL@evolvingsols.com', // sender address
        to: email, // list of receivers
        subject: "Bon Apetit :One time Password for Reset Password ✔", // Subject line
        html: "<p>Thanks For Choosing Bon Apetit</p><p>Your One Time Password is - </p><h1>" + otp + "</h1>"
    });

    
}
