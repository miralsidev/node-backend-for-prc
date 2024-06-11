const router = require('express').Router();
const  PaymentController = require("../controller/Payment")
router.post("/payment", PaymentController.initiate);
router.post("/capture_payment", PaymentController.capture_payment);
router.get("/getPayment", PaymentController.getPayment);

module.exports = router
