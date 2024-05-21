const router = require('express').Router();
const userController = require("../controller/User");

router.post("/addUser", userController.addUser)
router.get("/displayUser", userController.getUser)
router.post("/login",userController.login)

module.exports = router