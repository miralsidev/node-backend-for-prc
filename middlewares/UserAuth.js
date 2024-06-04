
const { User } = require("../models/User")
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const userAuth = async (req, res, next) => {
  let token
  console.log(token, "++++++++++++++++++")
  const { authorization } = req.headers
  console.log(authorization, "authorizationauthorization")
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      token = authorization.split(' ')[1]
      console.log(token, "tokentoken")
      const { userID } = jwt.verify(token, process.env.JWT_SECRATE_KEY)
      console.log(userID, "userID userID userID ")
      req.user = await User.findById(userID)
      // req.user = await User.findById(userID).select('-password')
      console.log(req.user, "11111111111111111111111111111111111")
      next()
    } catch (error) {
      console.log(error.message, "error.messageerror.messageerror.message")
      return res.json({
        status: 400,
        message: "un authorised user"
      })
    }
  }
  if (!token) {
    return res.json({
      status: 400,
      message: "un authorised user"
    })
  }
};

module.exports = { userAuth };

