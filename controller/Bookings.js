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
     
            res.json({ status: 200, message: "Booking Successfully..!!", data });
     
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

        const combined = {
            booking: BookingData,
 
        }
        res.json(combined)
    } catch (error) {
        console.error(error);
        return res.json({ status: 500, message: "internal server error ", error });
    }
}
// const FilterBooking = async (req, res) => {
//     try {
//         const { pickup_Location, Dropoff_Location, pickup_date, dropOff_date } = req.body
//         if (pickup_Location, Dropoff_Location, pickup_date, dropOff_date) {
//             const dateFormat = "YYYY-MM-DD";
//             if (moment(dropOff_date, dateFormat) <= moment(pickup_date, dateFormat)) {
//                 return res.json({ message: "Return date should be after pickup date" });
//             }
//             if (pickup_date < dropOff_date) {
//                 const carlist = await Cars.aggregate([
//                     {
//                         $lookup: {
//                             from: "bookings",
//                             localField: "_id",
//                             foreignField: "car_id",
//                             as: "booking",
//                         },
//                     },
//                     {
//                         $unwind: {
//                             path: "$booking",
//                             includeArrayIndex: "string",
//                         },
//                     },
//                     {
//                         $addFields: {
//                             booking_pickup_date: "$booking.pickup_date",
//                             booking_dropOff_date: "$booking.dropOff_date",
//                         },
//                     },
//                     {
//                         $project: {
//                             booking: 0,
//                             __v: 0,
//                         },
//                     },
//                     {
//                         $addFields: {
//                             pickup_date: pickup_date,
//                             dropOff_date: dropOff_date,
//                         },
//                     },
//                     {
//                         $addFields: {
//                             isBooked: {
//                                 $cond: {
//                                     if: {
//                                         $or: [
//                                             {
//                                                 $and: [
//                                                     { $lte: ["$booking_pickup_date", "$pickup_date"] },
//                                                     { $gte: ["$booking_dropOff_date", "$pickup_date"] },
//                                                 ],
//                                             },
//                                             {
//                                                 $and: [
//                                                     { $lte: ["$booking_pickup_date", "$dropOff_date"] },
//                                                     { $gte: ["$booking_dropOff_date", "$dropOff_date"] },
//                                                 ],
//                                             },
//                                         ],
//                                     },
//                                     then: "BOOKED",
//                                     else: "NO_BOOKED",
//                                 },
//                             },
//                         },
//                     },
//                     {
//                         $match: {
//                             isBooked: "NO_BOOKED",
//                         },
//                     },
//                     {
//                         $project: {
//                             isBooked: 0,
//                             booking_pickup_date: 0,
//                             booking_dropOff_date: 0,
//                             deletedAt: 0,
//                             updatedAt: 0,
//                             pickup_date: 0,
//                             dropOff_date: 0,
//                         },
//                     },
//                 ]);

//                 return res.json({
//                     carlist,
//                 });
//             } else {
//                 return res.json({
//                     status: 400,
//                     message: "Bad Request",
//                 });
//             }
//         } else {
//             res.json({ status: 400, message: "all field are required" });
//         }
//     } catch (error) {
//         console.log(error);
//         return res.json({ status: 500, message: "intrnal server error" });
//     }

// }
const FilterBooking = async (req, res) => {
    const { pickupDate, returnDate, pickup_Location, dropoff_Location } = req.body;
    // if ( pickupDate && returnDate && pickup_Location && dropoff_Location) {
    //   let [pickupDate, returnDate] = date_time_range.split("-");
    //   const dateFormat = "YYYY-MM-DD";
    //   const currentDate = moment().startOf("day");
    //   let [day, month, year] = pickupDate.split("/");
    //   pickupDate = new Date(`${year}-${month}-${day}`);

    //   let [return_dateday, return_datemonth, return_dateyear] =
    //     returnDate.split("/");
    //   returnDate = new Date(
    //     `${return_dateyear}-${return_datemonth}-${return_dateday}`
    //   );

    //   if (
    //     moment(pickupDate, dateFormat) < currentDate ||
    //     moment(returnDate, dateFormat) < currentDate
    //   ) {
    //     return res.json({ message: "Dates should be in the future" });
    //   }
    //   if (moment(returnDate, dateFormat) <= moment(pickupDate, dateFormat)) {
    //     return res.json({ message: "Return date should be after pickup date" });
    //   }

    if (pickupDate < returnDate) {
        const carlist = await Cars.aggregate([
            {
                $lookup: {
                    from: "bookings",
                    localField: "_id",
                    foreignField: "car_id",
                    as: "booking",
                },

            },
            {
                $unwind: {
                    path: "$booking",
                    includeArrayIndex: "string",
                },
            },
            {
                $addFields: {
                    booking_pickup_date: "$booking.pickup_date",
                    booking_return_date: "$booking.return_date",
                },
            },
            {
                $project: {
                    booking: 0,
                    __v: 0,
                },
            },
            {
                $addFields: {
                    pickupDate: pickupDate,
                    returnDate: returnDate,
                },
            },
            {
                $addFields: {
                    isBooked: {
                        $cond: {
                            if: {
                                $or: [
                                    {
                                        $and: [
                                            { $lte: ["$booking_pickup_date", "$pickupDate"] },
                                            { $gte: ["$booking_return_date", "$pickupDate"] },
                                        ],
                                    },
                                    {
                                        $and: [
                                            { $lte: ["$booking_pickup_date", "$returnDate"] },
                                            { $gte: ["$booking_return_date", "$returnDate"] },
                                        ],
                                    },
                                ],
                            },
                            then: "BOOKED",
                            else: "NO_BOOKED",
                        },
                    },
                },
            },
            {
                $match: {
                    isBooked: "NO_BOOKED",
                },
            },
            {
                $project: {
                    isBooked: 0,
                    booking_pickup_date: 0,
                    booking_return_date: 0,
                    deletedAt: 0,
                    updatedAt: 0,
                    pickupDate: 0,
                    returnDate: 0,
                },
            },
        ]);
        console.log("carlistttt=", carlist);
        return res.json({
            carlist,
        });
    } else {
        return res.json({
            status: 400,
            message: "Bad Request",
        });
    }
    // } else {
    //   res.json({ status: 400, message: "all field are required" });
    // }
};
module.exports = { AddBookings, MyBooking, FilterBooking };
