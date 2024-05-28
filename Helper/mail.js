const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require('nodemailer')
const mail = (email,subject,text) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_POST,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: subject,
        text: text,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("email sent = " + info.response);
        }
      });
}
module.exports={mail}

