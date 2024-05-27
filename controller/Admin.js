
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const adminModels = require("../models/Admin")
const { mail } = require('../Helper/mail')
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email && password) {
      console.log("admin----email-", email);
      const admin = await adminModels.findOne({ email: email })

      console.log("Admin====", admin);
      if (admin) {
        const ismatch = bcrypt.compareSync(password, admin.password);
        if (ismatch) {
          const token = jwt.sign(
            {
              id: admin.id,
              email: admin.email,
            },
            process.env.secret_key
          );
          subject = "Welcome Back to SpeedyWheels Rentals! You're Successfully Logged In!",
            text = `Welcome to SpeedyWheels Rentals! We are thrilled to have you as a member of our community. Your registration is now complete, and you're all set to explore and enjoy our wide range of rental cars.`,
            mail(email, subject, text)

          return res.json({
            status: 200,
            message: "login successfully..!!",
            token,
          });
        } else {
          return res.json({
            status: 409,
            message: "Somthing went wrong, Please try later...!!",
          });
        }
      }
      else {
        return res.json({
          status: 409,
          message: "Somthing went wrong,please try later...!!",
        });
      }
    } else {
      res.json({
        status: 400,
        message: "all field are required..!!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      message: "intrnal server error",
    });
  }
};


module.exports = { adminLogin };