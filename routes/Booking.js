const router = require('express').Router();
const bookingController = require('../controller/Bookings')
const { userAuth } = require('../middlewares/UserAuth');
router.post("/addbookings",userAuth,bookingController.AddBookings)
router.get("/MyBooking",userAuth,bookingController.MyBooking)
module.exports = router