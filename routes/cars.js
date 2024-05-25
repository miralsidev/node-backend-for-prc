
const carsInsertController = require("../controller/Cars")
const router = require('express').Router();
router.post("/AddCars", carsInsertController.AddCars)

module.exports = router