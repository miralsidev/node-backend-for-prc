const Booking = require('../models/Bookings');
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
    if(!car_id){
        return res.json({status:400,message:'please select the car'})
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
            res.json({ status:200, message: "Booking Successfully..!!", data });
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

module.exports = { AddBookings };
