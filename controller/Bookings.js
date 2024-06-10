const Booking = require('../models/Bookings');
const Cars = require('../models/Cars')
const moment = require("moment");

const AddBookings = async (req, res) => {
    const {
        car_id,
        pickup_Location,
        dropoff_Location,
        pickup_date,
        return_date,
        pickup_time,
        return_time,
        price
    } = req.body;
    if (!car_id) {
        return res.json({ status: 400, message: 'please select the car' })
    }
    const dateFormat = "YYYY-MM-DD";
    const currentDate = moment().startOf("day");

    if (
        moment(pickup_date, dateFormat) < currentDate ||
        moment(return_date, dateFormat) < currentDate
    ) {
        return res.json({ message: "Dates should be in the future" });
    }

    if (moment(return_date, dateFormat) <= moment(pickup_date, dateFormat)) {
        return res.json({ message: "Return date should be after pickup date" });
    }
    try {
        if (
            car_id &&
            pickup_Location &&
            dropoff_Location &&
            pickup_date &&
            return_date &&
            pickup_time &&
            return_time
        ) {
            const user = req.user
            console.log("user ====", user);
            console.log("user id ===== ", req.user);
            const { id: user_id } = req.user;

            // Check if the car is already booked during the requested period
            const existingBookings = await Booking.find({
                $and: [
                    {
                        car_id: car_id,
                        pickup_date: pickup_date,
                        return_date: return_date,
                        isBooking: true
                    }
                ]
            });
            console.log("existingBookingsexistingBookings==", existingBookings)
            if (existingBookings.length > 0) {
                return res.json({ status: 400, message: "Car is already booked for the selected dates" });
            }
            const data = new Booking({
                car_id,
                user_id,
                pickup_Location,
                dropoff_Location,
                pickup_date,
                return_date,
                pickup_time,
                return_time,
                price
            });

            await data.save()
            if (car_id) {
                const data = await Cars.findByIdAndUpdate(
                    {
                        _id: car_id,
                    },
                    {
                        isBooking: true,
                    }
                );
            }
            res.json({ status: 200, message: "Booking Successfully..!!", data });
            // bookingService.create(data).then((data) => {
            //     res.status(200).json({ message: "Booking Successfully..!!", data });
            // });
        } else {
            return res.json({
                status: 400,
                message: "All fields are required",
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: 500, message: "Internal server error" });
    }
};
const MyBooking = async (req, res) => {
    try {
        const user = req.user
        console.log("logged user =====", user._id);
        const BookingData = await Booking.find({ user_id: user._id }).populate('car_id');
        // const CarsId = BookingData.map((booking) => booking.car_id);
        // console.log("car ids =-=", CarsId);
        // let carData = [];
        // if (CarsId.length > 0) {
        //     carData = await Cars.find({ _id: { $in: CarsId } });
        // }
        const combined = {
            booking: BookingData,
            // cars: carData
        }
        res.json(combined)
    } catch (error) {
        console.error(error);
        return res.json({ status: 500, message: "internal server error ", error });
    }
}
const FilterBooking = async (req, res) => {
    try {
        const { pickup_Location, Dropoff_Location, pickup_date, dropOff_date } = req.body
        if (pickup_Location, Dropoff_Location, pickup_date, dropOff_date) {
            const dateFormat = "YYYY-MM-DD";
            if (moment(dropOff_date, dateFormat) <= moment(pickup_date, dateFormat)) {
                return res.json({ message: "Return date should be after pickup date" });
            }
        } else {
            res.json({ status: 400, message: "all field are required" });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: 500, message: "intrnal server error" });
    }

}
module.exports = { AddBookings, MyBooking, FilterBooking };
