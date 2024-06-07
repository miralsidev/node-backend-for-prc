const router = require('express').Router();
const bookingController = require('../controller/Bookings')
const { userAuth } = require('../middlewares/UserAuth');
router.post("/addbookings",userAuth,bookingController.AddBookings)

module.exports = router