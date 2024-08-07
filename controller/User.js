const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { mail } = require("../Helper/mail");
const nodemailer = require("nodemailer");
require("dotenv").config();
const addUser = async (req, res) => {
  try {
    console.log("hello");
    const { fname, lname, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User is already Exist' });
      // return res.json({status:400, message: 'User is already Exist' });
    }
    if (fname && lname && email && password) {

      const hashpassword = await bcrypt.hash(password, 10);

      const data = new User({
        fname: fname,
        lname: lname,
        email: email,
        password: hashpassword,
      });
      await data.save();
      res.json({ status: 200, message: "succsessfully..!!" });
      ;

    } else {
      return res.json({ status: 409, message: "all filed are required" });
    }
  } catch (error) {
    console.error(error);
    return res.json({ status: 500, message: "internal server error ", error });
  }
};
const getUser = async (req, res) => {
  try {
    const data = await User.find();
    return res.json({ message: "display all data ", data: data });
  } catch (error) {
    console.error(error);
    return res.json({ status: 500, message: "internal server error ", error });
  }
};
const login = async (req, res) => {
  // try {
  //   const { email, password } = req.body;
  //   if (email && password) {
  //     const user = await User.findOne({ email });
  //     if (!user) {
  //       return res.json({status:409, message: "Invalid email" });
  //     }

  //     const isMatch = await bcrypt.compare(password, user.password);
  //     if (!isMatch) {
  //       return res.json({status:409, message: "Invalid password" });
  //     }
  //     let jwtSecretKey = process.env.secret_key;
  //     const token = jwt.sign({ userId: user._id, userEmail: user.email }, jwtSecretKey);
  //     subject = "Login succesfully..!!";
  //     (text =
  //       "Welcome to SpeedyWheels Rentals! We are thrilled to have you as a member of our community. "),
  //       mail(email, subject, text);
  //     res.json({ status: 200, message: "Login successful", token });
  //   } else {
  //     return res.json({ status: 400, message: "all filed are required ..!" });
  //   }
  // } catch (error) {
  //   console.error(error);
  //   return res.json({ status: 500, message: "internal server error ", error });
  // }

  try {
    const { email, password } = req.body;
    console.log(email, password, "email, password")
    // const user = await userModel.findOne({ email }).populate('cart');
    const user = await User.findOne({ email })
    console.log(user)
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password)
      if (user.email == email && isMatch) {
        const secret = process.env.JWT_SECRATE_KEY
        console.log(secret, "secretsecret")
        console.log(secret)
        const token = jwt.sign({ userId: user._id, userEmail: user.email }, secret, { expiresIn: '5d' });
        // const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '5d' })
        console.log(token, "tokentoken")
        return res.json({
          status: 200,
          message: "login success",
          "token": token
        })
      } else {
        return res.json({
          status: 400,
          message: 'bad request'
        })
      }
    } else {
      return res.json({
        status: 400,
        message: "user not found"
      });
    }
  } catch (err) {
    console.error(err.message);
    res.json({ status: 500, message: 'Server error' });
  }
};
const userForgotPasswordEmail = async (req, res) => {
  const { email } = req.body;
  try {
    if (email) {
      const user = await User.findOne({ email: email });
      console.log("user = ", user);
      if (!user) {
        return res.json({ status: 400, message: "User not found" })
      }

      if (req.body.email === user.email) {
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_POST,
          secure: false,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
          tls: {
            rejectUnauthorized: false
          }
        });
        const generateOTP = () =>
          Math.floor(1000 + Math.random() * 9000).toString();
        const otp = generateOTP();
        console.log("otp = = =", otp);
        const otpExpiration = new Date(Date.now() + 3 * 60 * 1000);
        // const otpExpiration = new Date(Date.now() + 60 * 1000);

        await User.findOneAndUpdate(
          { _id: user.id },
          { $set: { otp: otp, otpExpiration: otpExpiration } }
        );
        const mailOptions = {
          from: process.env.EMAIL_FROM,
          to: user.email,
          subject: "Password forg OTP",
          text: `Your OTP for password forgot is = ${otp}`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        res
          .status(200)
          .json({ message: "Password Forgot OTP Sent Successfully" });
      }
    } else {
      res.json({ status: 400, message: "please enter the email !!" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, message: "internal server error", error });
  }
};
const userForgotPasswordOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email: email, otp: otp });
    console.log("user = ", user);
    if (!user) {
      return res.json({ status: 400, message: "invalid otp ..!!" });
    }
    const now = new Date();
    if (now > user.otpExpiration) {
      await User.updateOne({ email }, { otp: null, otpExpiration: null });
      return res.json({ status: 410, message: "otp expired" });
    }
    return res.json({ message: "Otp Verification Successfully" });
  } catch (error) {
    return res.json({ status: 500, message: "intrnal server error" });
  }
};
const updatePassword = async (req, res) => {
  const { email, newpassword, conformPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "user not found" });
    }
    console.log("newwpass==", newpassword);
    console.log("conform pass v= ", conformPassword);
    // if (!newpassword === conformPassword)
    if (newpassword !== conformPassword) {
      return res.json({ status: 400, message: "The password and confirmation password do not match." })
    }
    const hashedPassword = await bcrypt.hash(newpassword, 10);
    await User.updateOne(
      { email: user.email },
      { $set: { password: hashedPassword } }
    );
    await User.updateOne({ email }, { otp: null, otpExpiration: null });
    // res.status(200).json({ message: "Password Updated Successfully" });
    res.json({ status: 200, message: "Password Updated Successfully" });
  } catch (error) {
    return res.json({ status: 500, message: "internal server error" });
  }
};
const loggedUser = async (req, res) => {
  try {
    const user = req.user
    console.log("logged user =====", user);
    return res.json({
      status: 200,
      user
    })
  } catch (error) {
    return res.json({
      status: 500,
      message: "internal server error "
    })
  }
};
module.exports = {
  addUser, getUser, login, userForgotPasswordEmail,
  userForgotPasswordOtp,
  updatePassword, loggedUser
};





