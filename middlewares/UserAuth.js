const { User } = require("../models/User")
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const userAuth = async (req, res, next) => {
  let token
  console.log(token, "++++++++++++++++++")
  const { authorization } = req.headers;

  console.log(authorization, "authorizationauthorization")
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      token = authorization.split(' ')[1]

      console.log(token, "tokentoken")

      const { userId } = jwt.verify(token, process.env.JWT_SECRATE_KEY)

      console.log(userId, "userID userID userID ")  
      req.user = await User.findById(userId)
      // req.user = await User.findById(userID).select('-password')
      console.log(req.user, "11111111111111111111111111111111111")
      next()
    } catch (error) {
      console.log(error.message, "error.messageerror.messageerror.message")
      return res.json({
        status: 400,
        message: "unauthorised user"
      })
    }
  }
  if (!token) {
    return res.json({
      status: 400,
      message: "unauthorised user"
    })
  }
};

module.exports = { userAuth };

// const { User } = require("../models/User");
// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// const { response } = require("express");
// dotenv.config();

// const userAuth = async (req, res, next) => {
//   const { authorization } = req.headers;
//   if (authorization && authorization.startsWith('Bearer')) {
//     try {
//       const token = authorization.split(' ')[1];
//       console.log("--token--", token);
//       const { userId } = jwt.verify(token, process.env.JWT_SECRATE_KEY);
//       console.log("UserId==", userId);
//       req.user = await User.findById(userId);
  
//       next();
//     } catch (error) {
//       console.error('User authentication failed', error.message);
//       return res.json({ status: 401, message: "Unauthorized user" });
//     }
//   } else {
//     return res.json({ status: 401, message: "Unauthorized user" });
//   }
// };

// module.exports = { userAuth };
