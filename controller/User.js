const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { mail } = require("../Helper/mail");
require("dotenv").config();
const addUser = async (req, res) => {
  try {
    console.log("hello");
    const { fname, lname, email, password } = req.body;
    const hashpassword = await bcrypt.hash(password, 10);
    console.log("hashpassword=", hashpassword);
    if (fname && lname && email && password) {
      const data = new User({
        fname: fname,
        lname: lname,
        email: email,
        password: hashpassword,
      });
      await data.save();
      res.json({ message: "succsessfully..!!" });
    } else {
      return res.json({ status: 400, message: "all filed are required" });
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
  try {
    const { email, password } = req.body;

    if (email && password) {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
      let jwtSecretKey = process.env.secret_key;
      const token = jwt.sign({ userId: user._id }, jwtSecretKey);
      subject = "Login succesfully..!!";
      (text =
        "Welcome to SpeedyWheels Rentals! We are thrilled to have you as a member of our community. "),
        mail(email, subject, text);
      res.json({ message: "Login successful", token });
    } else {
      return res.json({ message: "all filed are required ..!" });
    }
  } catch (error) {
    console.error(error);
    return res.json({ status: 500, message: "internal server error ", error });
  }
};
module.exports = { addUser, getUser, login };
