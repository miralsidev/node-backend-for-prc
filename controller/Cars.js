// const carsInsertModel = require("../models/carsInsertModel");
// const bookingModel = require("../models/bookingModel");
// const { carUploadService } = require("../services/carUploadService");
const {CarService} = require('../Services/Cars')
const  Cars  = require('../models/Cars')
// const path = require("path");
// const tempPath = path.join(__dirname, "./../uploads");

// console.log("temp = path === ", tempPath);
// const moment = require("moment");
const AddCars = async (req, res) => {
  const {
    plate_number,
    model,
    Image,
    price,
    description,
    mileage,
    Air_Conditioning_Availability,
    seats,
    luggage,
    fuel,
    brand,
  } = req.body;
  if (
    plate_number &&
    model &&
    price &&
    description &&
    mileage &&
    Air_Conditioning_Availability &&
    seats &&
    luggage &&
    fuel &&
    brand &&
    Image
  ) {
    if (!["petrol", "diesel", "cng"].includes(fuel.toLowerCase())) {
      return res
        .status(400)
        .json({ status: 400, message: "Invalid fuel type" });
    }
    try {
      const data = new Cars({
        plate_number: plate_number,
        Image: Image,
        brand: brand,
        model: model,
        price: price,
        description: description,
        mileage: mileage,
        Air_Conditioning_Availability: Air_Conditioning_Availability,
        seats: seats,
        luggage: luggage,
        fuel: fuel,
      });
      CarService.create(data).then((data) => {
        return res.json({
          status: 200,
          message: "Insert Data Succesfully..!!",
          data: data,
        });
      });
    } catch (error) {
      console.log(error);
      return res.json({ status: 500, message: "intrnal server error" });
    }
  } else {
    return res.json({ status: 400, message: "all field are required" });
  }
};
module.exports ={AddCars}