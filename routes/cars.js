
const carsInsertController = require("../controller/Cars")
const router = require('express').Router();
const {upload} = require('../Helper/FileUpload')


router.post("/AddCars",upload.single('Image') ,carsInsertController.AddCars)
router.get('/GetData',carsInsertController.DisplayCars)
module.exports = router