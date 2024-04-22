var nodemailer = require("nodemailer");
var fs = require("fs");

// Chuyển đổi sang định dạng VND
const formatCurrency = (amount) => {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formatter.format(amount);
};


const verifyEmailForm = (email, code) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            * {
                color: black;
            }
            p {
                color: black;
            }
        </style>
    </head>
    <body>
        <h1>Welcome to VDream!</h1>
        <p>To complete your registration and start using <b>VDream</b>, please verify your email address by entering the following verification code:</p>
        <b><h2>${code}</h2></b>
        <p>This verification code is valid for 24 hours. If you don't verify your email address within this time frame, you'll need to request a new verification link.</p>
        <br>
        <hr>
        <br>
        <p>Thank you for choosing VDream!</p>
        <p>The VDream Team</p>
    </body>
    </html>
    `
}

const mailSender = (email, code) => {
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "hainguyen0112358@gmail.com",
      pass: "plno voib qsxr iqho",
    },
    tls: { rejectUnauthorized: false },
  });

  let mailOptions = {
    from: "hainguyen0112358@gmail.com",
    to: email,
    subject: "Verify Your Email Address for VDream",
    html: verifyEmailForm(email, code),
    priority: "high",
  };


  return transporter.sendMail(mailOptions);
};

module.exports = mailSender;