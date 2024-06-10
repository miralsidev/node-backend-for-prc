const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
    car_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cars",
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "registrations",
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    pickup_Location: {
        type: String,
        required: true,
    },
    dropoff_Location: {
        type: String,
        required: true,
    },
    pickup_date: {
        type: Date,
        required: true,
    },
    return_date: {
        type: Date,
        required: true,
    },
    pickup_time: {
        type: String,
        required: true,
    },
    return_time: {
        type: String,
        required: true,
    },
    status: {
        default: "Pending",
        type: String
    },
    deletedAt: {
        type: Date,
        default: null,
    }
}, { timestamps: true });
const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
