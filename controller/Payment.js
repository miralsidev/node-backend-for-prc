const Payment = require("../models/Payment");
const Booking = require('../models/Bookings');
const razorpay = require("razorpay");
const dotenv = require("dotenv");
dotenv.config();
const initiate = async (req, res) => {
  const { amount, currency } = req.body;
  const instance = new razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,
  });
  instance.orders
    .create({
      amount: amount * 100,
      currency: currency,
    })
    .then((order) => {
      const payment = new Payment({
        orderId: order.id,
        amount: amount,
        currency: currency,
        status: "pending",
      });
      return payment.save();
    })
    .then((savedPayment) => {
      res.json({ message: "order created", data: savedPayment });
    })
    .catch((error) => {
      console.error("Error occurred during order creation:", error);
      res.json({ status: 500, error: "Internal server error" });
    });
};
const capture_payment = async (req, res) => {
  const { paymentId, orderId, booking_id } = req.body;
  if (!razorpay) {
    res.json({ status: '500', message: "Razorpay object not initialized" });
    return;
  }
  const data = await Payment.findOneAndUpdate(
    { orderId: orderId },
    { $set: { paymentId: paymentId } }
  );
  const instance = new razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,
  });
  try {
    const payment = await instance.payments.fetch(paymentId);
    console.log(" const payment = ", payment);
    if (
      payment &&
      payment.order_id === orderId &&
      payment.status === "captured"
    ) {
      // console.log("order id ", bookingModel);
      // const { id: user_id } = req.userData;
      const data = await Booking.findOneAndUpdate(
        { _id: booking_id },
        { $set: { status: "Success" } }
      );

      console.log("data ==", data);
      res

        .json({ status: 200, message: "Payment successful, Your booking is confirmed!" });
    } else {
      const data2 = await bookingModel.findOneAndUpdate(
        { orderId: orderId },
        { $set: { status: "Cancelled" } }
      );
      return res

        .json({
          status: 400,
          message: "Payment failed, Your booking is failed!",
          data2: data2,
        });
    }
  } catch (error) {
    console.error("Error capturing payment:", error);
    return res.json({ status: 500, message: "Error capturing payment: " + error.message });
  }
};
const getPayment = async (req, res) => {
  try {
    const data = await Payment.find()
    return res.json({ data })
  } catch (error) {
    console.error("Error capturing payment:", error);
    return res.json({ status: 500, message: "Error capturing payment: " + error.message });
  }
}
module.exports = { initiate, capture_payment, getPayment }