const router = require('express').Router();

const adminController = require("../controller/Admin")
router.post("/adminLogin",adminController.adminLogin)
module.exports = router