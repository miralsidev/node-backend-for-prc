
const { CarService } = require('../Services/Cars')
const Cars = require('../models/Cars')
const AddCars = async (req, res) => {

  const {
    plate_number,
    model,
    price,
    description,
    mileage,
    Air_Conditioning_Availability,
    seats,
    luggage,
    fuel,
    brand,
  } = req.body;
  console.log("req.bodyreq.body", req.body)
  // if (
  //   plate_number &&
  //   model &&
  //   price &&
  //   description &&
  //   mileage &&
  //   Air_Conditioning_Availability &&
  //   seats &&
  //   luggage &&
  //   fuel &&
  //   brand
  // ) {

  console.log("ffnfiofneofinef", req.file)
  try {
    const data = new Cars({
      plate_number: plate_number,
      filename: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      conneteType: req.file.mimetype,
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
    console.log("data", data)
    await data.save();
    return res.json({status:200,message:"add cars succesfully.!!"})
    // CarService.create(data).then((data) => {
    //   return res.json({
    //     status: 200,
    //     message: "Insert Data Succesfully..!!",
    //     data: data,
    //   });
    // });
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, message: "intrnal server error" });
  }
  // } else {
  //   return res.json({ status: 400, message: "all field are required" });
  // }
};

const DisplayCars = async (req, res) => {
  try {
    const data = await CarService.find();
    data.forEach(car => console.log(`Retrieved car filename: ${car.filename}`));
    return res.json({status:200,message:"all data ",data})
    // return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while fetching cars', error: error.message });
  }
};

module.exports = { AddCars, DisplayCars }
