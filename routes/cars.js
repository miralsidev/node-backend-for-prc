
const carsInsertController = require("../controller/Cars")
const router = require('express').Router();
const {upload} = require('../Helper/FileUpload')
const {adminAuth} = require('../middlewares/AdminAuth')

// router.post("/AddCars",adminAuth,upload.single('Image') ,carsInsertController.AddCars)
router.post("/AddCars",upload.single('Image') ,carsInsertController.AddCars)

router.get('/GetData',carsInsertController.DisplayCars)
router.put('/UpdateCars/:id',upload.single('Image') ,carsInsertController.UpdateCras)
router.get('/viewData/:id',carsInsertController.viewData);
router.delete('/deleteCars/:id',carsInsertController.deleteCars)
module.exports = router