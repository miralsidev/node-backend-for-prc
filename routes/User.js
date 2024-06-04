const router = require('express').Router();
const userController = require("../controller/User");
const { userAuth } = require('../middlewares/UserAuth');


router.post("/addUser", userController.addUser)
router.get("/displayUser", userController.getUser)
router.post("/login", userController.login)
router.post("/userForgotPasswordEmail", userController.userForgotPasswordEmail)
router.post("/userForgotPasswordOtp", userController.userForgotPasswordOtp)
router.post("/updatePassword", userController.updatePassword)
router.get('/loggedUser', userAuth, userController.loggedUser)
module.exports = router